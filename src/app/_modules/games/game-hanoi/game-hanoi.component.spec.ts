import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHanoiComponent } from './game-hanoi.component';

describe('GameHanoiComponent', () => {
  let component: GameHanoiComponent;
  let fixture: ComponentFixture<GameHanoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameHanoiComponent]
    });
    fixture = TestBed.createComponent(GameHanoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
