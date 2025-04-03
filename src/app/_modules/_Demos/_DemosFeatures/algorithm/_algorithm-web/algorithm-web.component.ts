import { Component               } from '@angular/core';
import { ActivatedRoute          } from '@angular/router';
import { BaseComponent           } from 'src/app/_components/base/base.component';
import { PAGE_ALGORITMOS_INDEX   } from 'src/app/_models/common';
import { BackendService          } from 'src/app/_services/BackendService/backend.service';
import { ConfigService           } from 'src/app/_services/ConfigService/config.service';
import { SpeechService           } from 'src/app/_services/speechService/speech.service';

//
@Component({
  selector: 'app-algorithm-web',
  templateUrl: './algorithm-web.component.html',
  styleUrls: ['./algorithm-web.component.css']
})
//
export class AlgorithmWebComponent extends BaseComponent {
  //
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
            PAGE_ALGORITMOS_INDEX,
      );
  }
}