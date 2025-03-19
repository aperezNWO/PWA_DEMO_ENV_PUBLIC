import { AfterViewInit, Component } from '@angular/core';
import { SpeechService } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-demos-curriculum-web',
  templateUrl: './demos-curriculum-web.component.html',
  styleUrl: './demos-curriculum-web.component.css'
})
export class DemosCurriculumWebComponent implements AfterViewInit {
      //
      constructor(public speechService : SpeechService){

      }
      //
      ngAfterViewInit():void
      {
        //
        this.speechService.speakTextCustom("Demos Currículo");
      }

}
