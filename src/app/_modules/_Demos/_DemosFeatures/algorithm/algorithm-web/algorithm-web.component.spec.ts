import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmWebComponent } from './algorithm-web.component';

describe('AlgorithmWebComponent', () => {
  let component: AlgorithmWebComponent;
  let fixture: ComponentFixture<AlgorithmWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgorithmWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
