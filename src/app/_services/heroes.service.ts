import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from, Observable } from 'rxjs';
import { concatMap, filter, map, switchMap } from 'rxjs/operators';
import { Api } from '../_api/firebase.api';
import { Hero } from '../_models/hero';
import { Md5 } from 'ts-md5/dist/md5';
import { Status } from '../_enums/status.enum';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  heroes$ = new BehaviorSubject<Hero[]>([]);

  constructor(private httpClient: HttpClient, private api: Api) {}

  getHeroes(): Observable<Hero[]> {
    return this.api.getHeroes();
  }

  getHeroesRef() {
    return this.httpClient.get('/assets/docs/heroes-ref.txt', {
      responseType: 'text'
    });
  }

  importHeroesToDB() {
    return this.getHeroesRef().pipe(
      filter((res) => !!res),
      map((ref) => {
        const heroes = ref.split(';');
        let newHeroes: Hero[] = [];
        for (const hero of heroes) {
          newHeroes.push(this.setupHeroInfo(hero.split(',')));
        }
        return newHeroes;
      }),
      switchMap((heroes) => {
        const heroesStream = heroes.map((hero) =>
          from(this.api.createHero(hero))
        );
        return combineLatest([...heroesStream]);
      }),
      map((responds) =>
        responds.filter((res) => res == Status.SUCCESS).length ===
        responds.length
          ? Status.SUCCESS
          : Status.NOT_LOADED
      )
    );
  }

  private setupHeroInfo(heroInfo: string[]): Hero {
    let newHero: Hero = {
      id: Md5.hashStr(heroInfo[0]).toString(),
      name: heroInfo[0],
      star: +heroInfo[1],
      class: heroInfo[2],
      type: heroInfo[3],
      role: heroInfo[4],
      combinationId: [
        Md5.hashStr(heroInfo[5]).toString(),
        Md5.hashStr(heroInfo[6]).toString()
      ],
      label: [heroInfo[0], heroInfo[7]]
    };
    return newHero;
  }
}
