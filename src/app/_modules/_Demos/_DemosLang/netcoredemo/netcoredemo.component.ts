import { Component                                               } from '@angular/core';
import { _environment                                            } from 'src/environments/environment';
import { _BaseModel                                              } from 'src/app/_models/entity.model';
import { SearchService                                           } from 'src/app/_services/searchService/search.service';
import { ENV_LIST_NETCORE_DEMO, PAGE_ID, PAGE_SIZE, SEARCH_TERM  } from 'src/app/_models/common';
import { SearchComponent                                         } from 'src/app/_components/search/search.component';
import { ConfigService                                           } from 'src/app/_services/ConfigService/config.service';
import { SpeechService } from 'src/app/_services/speechService/speech.service';

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
  constructor(searchService                : SearchService,
              public speechService         : SpeechService,
  )
  {
      //
      super(searchService);
      //
      this.speechService.speakTextCustom("Demos .NET Core C Charp")
  }
} 


