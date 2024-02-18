import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSudokuComponent } from './game-sudoku.component';

describe('GameSudokuComponent', () => {
  let component: GameSudokuComponent;
  let fixture: ComponentFixture<GameSudokuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameSudokuComponent]
    });
    fixture = TestBed.createComponent(GameSudokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
