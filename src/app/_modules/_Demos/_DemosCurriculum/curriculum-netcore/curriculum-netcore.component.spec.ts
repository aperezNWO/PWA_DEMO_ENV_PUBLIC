import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumNetcoreComponent } from './curriculum-netcore.component';

describe('CurriculumNetcoreComponent', () => {
  let component: CurriculumNetcoreComponent;
  let fixture: ComponentFixture<CurriculumNetcoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumNetcoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurriculumNetcoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
