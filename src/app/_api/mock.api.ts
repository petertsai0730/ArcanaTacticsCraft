import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Status } from '../_enums/status.enum';
import { ApiInterface } from '../_interfaces/api.interface';
import { Hero } from '../_models/hero';
import { HeroClasses } from '../_models/heroClasses';

@Injectable({
  providedIn: 'root'
})
export class Api implements ApiInterface {
  /** mock data */

  private heroClasses$ = new BehaviorSubject<HeroClasses[]>([
    { id: 'dfd4bbfbae6478854a1bdea2df9c43cc', name: 'Swordsman' },
    { id: '276b2903b2f76eae5a6fa100f590e6ac', name: 'Archer' },
    { id: '68086c1119bafdfe463c769afb7010f4', name: 'Rogue' },
    { id: 'db6244f0ac4492962738c7e18720aaf7', name: 'Wizard' },
    { id: '8c45bd73ab41b3abaf437a108898400b', name: 'Cleric' },
    { id: 'c91256eb831b5a46d9e5a9dc685993e2', name: 'Warrior' },
    { id: '616fe97570fd8fc3fbae3222b06748e6', name: 'Lancer' },
    { id: 'b200ccdbb93ef3ebe05017fcf467c043', name: 'Spirit' }
  ]);

  constructor(private httpClient: HttpClient) {}

  getHeroes = () => {
    return this.httpClient
      .get('/assets/docs/heroes.json', {
        responseType: 'json'
      })
      .pipe(
        map((ref: Hero[]) => {
          return ref;
        })
      );
  };

  createHero = (hero: Hero) => {
    return new Promise((resolve, reject) => {
      return Status.SUCCESS;
    });
  };

  getHeroImageUrl(heroId: string): Observable<string> {
    return new Observable((observer) => {
      observer.next(`/assets/images/heroes/${heroId}.png`);
    });
  }

  getHeroClasses() {
    return this.heroClasses$;
  }
}
