import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeroType } from '../_models/heroType';
import { Api } from '../_api/mock.api';

@Injectable({
  providedIn: 'root'
})
export class HeroTypesService {
  heroTypes$ = new BehaviorSubject<HeroType[]>([]);

  constructor(private db: AngularFirestore, private api: Api) {}

  getHeroType(): Observable<HeroType[]> {
    return this.db
      .collection('Testing/Data/HeroTypes')
      .valueChanges({ idField: 'id' })
      .pipe(
        map((heroTypesFormDB: any) => {
          heroTypesFormDB.map((heroTypeFromDB) => new HeroType(heroTypeFromDB));
          return heroTypesFormDB;
        })
      );
  }

  getHeroTypeImageURL(typeName: string): Observable<string> {
    return this.api.getHeroTypeImageURL(typeName);
  }
}
