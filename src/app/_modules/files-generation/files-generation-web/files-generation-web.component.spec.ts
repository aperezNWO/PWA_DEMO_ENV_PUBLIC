import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesGenerationWebComponent } from './files-generation-web.component';

describe('FilesGenerationWebComponent', () => {
  let component: FilesGenerationWebComponent;
  let fixture: ComponentFixture<FilesGenerationWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesGenerationWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesGenerationWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
