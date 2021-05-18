import { Observable } from 'rxjs';
import { Hero } from '../_models/hero';
import { HeroClass } from '../_models/heroClass';
import { HeroRole } from '../_models/heroRole';

export interface ApiInterface {
  // Hero
  getHeroes: () => Observable<Hero[]>;
  updateHero?: (hero: Hero) => Promise<any>;
  createHero?: (hero: Hero) => Promise<any>;
  getHeroImageUrl?: (heroId: string) => Observable<string>;
  getHeroClasses: (className: string) => Observable<HeroClass[]>;
  getHeroClassImageURL: (className: string) => Observable<string>;
  getHeroTypeImageURL?: (typeName: string) => Observable<string>;
  getHeroRoles?: () => Observable<HeroRole[]>;
  getHeroRoleImageURL?: (roleName: string) => Observable<string>;
}
