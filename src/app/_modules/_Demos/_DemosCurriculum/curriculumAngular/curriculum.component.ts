import { Component                                         } from '@angular/core';
import { _environment                                      } from 'src/environments/environment';
import { _BaseModel                                        } from 'src/app/_models/entity.model';
import { SearchService                                     } from 'src/app/_services/searchService/search.service';
import { ENV_LIST_ANGULAR_EDU, PAGE_ID, PAGE_SIZE,SEARCH_TERM } from 'src/app/_models/common';
import { SearchComponent                                      } from 'src/app/_components/search/search.component';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css',
  providers: [
    SearchService,
    { provide: PAGE_ID,     useValue: ENV_LIST_ANGULAR_EDU }, // Unique ID for this component
    { provide: PAGE_SIZE,   useValue: 8                    },
    { provide: SEARCH_TERM, useValue: ""                   }  
  ]
})
export class CurriculumComponent extends SearchComponent  
{
  constructor(searchService         : SearchService)
  {
      super(searchService);
  }
} 