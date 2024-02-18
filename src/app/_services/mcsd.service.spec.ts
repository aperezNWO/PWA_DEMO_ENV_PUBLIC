import { TestBed } from '@angular/core/testing';

import { MCSDService } from './mcsd.service';

describe('MCSDService', () => {
  let service: MCSDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MCSDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
