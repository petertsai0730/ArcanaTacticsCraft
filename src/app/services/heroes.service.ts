import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroes$ = new BehaviorSubject<Hero[]>([]);

  constructor(
    private db: AngularFirestore
  ) { }

  getHeroes(): Observable<Hero[]>{
    return this.db.collection('Testing/Data/Heroes').valueChanges(
      {idField: 'id'}
    ).pipe(
      map((heroesFromDB:any) => {
        heroesFromDB.map(heroFormDB => new Hero(heroFormDB));
        return heroesFromDB;
      })
    );
  }


}
