import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemosFeaturesWebComponent } from './demos-features-web.component';

describe('DemosFeaturesWebComponent', () => {
  let component: DemosFeaturesWebComponent;
  let fixture: ComponentFixture<DemosFeaturesWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemosFeaturesWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemosFeaturesWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
