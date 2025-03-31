import { Component       } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { BaseComponent   } from 'src/app/_components/base/base.component';
import { BackendService  } from 'src/app/_services/BackendService/backend.service';
import { SpeechService   } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-demos-web',
  templateUrl: './demos-web.component.html',
  styleUrl: './demos-web.component.css'
})
export class DemosWebComponent extends BaseComponent {
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
                 "[DEMOS]",
                 "PAGE_DEMOS_INDEX",
           );
       }
}
