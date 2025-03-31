import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWebComponent } from './game-web.component';

describe('GameWebComponent', () => {
  let component: GameWebComponent;
  let fixture: ComponentFixture<GameWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameWebComponent]
    });
    fixture = TestBed.createComponent(GameWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
