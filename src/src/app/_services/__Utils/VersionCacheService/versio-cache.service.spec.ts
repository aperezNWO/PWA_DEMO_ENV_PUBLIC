import { TestBed } from '@angular/core/testing';

import { VersioCacheService } from './versio-cache.service';

describe('VersioCacheService', () => {
  let service: VersioCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersioCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
