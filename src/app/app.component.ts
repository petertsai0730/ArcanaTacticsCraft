import { Component } from '@angular/core';
import { HeroTypesService } from './services/hero-types.service';
import { HeroesService } from './services/heroes.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private heroesService: HeroesService,
    private heroTypeSerive: HeroTypesService
  ) {
    this.heroTypeSerive.getHeroType().subscribe(this.heroTypeSerive.heroTypes$);
    this.heroesService.getHeroes().subscribe(this.heroesService.heroes$);
  }
}
