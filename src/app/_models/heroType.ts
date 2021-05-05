

export class HeroType{
  id?: string;
  name: string;
  color?: string;

  constructor(heroTypeFromDB: any){
    this.id = heroTypeFromDB.id;
    this.name = heroTypeFromDB.name;
    this.color = heroTypeFromDB.color;
  }
}
