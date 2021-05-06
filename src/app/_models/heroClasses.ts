export class HeroClasses {
  id?: string;
  name: string;

  constructor(heroClassesFromDB: any) {
    this.id = heroClassesFromDB.id;
  }
}
