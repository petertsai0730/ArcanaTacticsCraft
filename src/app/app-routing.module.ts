import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevelopComponent } from './pages/develop/develop.component';
import { HeroListComponent } from './pages/hero-list/hero-list.component';

const routes: Routes = [{ path: 'develop', component: DevelopComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
