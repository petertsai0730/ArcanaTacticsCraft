export class HeroClass {
  id?: string;
  name: string;
  imageURL?: string;

  constructor(heroClassFromDB: any) {
    this.id = heroClassFromDB.id;
    this.name = heroClassFromDB.name;
  }
}
