import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootDemoComponent } from './spring-boot-demo.component';

describe('SpringBootDemoComponent', () => {
  let component: SpringBootDemoComponent;
  let fixture: ComponentFixture<SpringBootDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpringBootDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpringBootDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
