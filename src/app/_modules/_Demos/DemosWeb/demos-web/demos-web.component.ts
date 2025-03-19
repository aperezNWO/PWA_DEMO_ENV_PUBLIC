import { AfterViewInit, Component } from '@angular/core';
import { SpeechService            } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-demos-web',
  templateUrl: './demos-web.component.html',
  styleUrl: './demos-web.component.css'
})
export class DemosWebComponent implements AfterViewInit {
      //
      constructor(public speechService : SpeechService){

      }
      //
      ngAfterViewInit():void
      {
        //
        this.speechService.speakTextCustom("Demos");
      }
}
