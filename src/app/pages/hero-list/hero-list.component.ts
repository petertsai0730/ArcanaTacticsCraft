import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  from,
  Observable,
  Subject
} from 'rxjs';
import { filter, map, skip, switchMap, takeUntil } from 'rxjs/operators';
import { Hero } from 'src/app/_models/hero';
import { HeroItem } from 'src/app/_interfaces/heroItem.interface';
import { HeroTypesService } from 'src/app/_services/hero-types.service';
import { HeroesService } from 'src/app/_services/heroes.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit, OnDestroy {
  heroes$ = new BehaviorSubject<HeroItem[]>([]);
  destory$ = new Subject<void>();

  // hero
  heroesByStar$ = new BehaviorSubject<Array<HeroItem[]>>([]);
  heroMap = new Map<string, HeroItem>();

  selectMode = false;

  constructor(
    private heroesService: HeroesService,
    private heroTypeSerive: HeroTypesService
  ) {}

  ngOnInit() {
    this.filterHeroesWithStar();
    this.getAllHeroes();
  }

  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
  }

  getAllHeroes() {
    combineLatest([
      this.heroesService.heroes$.pipe(skip(1)),
      this.heroTypeSerive.heroTypes$.pipe(skip(1)),
      this.getHeroesImageUrl()
    ])
      .pipe(
        takeUntil(this.destory$),
        filter(
          ([heroes, heroTypes, heroesImageMap]) =>
            heroes.length > 0 && heroesImageMap.size > 0
        ),
        map(([heroes, heroTypes, heroesImageMap]) => {
          const heroItems = [];
          for (const hero of heroes) {
            let url = heroesImageMap.get(hero.id);
            let heroItem = new HeroItem(hero, url);
            heroItems.push(heroItem);
            this.heroMap.set(heroItem.id, heroItem);
          }
          return heroItems;
        })
      )
      .subscribe(this.heroes$);

    // this.heroesService.heroes$.subscribe((res) => console.log(res));
  }

  getHeroesImageUrl(): Observable<Map<string, string>> {
    return this.heroesService.heroes$.pipe(
      skip(1),
      switchMap((heroes: Hero[]) => {
        const heroesImageStream = heroes.map((hero) => {
          return this.heroesService.getHeroImageURL(hero.id).pipe(
            map((url) => {
              let obj = {
                id: hero.id,
                url: url
              };
              return obj;
            })
          );
        });
        return combineLatest([...heroesImageStream]);
      }),
      map((heroesImage) => {
        return new Map(
          heroesImage.map((heroImage) => [heroImage.id, heroImage.url])
        );
      })
    );
  }

  filterHeroesWithStar() {
    this.heroes$
      .pipe(
        takeUntil(this.destory$),
        map((heroes) => {
          const heroesByStar = new Array<HeroItem[]>([], [], [], [], []);
          for (const hero of heroes) {
            heroesByStar[hero.star - 1].push(hero);
          }
          return heroesByStar;
        })
      )
      .subscribe(this.heroesByStar$);
  }

  /** seleted hero and active combination and upgrade heroes */
  selectedHeroItem(selectedHero: HeroItem) {
    if (this.selectMode && selectedHero.isSelected) {
      this.selectMode = false;
      this.resetHeroItemsActive();
      return;
    }

    const activeHeroes = [
      ...this.getCombinationHeroesList(selectedHero),
      ...this.getUpdateHeroList(selectedHero)
    ];

    const heroes = this.heroes$.value;
    for (const hero of heroes) {
      hero.isSelected = hero.id === selectedHero.id;
      const count = activeHeroes.filter((aHeroId) => aHeroId === hero.id)
        .length;
      hero.active = count > 0;
      hero.combinationNumber = count;
    }
    this.selectMode = true;
    this.heroes$.next(heroes);
  }

  getCombinationHeroesList(hero: HeroItem) {
    const heroList = [];
    const heroLoop = [hero.id];
    while (heroLoop.length > 0) {
      let tempHeroId = heroLoop.pop();
      if (!tempHeroId) {
        break;
      }
      let tmpHero = this.heroMap.get(tempHeroId);
      if (tmpHero) {
        heroList.push(tmpHero.id);
        if (tmpHero.combinationId && tmpHero.combinationId.length > 0) {
          heroLoop.push(...tmpHero.combinationId);
        }
      }
    }
    return heroList;
  }

  getUpdateHeroList(hero: HeroItem) {
    const heroList = [];
    const heroLoop = [];
    if (hero.upgradeId && hero.upgradeId.length > 0) {
      heroLoop.push(...hero.upgradeId);
    }
    while (heroLoop.length > 0) {
      let tempHeroId = heroLoop.pop();
      if (!tempHeroId) {
        break;
      }
      let tmpHero = this.heroMap.get(tempHeroId);
      if (tmpHero) {
        heroList.push(tmpHero.id);
        if (tmpHero.upgradeId && tmpHero.upgradeId.length > 0) {
          heroLoop.push(...tmpHero.upgradeId);
        }
      }
    }
    const result = heroList.filter((hero, index, array) => {
      return array.indexOf(hero) === index;
    });
    return result;
  }

  resetHeroItemsActive() {
    const heroes = this.heroes$.value;
    for (const hero of heroes) {
      hero.isSelected = false;
      hero.active = true;
      hero.combinationNumber = 0;
    }
    this.heroes$.next(heroes);
  }
}
