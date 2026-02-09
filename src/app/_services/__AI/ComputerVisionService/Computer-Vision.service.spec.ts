import { TestBed } from '@angular/core/testing';

import { ComputerVisionService } from './Computer-Vision.service';

describe('ShapeRecognitionService', () => {
  let service: ComputerVisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComputerVisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
