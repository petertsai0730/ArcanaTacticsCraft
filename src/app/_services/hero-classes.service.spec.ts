import { TestBed } from '@angular/core/testing';

import { HeroClassesService } from './hero-classes.service';

describe('HeroClassesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroClassesService = TestBed.get(HeroClassesService);
    expect(service).toBeTruthy();
  });
});
