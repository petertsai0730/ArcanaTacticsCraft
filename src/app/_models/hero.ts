import { HeroType } from './heroType';

export class Hero {
  id?: string;
  name: string;
  type: string;
  class: string;
  role: string;
  star: number;
  combinationId?: string[];
  upgradeId?: string[];
  label?: string[];

  constructor(heroFromDB: any) {
    this.id = heroFromDB.id;
    this.name = heroFromDB.name;
    this.type = heroFromDB.type;
    this.class = heroFromDB.class;
    this.role = heroFromDB.role;
    this.star = heroFromDB.star;
    this.combinationId = heroFromDB.combinationId;
    this.upgradeId = heroFromDB.upgradeId;
    this.label = heroFromDB.label;
  }
}
