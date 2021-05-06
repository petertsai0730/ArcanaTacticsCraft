import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, from } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Md5 } from 'ts-md5';
import { Api } from '../_api/firebase.api';
import { Status } from '../_enums/status.enum';
import { Hero } from '../_models/hero';

@Injectable({
  providedIn: 'root'
})
export class DevelopService {
  constructor(private httpClient: HttpClient, private api: Api) {}

  getHeroes() {
    return this.api.getHeroes();
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
        return this.setupHeroUpgrdeId(newHeroes);
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

  private getHeroesRef() {
    return this.httpClient.get('/assets/docs/heroes-ref.txt', {
      responseType: 'text'
    });
  }

  private setupHeroInfo(heroInfo: string[]): Hero {
    let newHero: Hero = {
      id: Md5.hashStr(heroInfo[0]).toString(),
      name: heroInfo[0],
      star: +heroInfo[1],
      class: heroInfo[2],
      type: heroInfo[3],
      role: heroInfo[4],
      label: [heroInfo[0], heroInfo[7]]
    };
    //combinationId
    if (newHero.star !== 1) {
      newHero.combinationId = [
        Md5.hashStr(heroInfo[5]).toString(),
        Md5.hashStr(heroInfo[6]).toString()
      ];
    }
    return newHero;
  }

  private setupHeroUpgrdeId(heroes: Hero[]) {
    for (let hero of heroes) {
      if (hero.combinationId && hero.combinationId.length > 0) {
        for (let cHeroId of hero.combinationId) {
          let cHero = heroes.find((h) => h.id === cHeroId);
          if (cHero) {
            if (!cHero.upgradeId) {
              cHero['upgradeId'] = [];
            }
            cHero.upgradeId.push(hero.id);
          }
        }
      }
    }
    return heroes;
  }

  /** Heroes image */
  getHeroImage(heroId: string) {
    return this.api.getHeroImageUrl(heroId);
  }
}
