import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AAboutWebComponent } from './a-about-web.component';

describe('AAboutWebComponent', () => {
  let component: AAboutWebComponent;
  let fixture: ComponentFixture<AAboutWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AAboutWebComponent]
    });
    fixture = TestBed.createComponent(AAboutWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
