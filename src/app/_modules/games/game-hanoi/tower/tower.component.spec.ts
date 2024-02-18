import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerComponent } from './tower.component';

describe('TowerComponent', () => {
  let component: TowerComponent;
  let fixture: ComponentFixture<TowerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TowerComponent]
    });
    fixture = TestBed.createComponent(TowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
