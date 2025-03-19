import { AfterViewInit, Component     } from '@angular/core';
import { SpeechService                } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-demos-lang-web',
  templateUrl: './demos-lang-web.component.html',
  styleUrl: './demos-lang-web.component.css'
})
export class DemosLangWebComponent implements AfterViewInit {
      //
      pages = [
        {
          'url': '/AngularDemo',
          'text': '[ANGULAR DEMO]',
        },
        {
          'url': '/CppDemo',
          'text': '[CPP DEMO]',
        },
        {
          'url': '/NetCoreDemo',
          'text': '[.NET CORE DEMO]',
        },
        {
          'url': '/NodeJsDemo',
          'text': '[NODE.JS DEMO]',
        },
        {
          'url': '/SpringBootDemo',
          'text': '[SPRING BOOT DEMO]',
        },
        {
          'url': '/DjangoDemo',
          'text': '[PYTHON / DJANGO]',
        }
      ]
      //
      constructor(public speechService : SpeechService){

      }
      //
      ngAfterViewInit():void
      {
        //
        this.speechService.speakTextCustom("Demos Lenguajes");
      }
}
