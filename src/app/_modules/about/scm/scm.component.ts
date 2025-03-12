import { Component                                         } from '@angular/core';
import { _environment                                      } from 'src/environments/environment';
import { _BaseModel                                        } from 'src/app/_models/common/entityInfo.model';
import { _BaseSortEvent                                    } from 'src/app/_headers/sortable.directive';
import { SearchComponent                                   } from 'src/app/_components/search/search.component';
import { SearchService                                     } from 'src/app/_services/searchService/search.service';
import { ENV_LIST_SCM_CONFIG, PAGE_ID, PAGE_SIZE           } from 'src/app/_models/common/common';

//
@Component({
  selector: 'app-scm',
  templateUrl: './scm.component.html',
  styleUrls: ['./scm.component.css'],
  providers: [
    SearchService,
    { provide: PAGE_ID,   useValue: ENV_LIST_SCM_CONFIG }, // Unique ID for this component
    { provide: PAGE_SIZE, useValue: 8                   } 
  ]
})
export class SCMComponent extends SearchComponent {
  
  constructor(searchService         : SearchService)
  {
      super(searchService);
  }
} 