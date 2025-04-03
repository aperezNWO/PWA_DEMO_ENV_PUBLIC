import { Component      } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent  } from 'src/app/_components/base/base.component';
import { PAGE_NOT_FOUND } from 'src/app/_models/common';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { ConfigService  } from 'src/app/_services/ConfigService/config.service';
import { SpeechService  } from 'src/app/_services/speechService/speech.service';
//
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
//
export class PageNotFoundComponent  extends BaseComponent {
    //
      constructor(
          configServivce : ConfigService,
          backendService : BackendService,
          route          : ActivatedRoute,
          speechService  : SpeechService,
      )
      {
          //
          super(configServivce,
                backendService,
                route,
                speechService,
                PAGE_NOT_FOUND,
          );
      }
  }
