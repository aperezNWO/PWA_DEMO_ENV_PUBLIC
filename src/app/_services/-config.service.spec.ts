import { TestBed        } from '@angular/core/testing';
import { _ConfigService } from './-config.service';

describe('ConfigService', () => {
  let service: _ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(_ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
