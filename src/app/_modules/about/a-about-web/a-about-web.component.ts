import { Component         } from '@angular/core';
import { BackendService    } from '../../../_services/BackendService/backend.service';
import { BaseComponent     } from 'src/app/_components/base/base.component';
import { ActivatedRoute    } from '@angular/router';
import { SpeechService     } from 'src/app/_services/speechService/speech.service';
//
@Component({
  selector: 'app-a-about-web',
  templateUrl: './a-about-web.component.html',
  styleUrls: ['./a-about-web.component.css']
})
export class AAboutWebComponent extends BaseComponent {
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
                 "[ACERCA DE]",
                 "PAGE_ABOUT_INDEX",
           );
       }
}
