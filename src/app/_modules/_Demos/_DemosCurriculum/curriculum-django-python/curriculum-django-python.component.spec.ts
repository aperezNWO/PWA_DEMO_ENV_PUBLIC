import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumDjangoPythonComponent } from './curriculum-django-python.component';

describe('CurriculumDjangoPythonComponent', () => {
  let component: CurriculumDjangoPythonComponent;
  let fixture: ComponentFixture<CurriculumDjangoPythonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumDjangoPythonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurriculumDjangoPythonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
