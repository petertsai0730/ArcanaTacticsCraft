import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, skip, takeUntil } from 'rxjs/operators';
import { Hero } from 'src/app/models/hero';
import { HeroItem } from 'src/app/models/heroItem.interface';
import { HeroTypesService } from 'src/app/services/hero-types.service';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit, OnDestroy {

  heroes$ = new BehaviorSubject<HeroItem[]>([]);
  destory$ = new Subject<void>();

  //star
  heroesByStar$ = new BehaviorSubject<Array<HeroItem[]>>([]);

  selectMode = false;

  constructor(
    private heroesService: HeroesService,
    private heroTypeSerive: HeroTypesService
  ) { }

  ngOnInit() {
    this.filterHeroesWithStar();
    this.getAllHeroes();
  }

  ngOnDestroy(){
    this.destory$.next();
    this.destory$.complete();
  }

  getAllHeroes(){
    combineLatest([
      this.heroesService.heroes$.pipe(skip(1)),
      this.heroTypeSerive.heroTypes$.pipe(skip(1))
    ]).pipe(
      takeUntil(this.destory$),
      map(([heroes, heroTypes]) => {
        let heroItems = [];
        for(let hero of heroes){
          let heroItem = new HeroItem(hero);
          heroItems.push(heroItem);
        }
        return heroItems;
      })
    ).subscribe(this.heroes$)

    // this.heroes$.subscribe(res=> console.log(res));
  }

  filterHeroesWithStar(){
    this.heroes$.pipe(
      takeUntil(this.destory$),
      map(heroes => {
        let heroesByStar = new Array<HeroItem[]>([],[],[],[],[]);
        for(let hero of heroes){
          heroesByStar[hero.star -1].push(hero);
        }
        return heroesByStar;
      })
    ).subscribe(this.heroesByStar$);
  }

  selectedHeroItem(selectedHero: HeroItem){
    if(this.selectMode && selectedHero.isSelected){
      this.selectMode = false;
      this.resetHeroItemsActive();
      return;
    }

    let activeHeroes = this.getCombinationHeroesList(selectedHero);

    let heroes = this.heroes$.value;
    for(let hero of heroes){
      hero.isSelected = hero.id === selectedHero.id;
      let count = activeHeroes.filter(aHeroId => aHeroId === hero.id).length;
      hero.active = count > 0;
      hero.combinationNumber = count;
    }
    this.selectMode = true;
    this.heroes$.next(heroes);
  }

  getCombinationHeroesList(hero: HeroItem){
    let heroList = [];
    heroList.push(hero.id);
    if(hero.combinationId && hero.combinationId.length > 0){
      hero.combinationId.map(heroId => {
        let combinationHero = this.heroes$.value.find(h => h.id === heroId);
        if(combinationHero){
          heroList.push(...this.getCombinationHeroesList(combinationHero));
        }
      })
    }
    return heroList;
  }

  getUpdateHeroList(hero: HeroItem){
    // let heroList = [];
    // let updateHeroes = this.heroes$.value.filter(hero => !!hero?.combinationId.find(heroId => heroId === hero.id));
    // heroList.push(...updateHeroes);
    // for(let uHero of updateHeroes){

    // }
  }

  resetHeroItemsActive(){
    let heroes = this.heroes$.value;
    for(let hero of heroes){
      hero.isSelected = false;
      hero.active = true;
      hero.combinationNumber = 0;
    }
    this.heroes$.next(heroes);
  }
}
