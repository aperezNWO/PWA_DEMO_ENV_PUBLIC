import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTetrisComponent } from './game-tetris.component';

describe('GameTetrisComponent', () => {
  let component: GameTetrisComponent;
  let fixture: ComponentFixture<GameTetrisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTetrisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameTetrisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
