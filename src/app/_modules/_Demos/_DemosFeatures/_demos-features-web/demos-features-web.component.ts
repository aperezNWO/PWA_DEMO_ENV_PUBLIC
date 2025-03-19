import { AfterViewInit, Component } from '@angular/core';
import { SpeechService } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-demos-features-web',
  templateUrl: './demos-features-web.component.html',
  styleUrl: './demos-features-web.component.css'
})
export class DemosFeaturesWebComponent implements AfterViewInit {
      //
      constructor(public speechService : SpeechService){

      }
      //
      ngAfterViewInit():void
      {
        //
        this.speechService.speakTextCustom("Demos Características");
      }
}
