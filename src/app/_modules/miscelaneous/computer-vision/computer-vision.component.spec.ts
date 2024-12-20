import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerVisionComponent } from './computer-vision.component';

describe('ComputerVisionComponent', () => {
  let component: ComputerVisionComponent;
  let fixture: ComponentFixture<ComputerVisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputerVisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComputerVisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
