import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemosLangWebComponent } from './demos-lang-web.component';

describe('DemosLangWebComponent', () => {
  let component: DemosLangWebComponent;
  let fixture: ComponentFixture<DemosLangWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemosLangWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemosLangWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
