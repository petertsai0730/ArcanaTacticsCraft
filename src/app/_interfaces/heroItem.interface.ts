import { Hero } from '../_models/hero';

export class HeroItem {
  id?: string;
  name: string;
  type: string;
  class: string;
  star: number;
  combinationId?: string[];
  color?: string;
  displayImage?: boolean;
  isSelected?: boolean;
  active?: boolean;
  combinationNumber?: number;
  upgradeId?: string[];
  label?: string[];

  constructor(hero: Hero) {
    this.id = hero.id;
    this.name = hero.name;
    this.type = hero.type;
    this.class = hero.class;
    this.star = hero.star;
    this.combinationId = hero.combinationId;
    this.upgradeId = hero.upgradeId;
    this.label = hero.label;
    this.active = true;
  }
}
