import { Observable } from 'rxjs';
import { Hero } from '../_models/hero';
import { HeroClasses } from '../_models/heroClasses';

export interface ApiInterface {
  // Hero
  getHeroes: () => Observable<Hero[]>;
  updateHero?: (hero: Hero) => Promise<any>;
  createHero?: (hero: Hero) => Promise<any>;
  getHeroImageUrl?: (heroId: string) => Observable<string>;
  getHeroClasses: (className: string) => Observable<HeroClasses[]>;
  getHeroClassImageURL: (className: string) => Observable<string>;
}
