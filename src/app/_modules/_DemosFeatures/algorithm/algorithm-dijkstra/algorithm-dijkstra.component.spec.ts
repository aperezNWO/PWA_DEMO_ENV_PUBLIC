import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmDijkstraComponent } from './algorithm-dijkstra.component';

describe('AlgorithmDijkstraComponent', () => {
  let component: AlgorithmDijkstraComponent;
  let fixture: ComponentFixture<AlgorithmDijkstraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgorithmDijkstraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmDijkstraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
