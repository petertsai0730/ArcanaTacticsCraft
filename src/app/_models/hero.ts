import { HeroType } from "./heroType";

export class Hero{
  id?: string;
  name: string;
  type: string;
  class: string;
  star: number;
  combinationId?: string[];

  constructor(heroFromDB: any) {
    this.id = heroFromDB.id;
    this.name = heroFromDB.name;
    this.type = heroFromDB.type;
    this.class = heroFromDB.class;
    this.star = heroFromDB.star;
    this.combinationId = heroFromDB.combinationId;
  }
}
