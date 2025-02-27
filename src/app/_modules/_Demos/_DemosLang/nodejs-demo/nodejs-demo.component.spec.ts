import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodejsDemoComponent } from './nodejs-demo.component';

describe('NodejsDemoComponent', () => {
  let component: NodejsDemoComponent;
  let fixture: ComponentFixture<NodejsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NodejsDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NodejsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
