import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculunmCppComponent } from './curriculunm-cpp.component';

describe('CurriculunmCppComponent', () => {
  let component: CurriculunmCppComponent;
  let fixture: ComponentFixture<CurriculunmCppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculunmCppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurriculunmCppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
