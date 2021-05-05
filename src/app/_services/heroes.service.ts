import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Api } from '../_api/firebase.api';
import { Hero } from '../_models/hero';

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
    this.getHeroesRef().pipe(
      filter((ref) => !!ref),
      map((ref) => {})
    );
  }
}
