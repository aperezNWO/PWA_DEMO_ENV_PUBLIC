import { Component                                } from '@angular/core';
import { ActivatedRoute                           } from '@angular/router';
import { BaseComponent                            } from 'src/app/_components/base/base.component';
import { BackendService                           } from 'src/app/_services/BackendService/backend.service';
import { SpeechService                            } from 'src/app/_services/speechService/speech.service';
import { ConfigService                            } from 'src/app/_services/ConfigService/config.service';
import { PAGE_ABOUT_CONTACT_FORM                  } from 'src/app/_models/common';
    
@Component({
  selector: 'app-contact-form',
  templateUrl: './contactform.component.html',
  styleUrl: './contactform.component.css'
})
export class ContactformComponent extends BaseComponent {

     
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
            PAGE_ABOUT_CONTACT_FORM,
      );
      //     
  }
}
