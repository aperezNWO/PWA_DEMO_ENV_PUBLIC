import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathParsingComponent } from './math-parsing.component';

describe('MathParsingComponent', () => {
  let component: MathParsingComponent;
  let fixture: ComponentFixture<MathParsingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MathParsingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MathParsingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
