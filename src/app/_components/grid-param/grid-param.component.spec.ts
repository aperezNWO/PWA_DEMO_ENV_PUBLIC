import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridParamComponent } from './grid-param.component';

describe('GridParamComponent', () => {
  let component: GridParamComponent;
  let fixture: ComponentFixture<GridParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridParamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
