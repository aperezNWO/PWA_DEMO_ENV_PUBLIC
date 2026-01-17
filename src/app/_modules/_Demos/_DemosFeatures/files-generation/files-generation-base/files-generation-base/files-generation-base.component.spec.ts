import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesGenerationBaseComponent } from './files-generation-base.component';

describe('FilesGenerationBaseComponent', () => {
  let component: FilesGenerationBaseComponent;
  let fixture: ComponentFixture<FilesGenerationBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesGenerationBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilesGenerationBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
