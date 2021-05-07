export class HeroClasses {
  id?: string;
  name: string;
  imageURL?: string;

  constructor(heroClassesFromDB: any) {
    this.id = heroClassesFromDB.id;
    this.name = heroClassesFromDB.name;
  }
}
