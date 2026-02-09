import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWebComponent } from './home-web.component';

describe('HomeWebComponent', () => {
  let component: HomeWebComponent;
  let fixture: ComponentFixture<HomeWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
