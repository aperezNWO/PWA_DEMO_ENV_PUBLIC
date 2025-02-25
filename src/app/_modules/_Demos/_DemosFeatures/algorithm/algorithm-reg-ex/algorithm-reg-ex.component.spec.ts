import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmRegExComponent } from './algorithm-reg-ex.component';

describe('AlgorithmRegExComponent', () => {
  let component: AlgorithmRegExComponent;
  let fixture: ComponentFixture<AlgorithmRegExComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgorithmRegExComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmRegExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
