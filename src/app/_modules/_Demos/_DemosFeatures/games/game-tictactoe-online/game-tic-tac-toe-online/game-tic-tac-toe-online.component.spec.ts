import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTicTacToeOnlineComponent } from './game-tic-tac-toe-online.component';

describe('GameTicTacToeOnlineComponent', () => {
  let component: GameTicTacToeOnlineComponent;
  let fixture: ComponentFixture<GameTicTacToeOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTicTacToeOnlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameTicTacToeOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
