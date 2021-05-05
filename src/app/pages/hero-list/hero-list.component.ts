import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, skip, takeUntil } from 'rxjs/operators';
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

  // star
  heroesByStar$ = new BehaviorSubject<Array<HeroItem[]>>([]);

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
      this.heroTypeSerive.heroTypes$.pipe(skip(1))
    ])
      .pipe(
        takeUntil(this.destory$),
        map(([heroes, heroTypes]) => {
          const heroItems = [];
          for (const hero of heroes) {
            const heroItem = new HeroItem(hero);
            heroItems.push(heroItem);
          }
          return heroItems;
        })
      )
      .subscribe(this.heroes$);

    // this.heroes$.subscribe(res=> console.log(res));
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

  selectedHeroItem(selectedHero: HeroItem) {
    if (this.selectMode && selectedHero.isSelected) {
      this.selectMode = false;
      this.resetHeroItemsActive();
      return;
    }

    const activeHeroes = this.getCombinationHeroesList(selectedHero);

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
    heroList.push(hero.id);
    if (hero.combinationId && hero.combinationId.length > 0) {
      hero.combinationId.map((heroId) => {
        const combinationHero = this.heroes$.value.find((h) => h.id === heroId);
        if (combinationHero) {
          heroList.push(...this.getCombinationHeroesList(combinationHero));
        }
      });
    }
    return heroList;
  }

  getUpdateHeroList(hero: HeroItem) {
    // let heroList = [];
    // let updateHeroes = this.heroes$.value.filter(hero => !!hero?.combinationId.find(heroId => heroId === hero.id));
    // heroList.push(...updateHeroes);
    // for(let uHero of updateHeroes){
    // }
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

  importHeroes() {
    this.heroesService.getHeroesRef();
  }
}
