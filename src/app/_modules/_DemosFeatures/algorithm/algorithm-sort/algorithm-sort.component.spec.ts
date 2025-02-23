import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmSortComponent } from './algorithm-sort.component';

describe('AlgorithmSortComponent', () => {
  let component: AlgorithmSortComponent;
  let fixture: ComponentFixture<AlgorithmSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgorithmSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
