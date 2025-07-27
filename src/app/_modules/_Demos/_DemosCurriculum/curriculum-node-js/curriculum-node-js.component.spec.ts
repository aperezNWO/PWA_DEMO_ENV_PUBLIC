import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumNodeJsComponent } from './curriculum-node-js.component';

describe('CurriculumNodeJsComponent', () => {
  let component: CurriculumNodeJsComponent;
  let fixture: ComponentFixture<CurriculumNodeJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumNodeJsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurriculumNodeJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
