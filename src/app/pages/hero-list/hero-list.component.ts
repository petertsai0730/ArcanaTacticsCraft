import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, skip, takeUntil } from 'rxjs/operators';
import { Hero } from 'src/app/models/hero';
import { HeroTypesService } from 'src/app/services/hero-types.service';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit, OnDestroy {

  heroes$ = new BehaviorSubject<Hero[]>([]);
  destory$ = new Subject<void>();

  constructor(
    private heroesService: HeroesService,
    private heroTypeSerive: HeroTypesService
  ) { }

  ngOnInit() {
    this.getHeroTypes();
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
        for(let hero of heroes){
          hero.type = heroTypes.find(hType => hType.name === hero.type);
        }
        return heroes;
      })
    ).subscribe(this.heroes$)
  }

  getHeroTypes(){
    this.heroTypeSerive.heroTypes$.subscribe(res=> console.log(res));
  }
}
