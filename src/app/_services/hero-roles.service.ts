import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Api } from '../_api/mock.api';
import { HeroRole } from '../_models/heroRole';

@Injectable({
  providedIn: 'root'
})
export class HeroRolesService {
  heroRole$ = new BehaviorSubject<HeroRole[]>([]);

  constructor(private api: Api) {}

  getHeroRoles(): Observable<HeroRole[]> {
    return this.api.getHeroRoles();
  }

  getHeroRoleImageURL(roleName: string): Observable<string> {
    return this.api.getHeroRoleImageURL(roleName);
  }
}
