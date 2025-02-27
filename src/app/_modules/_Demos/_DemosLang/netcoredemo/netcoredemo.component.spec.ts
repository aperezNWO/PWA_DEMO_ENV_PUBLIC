import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetcoredemoComponent } from './netcoredemo.component';

describe('NetcoredemoComponent', () => {
  let component: NetcoredemoComponent;
  let fixture: ComponentFixture<NetcoredemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetcoredemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetcoredemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
