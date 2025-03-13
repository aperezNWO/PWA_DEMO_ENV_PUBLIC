import { Component                                         } from '@angular/core';
import { _environment                                      } from 'src/environments/environment';
import { _BaseModel                                        } from 'src/app/_models/common/entityInfo.model';
import { _BaseSortEvent                                    } from 'src/app/_headers/sortable.directive';
import { SearchService                                     } from 'src/app/_services/searchService/search.service';
import { ENV_LIST_ANGULAR_DEMO, PAGE_ID, PAGE_SIZE         } from 'src/app/_models/common/common';
import { SearchComponent                                   } from 'src/app/_components/search/search.component';

@Component({
  selector: 'app-feature-pages',
  templateUrl: './feature-pages.component.html',
  styleUrl: './feature-pages.component.css',
  providers: [
    SearchService,
    { provide: PAGE_ID,   useValue: ENV_LIST_ANGULAR_DEMO }, // Unique ID for this component
    { provide: PAGE_SIZE, useValue: 8                     } 
  ]
})
export class FeaturePagesComponent  extends SearchComponent  
{
  constructor(searchService         : SearchService)
  {
      super(searchService);
  }
} 


