import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumAngularComponent } from './curriculumAngular.component';

describe('CurriculumAngularComponent', () => {
  let component: CurriculumAngularComponent;
  let fixture: ComponentFixture<CurriculumAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumAngularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurriculumAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
