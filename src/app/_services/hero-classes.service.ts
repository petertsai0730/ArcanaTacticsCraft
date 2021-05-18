import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Api } from '../_api/mock.api';
import { HeroClass } from '../_models/heroClass';

@Injectable({
  providedIn: 'root'
})
export class HeroClassesService {
  heroClasses$ = new BehaviorSubject<HeroClass[]>([]);

  constructor(private api: Api) {}

  getHeroClasses(): Observable<HeroClass[]> {
    return this.api.getHeroClasses();
  }

  getHeroClassesImageURL(className: string): Observable<string> {
    return this.api.getHeroClassImageURL(className);
  }
}
