import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscelaneousComponent } from './miscelaneous.component';

describe('MiscelaneousComponent', () => {
  let component: MiscelaneousComponent;
  let fixture: ComponentFixture<MiscelaneousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiscelaneousComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiscelaneousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
