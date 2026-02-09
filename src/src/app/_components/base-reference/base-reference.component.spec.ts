import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseReferenceComponent } from './base-reference.component';

describe('BaseReferenceComponent', () => {
  let component: BaseReferenceComponent;
  let fixture: ComponentFixture<BaseReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseReferenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
