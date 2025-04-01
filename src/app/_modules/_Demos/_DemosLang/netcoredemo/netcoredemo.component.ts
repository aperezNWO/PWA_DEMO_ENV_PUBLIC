import { Component                                               } from '@angular/core';
import { _environment                                            } from 'src/environments/environment';
import { _BaseModel                                              } from 'src/app/_models/entity.model';
import { SearchService                                           } from 'src/app/_services/searchService/search.service';
import { ENV_LIST_NETCORE_DEMO, PAGE_ID, PAGE_SIZE, SEARCH_TERM  } from 'src/app/_models/common';
import { SearchComponent                                         } from 'src/app/_components/search/search.component';
import { ConfigService                                           } from 'src/app/_services/ConfigService/config.service';
import { SpeechService                                           } from 'src/app/_services/speechService/speech.service';
import { BackendService                                          } from 'src/app/_services/BackendService/backend.service';

//
@Component({
  selector: 'app-netcoredemo',
  templateUrl: './netcoredemo.component.html',
  styleUrl: './netcoredemo.component.css',
  providers: [
    SearchService,
    { provide: PAGE_ID,     useValue: ENV_LIST_NETCORE_DEMO       }, // Unique ID for this component
    { provide: PAGE_SIZE,   useValue: 8                           },
    { provide: SEARCH_TERM  
         ,  useFactory: (configService: ConfigService) => configService.queryUrlParams("searchTerm")                         
         ,  deps: [ConfigService], // Dependencies required by the factory function
    }  
  ]
})
export class NetcoredemoComponent   extends SearchComponent  
{
     //
     public pageTitle : string = "[DEMOS - .NET CORE / C#]";
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
         this.backendService.SetLog(this.pageTitle,"PAGE_DEMOS_NETCORE_C_SHARP");
     }
} 


