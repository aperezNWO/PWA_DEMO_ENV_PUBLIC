import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTetrisAIComponent } from './game-tetris-ai.component';

describe('GameTetrisAIComponent', () => {
  let component: GameTetrisAIComponent;
  let fixture: ComponentFixture<GameTetrisAIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTetrisAIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameTetrisAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
