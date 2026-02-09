import { Component, Inject, ViewChild   } from '@angular/core';
import { FormBuilder, Validators        } from '@angular/forms';
import { ActivatedRoute                 } from '@angular/router';
import { BehaviorSubject                } from 'rxjs';
import { BaseComponent                  } from 'src/app/_components/base/base.component';
import { PAGE_TITLE_LOG                 } from 'src/app/_models/common';
import { _languageName, SearchCriteria  } from 'src/app/_models/entity.model';
import { ConfigService                  } from 'src/app/_services/__Utils/ConfigService/config.service';
import { SpeechService                  } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { BackendService                 } from 'src/app/_services/BackendService/backend.service';

@Component({
  selector: 'app-files-generation-base',
  templateUrl: './files-generation-base.component.html',
  styleUrl: './files-generation-base.component.css'
})
export class FilesGenerationBaseComponent extends BaseComponent  {

 
    //
    constructor(  public formBuilder                                       : FormBuilder, 
                  public override configService                            : ConfigService,
                  public override backendService                           : BackendService, 
                  public override route                                    : ActivatedRoute,
                  public override speechService                            : SpeechService,
                  @Inject(PAGE_TITLE_LOG) public override PAGE_TITLE_LOG   : string
             ) 
  {
       //
       super(   configService,
                backendService,
                route,
                speechService,
                PAGE_TITLE_LOG
       )
    }

   
}
