import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmCollisionComponent } from './algorithm-collision.component';

describe('AlgorithmCollisionComponent', () => {
  let component: AlgorithmCollisionComponent;
  let fixture: ComponentFixture<AlgorithmCollisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgorithmCollisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlgorithmCollisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
