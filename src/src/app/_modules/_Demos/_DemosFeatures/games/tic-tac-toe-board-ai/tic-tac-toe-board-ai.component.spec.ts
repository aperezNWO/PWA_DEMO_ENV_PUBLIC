import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeBoardAiComponent } from './tic-tac-toe-board-ai.component';

describe('TicTacToeBoardAiComponent', () => {
  let component: TicTacToeBoardAiComponent;
  let fixture: ComponentFixture<TicTacToeBoardAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicTacToeBoardAiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicTacToeBoardAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
