import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesGenerationXLSComponent } from './files-generation-xls.component';

describe('FilesGenerationXLSComponent', () => {
  let component: FilesGenerationXLSComponent;
  let fixture: ComponentFixture<FilesGenerationXLSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesGenerationXLSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesGenerationXLSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
