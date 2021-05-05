import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { HeroListComponent } from './pages/hero-list/hero-list.component';
import { NavComponent } from './nav/nav.component';
import { DevelopComponent } from './pages/develop/develop.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroListComponent,
    NavComponent,
    DevelopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
