import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactformComponent } from './contactform.component';

describe('ContactformComponent', () => {
  let component: ContactformComponent;
  let fixture: ComponentFixture<ContactformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
