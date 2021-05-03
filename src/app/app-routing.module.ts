import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroListComponent } from './pages/hero-list/hero-list.component';


const routes: Routes = [
  { path: '', component: HeroListComponent},
  { path: 'heroes', component: HeroListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
