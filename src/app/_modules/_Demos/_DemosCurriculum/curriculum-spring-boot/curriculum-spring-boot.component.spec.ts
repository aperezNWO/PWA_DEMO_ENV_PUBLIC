import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumSpringBootComponent } from './curriculum-spring-boot.component';

describe('CurriculumSpringBootComponent', () => {
  let component: CurriculumSpringBootComponent;
  let fixture: ComponentFixture<CurriculumSpringBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumSpringBootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurriculumSpringBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
