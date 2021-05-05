import { Observable } from 'rxjs';
import { Hero } from '../_models/hero';

export interface ApiInterface {
  // Hero
  getHeroes: () => Observable<Hero[]>;
  // updateHero: (hero: Hero) => Promise<any>;
  createHero?: (hero: Hero) => Promise<any>;
}
