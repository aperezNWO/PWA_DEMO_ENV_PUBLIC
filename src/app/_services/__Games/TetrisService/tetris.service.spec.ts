import { TestBed } from '@angular/core/testing';

import { TetrisService } from './tetris.service';

describe('TetrisService', () => {
  let service: TetrisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TetrisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
