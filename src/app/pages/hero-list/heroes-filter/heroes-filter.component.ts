import { Component, OnInit } from '@angular/core';
import { HeroClassesService } from 'src/app/_services/hero-classes.service';

@Component({
  selector: 'app-heroes-filter',
  templateUrl: './heroes-filter.component.html',
  styleUrls: ['./heroes-filter.component.scss']
})
export class HeroesFilterComponent implements OnInit {
  constructor(private heroClassesService: HeroClassesService) {}

  ngOnInit() {
    this.getHeroClasses();
  }

  getHeroClasses() {
    this.heroClassesService
      .getHeroClasses()
      .subscribe((res) => console.log(res));
  }
}
