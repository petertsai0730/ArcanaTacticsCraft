import { TestBed } from '@angular/core/testing';

import { HeroTypesService } from './hero-types.service';

describe('HeroTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroTypesService = TestBed.get(HeroTypesService);
    expect(service).toBeTruthy();
  });
});
