import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HeroClasses } from 'src/app/_models/heroClasses';
import { HeroClassesService } from 'src/app/_services/hero-classes.service';

@Component({
  selector: 'app-heroes-filter',
  templateUrl: './heroes-filter.component.html',
  styleUrls: ['./heroes-filter.component.scss']
})
export class HeroesFilterComponent implements OnInit {
  heroClasses$ = new BehaviorSubject<HeroClasses[]>([]);

  constructor(private heroClassesService: HeroClassesService) {}

  ngOnInit() {
    this.getHeroClasses();
  }

  getHeroClasses() {
    this.heroClassesService
      .getHeroClasses()
      .pipe(
        switchMap((classes: HeroClasses[]) => {
          const heroClassesImageStream = classes.map(
            (heroClass: HeroClasses) => {
              return this.heroClassesService
                .getHeroClassesImageURL(heroClass.name)
                .pipe(
                  map((url) => {
                    let obj = {
                      id: heroClass.id,
                      name: heroClass.name,
                      imageURL: url
                    };
                    return obj;
                  })
                );
            }
          );
          return combineLatest([...heroClassesImageStream]);
        })
      )
      .subscribe(this.heroClasses$);
  }
}
