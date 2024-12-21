import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireworksComponent } from './fireworks.component';

describe('FireworksComponent', () => {
  let component: FireworksComponent;
  let fixture: ComponentFixture<FireworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireworksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FireworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
