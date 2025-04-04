import { Component           } from '@angular/core';
import { ActivatedRoute      } from '@angular/router';
import { BaseComponent       } from 'src/app/_components/base/base.component';
import { PAGE_ABOUT_EDU_RESC } from 'src/app/_models/common';
import { BackendService      } from 'src/app/_services/BackendService/backend.service';
import { ConfigService       } from 'src/app/_services/ConfigService/config.service';
import { SpeechService       } from 'src/app/_services/speechService/speech.service';
import { _environment        } from 'src/environments/environment';

@Component({
  selector: 'app-edu-resources',
  templateUrl: './edu-resources.component.html',
  styleUrl: './edu-resources.component.css'
})
export class EduResourcesComponent   extends BaseComponent {
    //
    constructor(
           public override configService      : ConfigService,
           public override backendService     : BackendService,
           public override route              : ActivatedRoute,
           public override speechService      : SpeechService,
    )
    {
      //
      super(configService,
            backendService,
            route,
            speechService,
            PAGE_ABOUT_EDU_RESC,
      );
      //
      this.configService.loadEduResources().then( ()=> 
      {
          //
          this._pages = _environment.eduResourcesList;
          //
      });
   }
}

