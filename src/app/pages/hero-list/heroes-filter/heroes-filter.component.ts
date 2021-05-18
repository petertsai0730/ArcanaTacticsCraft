import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HeroClass } from 'src/app/_models/heroClass';
import { HeroRole } from 'src/app/_models/heroRole';
import { HeroType } from 'src/app/_models/heroType';
import { HeroClassesService } from 'src/app/_services/hero-classes.service';
import { HeroRolesService } from 'src/app/_services/hero-roles.service';
import { HeroTypesService } from 'src/app/_services/hero-types.service';

@Component({
  selector: 'app-heroes-filter',
  templateUrl: './heroes-filter.component.html',
  styleUrls: ['./heroes-filter.component.scss']
})
export class HeroesFilterComponent implements OnInit {
  // filter list
  heroClasses$ = new BehaviorSubject<HeroClass[]>([]);
  heroTypes$ = new BehaviorSubject<HeroType[]>([]);
  heroRoles$ = new BehaviorSubject<HeroRole[]>([]);

  //selected
  heroFilter = [];

  constructor(
    private heroClassesService: HeroClassesService,
    private heroTypeService: HeroTypesService,
    private heroRoleService: HeroRolesService
  ) {}

  ngOnInit() {
    this.getHeroClasses();
    this.getHeroType();
    this.getHeroRole();
  }

  getHeroClasses() {
    this.heroClassesService
      .getHeroClasses()
      .pipe(
        switchMap((classes: HeroClass[]) => {
          const heroClassesImageStream = classes.map((heroClass: HeroClass) => {
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
          });
          return combineLatest([...heroClassesImageStream]);
        })
      )
      .subscribe(this.heroClasses$);
  }

  getHeroType() {
    this.heroTypeService
      .getHeroType()
      .pipe(
        switchMap((types: HeroType[]) => {
          const heroTypesImageStream = types.map((heroType: HeroType) => {
            return this.heroTypeService.getHeroTypeImageURL(heroType.name).pipe(
              map((url) => {
                let obj = {
                  id: heroType.id,
                  name: heroType.name,
                  imageURL: url
                };
                return obj;
              })
            );
          });
          return combineLatest([...heroTypesImageStream]);
        })
      )
      .subscribe(this.heroTypes$);
  }

  getHeroRole() {
    this.heroRoleService
      .getHeroRoles()
      .pipe(
        switchMap((types: HeroRole[]) => {
          const heroRolesImageStream = types.map((heroRole: HeroRole) => {
            return this.heroRoleService.getHeroRoleImageURL(heroRole.name).pipe(
              map((url) => {
                let obj = {
                  id: heroRole.id,
                  name: heroRole.name,
                  imageURL: url
                };
                return obj;
              })
            );
          });
          return combineLatest([...heroRolesImageStream]);
        })
      )
      .subscribe(this.heroRoles$);
  }

  filterChange(groupName, event) {
    let toggle = event.source;
    if (toggle) {
      let group = toggle.buttonToggleGroup;
      if (event.value.some((item) => item == toggle.value)) {
        // group.value = [toggle.value];
        this.heroFilter.push({
          name: groupName,
          value: toggle.value
        });
      }
    } else {
      //cancel this group in filter
      let index = this.heroFilter.findIndex(
        (filter) => filter.name === groupName
      );
      this.heroFilter.splice(index, 1);
    }

    console.log(this.heroFilter);
  }
}
