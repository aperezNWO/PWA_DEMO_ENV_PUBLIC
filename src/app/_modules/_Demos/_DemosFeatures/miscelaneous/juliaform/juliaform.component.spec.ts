import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuliaformComponent } from './juliaform.component';

describe('JuliaformComponent', () => {
  let component: JuliaformComponent;
  let fixture: ComponentFixture<JuliaformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuliaformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JuliaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
