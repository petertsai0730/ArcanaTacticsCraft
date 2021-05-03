import { HeroType } from "./heroType";

export class Hero{
  id?: string;
  name: string;
  type: string | HeroType;
  class: string;
  star: number;
  combination?: string[];
}
