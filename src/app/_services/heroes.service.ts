import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from, Observable } from 'rxjs';
import { concatMap, filter, map, switchMap } from 'rxjs/operators';
import { Api } from '../_api/mock.api';
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

  getHeroImageURL(heroId: string): Observable<string> {
    return this.api.getHeroImageUrl(heroId);
  }
}
