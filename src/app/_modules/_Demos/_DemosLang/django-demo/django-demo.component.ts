import { Component                                         } from '@angular/core';
import { _environment                                      } from 'src/environments/environment';
import { _BaseModel                                        } from 'src/app/_models/entity.model';
import { SearchService                                     } from 'src/app/_services/searchService/search.service';
import { SearchComponent                                               } from 'src/app/_components/search/search.component';
import { ENV_LIST_DJANGO_PYTHON_DEMO, PAGE_ID, PAGE_SIZE,SEARCH_TERM   } from 'src/app/_models/common';
import { ConfigService                                                 } from 'src/app/_services/ConfigService/config.service';

@Component({
  selector: 'app-django-demo',
  templateUrl: './django-demo.component.html',
  styleUrl: './django-demo.component.css',
  providers: [
    SearchService,
    ConfigService,
    { provide: PAGE_ID,     useValue  : ENV_LIST_DJANGO_PYTHON_DEMO }, // Unique ID for this component
    { provide: PAGE_SIZE,   useValue  : 8                           },
    { provide: SEARCH_TERM  
         ,  useFactory: (configService: ConfigService) => configService.queryUrlParams("searchTerm")                         
         ,  deps: [ConfigService], // Dependencies required by the factory function
    }  
  ]
})
export class DjangoDemoComponent extends SearchComponent  
{
  constructor(searchService         : SearchService)
  {
      super(searchService);
  }
} 
