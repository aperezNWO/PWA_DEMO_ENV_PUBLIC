import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalSpecsComponent } from './technical-specs.component';

describe('TechnicalSpecsComponent', () => {
  let component: TechnicalSpecsComponent;
  let fixture: ComponentFixture<TechnicalSpecsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicalSpecsComponent]
    });
    fixture = TestBed.createComponent(TechnicalSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
