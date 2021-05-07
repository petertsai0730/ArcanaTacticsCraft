import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Status } from '../_enums/status.enum';
import { ApiInterface } from '../_interfaces/api.interface';
import { Hero } from '../_models/hero';
import { HeroClasses } from '../_models/heroClasses';

@Injectable({
  providedIn: 'root'
})
export class Api implements ApiInterface {
  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
  ) {}

  private getCollection = <T>(
    collectionName: string
  ): AngularFirestoreCollection<T> => {
    const propertyName = collectionName + 'Collection';
    if (!this[propertyName]) {
      this[propertyName] = this.angularFirestore.collection<T>(
        environment.FIRESTORE_ROOT + collectionName
      );
    }
    return this[propertyName];
  };

  getHeroes = () => {
    return this.getCollection<Hero>('heroes')
      .valueChanges({ idField: 'id' })
      .pipe(
        map((heroesFromDB: any) => {
          let heroes: Hero[] = [];
          heroesFromDB.map((heroFormDB) => {
            heroes.push(new Hero(heroFormDB));
          });
          return heroes;
        })
      );
  };

  createHero = (hero: Hero) => {
    return this.getCollection<Hero>('heroes')
      .doc(hero.id)
      .set(hero)
      .then(() => Status.SUCCESS);
  };

  getHeroImageUrl(heroId: string): Observable<string> {
    return this.angularFireStorage
      .ref(environment.FIRESTORAGE_ROOT + 'heroes/' + heroId + '.png')
      .getDownloadURL();
  }

  getHeroClasses() {
    return this.getCollection<HeroClasses>('classes')
      .valueChanges({ idField: 'id' })
      .pipe(
        map((heroClassesFromDB: any) => {
          let heroClasses: HeroClasses[] = heroClassesFromDB.map(
            (heroClass) => new HeroClasses(heroClass)
          );
          return heroClasses;
        })
      );
  }

  getHeroClassesImageURL() {
    return this.angularFireStorage.ref(
      environment.FIRESTORAGE_ROOT + 'classes/'
    );
  }
}
