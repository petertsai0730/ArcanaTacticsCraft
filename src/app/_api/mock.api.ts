import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Status } from '../_enums/status.enum';
import { ApiInterface } from '../_interfaces/api.interface';
import { Hero } from '../_models/hero';

@Injectable({
  providedIn: 'root'
})
export class Api implements ApiInterface {
  constructor(private httpClient: HttpClient) {}

  getHeroes = () => {
    return this.httpClient
      .get('/assets/docs/heroes.json', {
        responseType: 'json'
      })
      .pipe(
        map((ref: Hero[]) => {
          return ref;
        })
      );
  };

  createHero = (hero: Hero) => {
    return new Promise((resolve, reject) => {
      return Status.SUCCESS;
    });
  };
}
