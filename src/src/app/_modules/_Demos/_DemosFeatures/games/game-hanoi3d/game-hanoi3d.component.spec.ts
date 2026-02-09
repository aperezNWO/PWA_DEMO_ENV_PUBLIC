import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHanoi3dComponent } from './game-hanoi3d.component';

describe('GameHanoi3dComponent', () => {
  let component: GameHanoi3dComponent;
  let fixture: ComponentFixture<GameHanoi3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameHanoi3dComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameHanoi3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
