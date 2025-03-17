import { Component, EventEmitter, Output, Input     } from '@angular/core';
import { SpeechService                              } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-speech-panel',
  templateUrl: './speech-panel.component.html',
  styleUrl: './speech-panel.component.css'
})
export class SpeechPanelComponent {
    //////////////////////////////////////////////////////////
    ListeningButtonIconOn : string  = './assets/images/mic_on.gif';
    ListeningButtonIconOff: string  = './assets/images/mic_off.gif';
    SpeakerIcon           : string  = './assets/images/speaker_on.gif';
    clearFormIcon         : string  = './assets/images/clearForm.gif';;
    @Output() clickEventSpeak     = new EventEmitter<string>();
    @Output() clickEventClearText = new EventEmitter<void>();
  //
  constructor(public  speechService : SpeechService)
  {
    
  }
  //
  speakText() : void 
  {
      //
      this.clickEventSpeak.emit(this.speechService.speakText());
      //
      //console.log("Speak Text Event Emmiter");
  }
  //
  clearText() : void
  {
    this.clickEventClearText.emit();
    //
    //console.log("Clear Text Event Emmiter");
  }
}