import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ApiInterface } from '../_interfaces/api.interface';
import { Hero } from '../_models/hero';

@Injectable({
  providedIn: 'root'
})
export class Api implements ApiInterface {
  constructor(private angularFirestore: AngularFirestore) {}

  getHeroes = () => {
    return this.angularFirestore
      .collection('Testing/Data/Heroes')
      .valueChanges({ idField: 'id' })
      .pipe(
        map((heroesFromDB: any) => {
          heroesFromDB.map((heroFormDB) => new Hero(heroFormDB));
          return heroesFromDB;
        })
      );
  };
}
