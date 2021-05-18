import { TestBed } from '@angular/core/testing';

import { HeroRolesService } from './hero-roles.service';

describe('HeroRolesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroRolesService = TestBed.get(HeroRolesService);
    expect(service).toBeTruthy();
  });
});
