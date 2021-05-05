import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  heroes$ = new BehaviorSubject<Hero[]>([]);

  constructor(private db: AngularFirestore, private httpClient: HttpClient) {}

  getHeroes() {
    return this.db
      .collection('Testing/Data/Heroes')
      .valueChanges({ idField: 'id' })
      .pipe(
        map((heroesFromDB: any) => {
          heroesFromDB.map((heroFormDB) => new Hero(heroFormDB));
          return heroesFromDB;
        })
      );
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
