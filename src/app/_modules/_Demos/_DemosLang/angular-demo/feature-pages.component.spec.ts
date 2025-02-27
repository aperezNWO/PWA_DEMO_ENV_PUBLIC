import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePagesComponent } from './feature-pages.component';

describe('FeaturePagesComponent', () => {
  let component: FeaturePagesComponent;
  let fixture: ComponentFixture<FeaturePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});