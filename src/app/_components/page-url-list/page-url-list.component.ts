import { Component                                } from '@angular/core';
import { ActivatedRoute                           } from '@angular/router';
import { PAGE_DEMOS_CURRICULUM_INDEX, PAGE_NAME   } from 'src/app/_models/common';
import { BackendService                           } from 'src/app/_services/BackendService/backend.service';
import { ConfigService                            } from 'src/app/_services/ConfigService/config.service';
import { SpeechService                            } from 'src/app/_services/speechService/speech.service';
import { BaseComponent                            } from '../base/base.component';

@Component({
  selector: 'app-page-url-list',
  templateUrl: './page-url-list.component.html',
  styleUrl: './page-url-list.component.css',
      providers: [
      ConfigService,
      { provide: PAGE_NAME  
           ,  useFactory: (configService: ConfigService) => configService.queryUrlParams("pageName")                         
           ,  deps: [ConfigService], // Dependencies required by the factory function
      }   
    ]
})
export class PageUrlListComponent extends BaseComponent {
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
                 PAGE_DEMOS_CURRICULUM_INDEX,
           );
           //
           console.log(` Page Name : ${PAGE_NAME}`);
       }
}