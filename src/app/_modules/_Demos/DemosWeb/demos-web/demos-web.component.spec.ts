import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemosWebComponent } from './demos-web.component';

describe('DemosWebComponent', () => {
  let component: DemosWebComponent;
  let fixture: ComponentFixture<DemosWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemosWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemosWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
