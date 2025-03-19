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
          'text': '[ANGULAR / TYPESCRIPT]',
        },
        {
          'url': '/CppDemo',
          'text': '[.NET CORE / C++]',
        },
        {
          'url': '/NetCoreDemo',
          'text': '[.NET CORE / C#]',
        },
        {
          'url': '/NodeJsDemo',
          'text': '[NODE.JS / JAVASCRIPT]',
        },
        {
          'url': '/SpringBootDemo',
          'text': '[SPRING BOOT / JAVA]',
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
