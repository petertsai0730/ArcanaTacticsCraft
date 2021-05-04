import { Hero } from "./hero";

export class HeroItem{
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


  constructor(hero:Hero) {
    this.id = hero.id;
    this.name = hero.name;
    this.type = hero.type;
    this.class = hero.class;
    this.star = hero.star;
    this.combinationId = hero.combinationId;
    this.active = true;
  }
}
