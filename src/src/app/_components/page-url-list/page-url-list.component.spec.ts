import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUrlListComponent } from './page-url-list.component';

describe('PageUrlListComponent', () => {
  let component: PageUrlListComponent;
  let fixture: ComponentFixture<PageUrlListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageUrlListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageUrlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
