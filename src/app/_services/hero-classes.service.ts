import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Api } from '../_api/mock.api';
import { HeroClasses } from '../_models/heroClasses';

@Injectable({
  providedIn: 'root'
})
export class HeroClassesService {
  heroClasses$ = new BehaviorSubject<HeroClasses[]>([]);

  constructor(private api: Api) {}

  getHeroClasses(): Observable<HeroClasses[]> {
    return this.api.getHeroClasses();
  }
}
