import { TestBed } from '@angular/core/testing';

import { TensorFlowService } from './tensor-flow.service';

describe('TensorFlowService', () => {
  let service: TensorFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TensorFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
