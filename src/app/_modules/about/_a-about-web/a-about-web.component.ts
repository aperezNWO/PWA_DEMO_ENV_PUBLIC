import { Component         } from '@angular/core';
import { BackendService    } from '../../../_services/BackendService/backend.service';
import { BaseComponent     } from 'src/app/_components/base/base.component';
import { ActivatedRoute    } from '@angular/router';
import { SpeechService     } from 'src/app/_services/speechService/speech.service';
import { PAGE_ABOUT_INDEX  } from 'src/app/_models/common';
import { ConfigService     } from 'src/app/_services/ConfigService/config.service';
import { _environment      } from 'src/environments/environment';
//
@Component({
  selector: 'app-a-about-web',
  templateUrl: './a-about-web.component.html',
  styleUrls: ['./a-about-web.component.css']
})
export class AAboutWebComponent extends BaseComponent {
    //
    constructor(
        public override configService  : ConfigService,
        public override backendService : BackendService,
        public override route          : ActivatedRoute,
        public override speechService  : SpeechService,
    )
    {
           //
           super(configService,
                 backendService,
                 route,
                 speechService,
                 PAGE_ABOUT_INDEX,
           );
  }
  //
  ngOnInit(): void {
    //
  }
}
