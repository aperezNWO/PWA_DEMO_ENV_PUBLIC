import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrPhotoCaptureComponent } from './ocr-photo-capture.component';

describe('OcrPhotoCaptureComponent', () => {
  let component: OcrPhotoCaptureComponent;
  let fixture: ComponentFixture<OcrPhotoCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcrPhotoCaptureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OcrPhotoCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
