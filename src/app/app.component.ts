import { Component } from '@angular/core';
import { HeroClassesService } from './_services/hero-classes.service';
import { HeroTypesService } from './_services/hero-types.service';
import { HeroesService } from './_services/heroes.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private heroesService: HeroesService,
    private heroTypeSerive: HeroTypesService,
    private heroClassesService: HeroClassesService
  ) {
    console.log('app start');
    this.heroTypeSerive.getHeroType().subscribe(this.heroTypeSerive.heroTypes$);
    this.heroesService.getHeroes().subscribe(this.heroesService.heroes$);
    // this.heroClassesService
    //   .getHeroClasses()
    //   .subscribe(this.heroClassesService.heroClasses$);
  }
}
