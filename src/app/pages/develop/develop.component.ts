import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/_services/heroes.service';

@Component({
  selector: 'app-develop',
  templateUrl: './develop.component.html',
  styleUrls: ['./develop.component.scss']
})
export class DevelopComponent implements OnInit {
  constructor(private heroesService: HeroesService) {}

  ngOnInit() {}

  importHeroes() {
    this.heroesService.importHeroesToDB().subscribe((res) => console.log(res));
  }
}
