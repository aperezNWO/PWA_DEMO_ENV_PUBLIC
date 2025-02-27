import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemosCurriculumWebComponent } from './demos-curriculum-web.component';

describe('DemosCurriculumWebComponent', () => {
  let component: DemosCurriculumWebComponent;
  let fixture: ComponentFixture<DemosCurriculumWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemosCurriculumWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemosCurriculumWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
