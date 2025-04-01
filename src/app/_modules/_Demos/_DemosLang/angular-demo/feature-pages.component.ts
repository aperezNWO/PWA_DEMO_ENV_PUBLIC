import { Component                                         } from '@angular/core';
import { _environment                                      } from 'src/environments/environment';
import { _BaseModel                                        } from 'src/app/_models/entity.model';
import { SearchService                                     } from 'src/app/_services/searchService/search.service';
import { ENV_LIST_ANGULAR_DEMO, PAGE_ID, PAGE_SIZE,SEARCH_TERM   } from 'src/app/_models/common';
import { SearchComponent                                         } from 'src/app/_components/search/search.component';
import { ConfigService                                           } from 'src/app/_services/ConfigService/config.service';
import { SpeechService                                           } from 'src/app/_services/speechService/speech.service';
import { BackendService                                          } from 'src/app/_services/BackendService/backend.service';

@Component({
  selector: 'app-feature-pages',
  templateUrl: './feature-pages.component.html',
  styleUrl: './feature-pages.component.css',
  providers: [
    SearchService,
    ConfigService,
    { provide: PAGE_ID,     useValue: ENV_LIST_ANGULAR_DEMO }, // Unique ID for this component
    { provide: PAGE_SIZE,   useValue: 8                     },
    { provide: SEARCH_TERM  
         ,  useFactory: (configService: ConfigService) => configService.queryUrlParams("searchTerm")                         
         ,  deps: [ConfigService], // Dependencies required by the factory function
    }  
  ]
})
export class FeaturePagesComponent  extends SearchComponent  
{
    //
    public pageTitle : string = "[DEMOS - ANGULAR / TYPESCRIPT]";
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
        this.speechService.speakTextCustom(this.pageTitle,"en-US");
        //
        this.backendService.SetLog(this.pageTitle,"PAGE_DEMOS_ANGULAR_TYPESCRIPT");
    }
} 


