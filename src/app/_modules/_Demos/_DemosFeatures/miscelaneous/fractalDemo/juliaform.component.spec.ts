import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FractalDemoComponent } from './juliaform.component';

describe('JuliaformComponent', () => {
  let component: FractalDemoComponent;
  let fixture: ComponentFixture<FractalDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FractalDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FractalDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
