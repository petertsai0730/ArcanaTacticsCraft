import { TestBed } from '@angular/core/testing';

import { DevelopService } from './develop.service';

describe('DevelopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevelopService = TestBed.get(DevelopService);
    expect(service).toBeTruthy();
  });
});
