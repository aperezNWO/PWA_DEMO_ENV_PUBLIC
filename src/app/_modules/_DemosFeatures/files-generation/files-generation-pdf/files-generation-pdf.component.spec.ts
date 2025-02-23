import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesGenerationPDFComponent } from './files-generation-pdf.component';

describe('FilesGenerationPDFComponent', () => {
  let component: FilesGenerationPDFComponent;
  let fixture: ComponentFixture<FilesGenerationPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesGenerationPDFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesGenerationPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
