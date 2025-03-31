import { AfterViewInit, Component     } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/_components/base/base.component';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { SpeechService                } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-demos-lang-web',
  templateUrl: './demos-lang-web.component.html',
  styleUrl: './demos-lang-web.component.css'
})
export class DemosLangWebComponent extends BaseComponent {
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
  constructor(
      backendService : BackendService,
      route          : ActivatedRoute,
      speechService  : SpeechService,
  )
  {
      //
      super(backendService,
            route,
            speechService,
            "[DEMOS - LENGUAJES]",
            "PAGE_DEMOS_LENGUAJES_INDEX",
      );
  }
}
