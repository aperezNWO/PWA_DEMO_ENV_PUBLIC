import { Component                                         } from '@angular/core';
import { _environment                                      } from 'src/environments/environment';
import { _BaseModel                                        } from 'src/app/_models/common/entityInfo.model';
import { _BaseSortEvent                                    } from 'src/app/_headers/sortable.directive';
import { SearchService                                     } from 'src/app/_services/searchService/search.service';
import { ENV_LIST_NODEJS_DEMO, PAGE_ID, PAGE_SIZE          } from 'src/app/_models/common/common';
import { SearchComponent                                   } from 'src/app/_components/search/search.component';

//
@Component({
  selector: 'app-nodejs-demo',
  templateUrl: './nodejs-demo.component.html',
  styleUrl: './nodejs-demo.component.css',
  providers: [
    SearchService,
    { provide: PAGE_ID,   useValue: ENV_LIST_NODEJS_DEMO        }, // Unique ID for this component
    { provide: PAGE_SIZE, useValue: 8                           } 
  ]
})
export class NodejsDemoComponent   extends SearchComponent  
{
  constructor(searchService         : SearchService)
  {
      super(searchService);
  }
} 


