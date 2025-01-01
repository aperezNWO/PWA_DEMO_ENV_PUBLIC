import { TestBed } from '@angular/core/testing';

import { PageRestartService } from './page-restart.service';

describe('PageRestartService', () => {
  let service: PageRestartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageRestartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
