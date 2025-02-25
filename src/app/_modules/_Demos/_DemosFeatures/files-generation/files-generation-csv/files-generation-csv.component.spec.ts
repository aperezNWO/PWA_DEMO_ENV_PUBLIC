import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesGenerationCSVComponent } from './files-generation-csv.component';

describe('FilesGenerationCSVComponent', () => {
  let component: FilesGenerationCSVComponent;
  let fixture: ComponentFixture<FilesGenerationCSVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesGenerationCSVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesGenerationCSVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
