import { Component                                         } from '@angular/core';
import { _environment                                      } from 'src/environments/environment';
import { _BaseModel                                        } from 'src/app/_models/entity.model';
import { SearchComponent                                   } from 'src/app/_components/search/search.component';
import { SearchService                                                  } from 'src/app/_services/searchService/search.service';
import { SpeechService                                                  } from 'src/app/_services/speechService/speech.service';
import { BackendService                                                 } from 'src/app/_services/BackendService/backend.service';
import { ENV_LIST_SCM_CONFIG, PAGE_ID, PAGE_SIZE, SEARCH_TERM           } from 'src/app/_models/common';

//
@Component({
  selector: 'app-scm',
  templateUrl: './scm.component.html',
  styleUrls: ['./scm.component.css'],
  providers: [
    SearchService,
    { provide: PAGE_ID,     useValue: ENV_LIST_SCM_CONFIG }, // Unique ID for this component
    { provide: PAGE_SIZE,   useValue: 8                   },
    { provide: SEARCH_TERM, useValue: ""                  }  
  ]
})
export class SCMComponent extends SearchComponent {
  //
  public pageTitle : string = "[Software Configuration Management]";
  //
  constructor(
              public speechService                  : SpeechService,
              public backendService                 : BackendService,
              public override searchService         : SearchService,
  )
  {
      //
      super(searchService);
      //
      this.speechService.speakTextCustom(this.pageTitle);
      //
      this.backendService.SetLog(this.pageTitle,"PAGE_ABOUT_SCM")

  }
} 