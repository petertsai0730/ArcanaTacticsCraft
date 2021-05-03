import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { HeroType } from '../models/heroType';

@Injectable({
  providedIn: 'root'
})
export class HeroTypesService {

  heroTypes$ = new BehaviorSubject<HeroType[]>([]);

  constructor(
    private db: AngularFirestore
  ) { }

  getHeroType(){
    return this.db.collection('Testing/Data/HeroTypes').valueChanges({idField: 'id'});
  }
}
