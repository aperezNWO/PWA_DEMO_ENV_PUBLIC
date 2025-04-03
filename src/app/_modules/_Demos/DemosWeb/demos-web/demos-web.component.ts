import { Component        } from '@angular/core';
import { ActivatedRoute   } from '@angular/router';
import { BaseComponent    } from 'src/app/_components/base/base.component';
import { PAGE_DEMOS_INDEX } from 'src/app/_models/common';
import { BackendService   } from 'src/app/_services/BackendService/backend.service';
import { ConfigService    } from 'src/app/_services/ConfigService/config.service';
import { SpeechService    } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-demos-web',
  templateUrl: './demos-web.component.html',
  styleUrl: './demos-web.component.css'
})
export class DemosWebComponent extends BaseComponent {
     constructor(
           configService  : ConfigService,
           backendService : BackendService,
           route          : ActivatedRoute,
           speechService  : SpeechService,
       )
       {
           //
           super(configService,
                 backendService,
                 route,
                 speechService,
                 PAGE_DEMOS_INDEX,
           );
       }
}
