import { Component                                         } from '@angular/core';
import { _environment                                      } from 'src/environments/environment';
import { _BaseModel                                        } from 'src/app/_models/entity.model';
import { SearchComponent                                   } from 'src/app/_components/search/search.component';
import { SearchService                                                  } from 'src/app/_services/searchService/search.service';
import { SpeechService                                                  } from 'src/app/_services/speechService/speech.service';
import { BackendService                                                 } from 'src/app/_services/BackendService/backend.service';
import { PAGE_ABOUT_SCM, PAGE_ID, PAGE_SIZE, SEARCH_TERM           } from 'src/app/_models/common';
import { _SearchService                                                 } from 'src/app/_services/searchService/_search.service';
import { _SearchComponent } from 'src/app/_components/search/_search.component ';

//
@Component({
  selector: 'app-scm',
  templateUrl: './scm.component.html',
  styleUrls: ['./scm.component.css'],
  providers: [
    _SearchService,
    { provide: PAGE_ID,     useValue: PAGE_ABOUT_SCM }, // Unique ID for this component
    { provide: PAGE_SIZE,   useValue: 8                   },
    { provide: SEARCH_TERM, useValue: ""                  }  
  ]
})
export class SCMComponent extends _SearchComponent {
  //
  constructor(
              public speechService                  : SpeechService,
              public backendService                 : BackendService,
              public override searchService         : _SearchService,
  )
  {
      //
      super(searchService);
      //
      this.speechService.speakTextCustom(this.searchService.pageTitle);
      //
      this.backendService.SetLog(this.searchService.pageTitle,PAGE_ABOUT_SCM)

  }
} 