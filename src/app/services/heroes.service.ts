import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroes$ = new BehaviorSubject<Hero[]>([]);

  constructor(
    private db: AngularFirestore
  ) { }

  getHeroes(){
    return this.db.collection('Testing/Data/Heroes').valueChanges({idField: 'id'});
  }


}
