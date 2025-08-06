import { Component                                } from '@angular/core';
import { ActivatedRoute                           } from '@angular/router';
import { BackendService                           } from 'src/app/_services/BackendService/backend.service';
import { ConfigService                            } from 'src/app/_services/ConfigService/config.service';
import { SpeechService                            } from 'src/app/_services/speechService/speech.service';
import { _BaseComponent                           } from '../base/_base.component';

@Component({
  selector: 'app-page-url-list',
  templateUrl: './page-url-list.component.html',
  styleUrl: './page-url-list.component.css'
})
export class PageUrlListComponent extends _BaseComponent {
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
                 speechService);
       }
}