import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CppDemoComponent } from './cpp-demo.component';

describe('CppDemoComponent', () => {
  let component: CppDemoComponent;
  let fixture: ComponentFixture<CppDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CppDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CppDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
