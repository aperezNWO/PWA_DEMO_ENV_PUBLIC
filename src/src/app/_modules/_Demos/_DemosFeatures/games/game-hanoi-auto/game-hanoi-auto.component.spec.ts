import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHanoiAutoComponent } from './game-hanoi-auto.component';

describe('GameHanoiAutoComponent', () => {
  let component: GameHanoiAutoComponent;
  let fixture: ComponentFixture<GameHanoiAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameHanoiAutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameHanoiAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
