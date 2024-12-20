import { TestBed } from '@angular/core/testing';

import { ShapeDetectionService } from './shape-detection.service';

describe('ShapeRecognitionService', () => {
  let service: ShapeDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShapeDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
