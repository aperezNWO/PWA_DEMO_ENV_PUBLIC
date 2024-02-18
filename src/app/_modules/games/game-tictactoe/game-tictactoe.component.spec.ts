import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTictactoeComponent } from './game-tictactoe.component';

describe('GameTictactoeComponent', () => {
  let component: GameTictactoeComponent;
  let fixture: ComponentFixture<GameTictactoeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameTictactoeComponent]
    });
    fixture = TestBed.createComponent(GameTictactoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
