import { Component                                               } from '@angular/core';
import { _environment                                            } from 'src/environments/environment';
import { _BaseModel                                              } from 'src/app/_models/entity.model';
import { SearchService                                           } from 'src/app/_services/searchService/search.service';
import { ENV_LIST_NETCORE_DEMO, PAGE_ID, PAGE_SIZE, SEARCH_TERM  } from 'src/app/_models/common';
import { SearchComponent                                         } from 'src/app/_components/search/search.component';

//
@Component({
  selector: 'app-netcoredemo',
  templateUrl: './netcoredemo.component.html',
  styleUrl: './netcoredemo.component.css',
  providers: [
    SearchService,
    { provide: PAGE_ID,     useValue: ENV_LIST_NETCORE_DEMO       }, // Unique ID for this component
    { provide: PAGE_SIZE,   useValue: 8                           },
    { provide: SEARCH_TERM, useValue: ""                          }  
  ]
})
export class NetcoredemoComponent   extends SearchComponent  
{
  constructor(searchService         : SearchService)
  {
      super(searchService);
  }
} 


