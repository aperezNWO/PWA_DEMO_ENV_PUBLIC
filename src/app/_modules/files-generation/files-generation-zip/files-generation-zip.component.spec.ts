import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesGenerationZIPComponent } from './files-generation-zip.component';

describe('FilesGenerationZIPComponent', () => {
  let component: FilesGenerationZIPComponent;
  let fixture: ComponentFixture<FilesGenerationZIPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesGenerationZIPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesGenerationZIPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
