import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DjangoDemoComponent } from './django-demo.component';

describe('DjangoDemoComponent', () => {
  let component: DjangoDemoComponent;
  let fixture: ComponentFixture<DjangoDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DjangoDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DjangoDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
