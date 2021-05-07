import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HeroListComponent } from './hero-list/hero-list.component';
import { NavComponent } from '../nav/nav.component';
import { DevelopComponent } from './develop/develop.component';
import { HeroesFilterComponent } from './hero-list/heroes-filter/heroes-filter.component';

@NgModule({
  declarations: [
    HeroListComponent,
    NavComponent,
    DevelopComponent,
    HeroesFilterComponent
  ],
  imports: [CommonModule, PagesRoutingModule],
  exports: [
    HeroListComponent,
    NavComponent,
    DevelopComponent,
    HeroesFilterComponent
  ]
})
export class PagesModule {}
