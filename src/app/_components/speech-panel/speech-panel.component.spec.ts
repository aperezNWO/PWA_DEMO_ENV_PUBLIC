import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechPanelComponent } from './speech-panel.component';

describe('SpeechPanelComponent', () => {
  let component: SpeechPanelComponent;
  let fixture: ComponentFixture<SpeechPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeechPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpeechPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
