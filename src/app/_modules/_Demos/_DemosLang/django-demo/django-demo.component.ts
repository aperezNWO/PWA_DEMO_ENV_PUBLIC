import { Component                                                     } from '@angular/core';
import { _environment                                                  } from 'src/environments/environment';
import { _BaseModel                                                    } from 'src/app/_models/entity.model';
import { PAGE_DEMOS_DJANGO_PYTHON, PAGE_ID, PAGE_SIZE,SEARCH_TERM      } from 'src/app/_models/common';
import { ConfigService                                                 } from 'src/app/_services/ConfigService/config.service';
import { _SearchComponent                                              } from 'src/app/_components/search/_search.component ';
import { _SearchService                                                } from 'src/app/_services/searchService/_search.service';

@Component({
  selector: 'app-django-demo',
  templateUrl: './django-demo.component.html',
  styleUrl: './django-demo.component.css',
  providers: [
    ConfigService,    
    _SearchService,
    { provide: PAGE_ID,     useValue  : PAGE_DEMOS_DJANGO_PYTHON   }, // Unique ID for this component
    { provide: PAGE_SIZE,   useValue  : 8                          },
    { provide: SEARCH_TERM  
         ,  useFactory: (configService: ConfigService) => configService.queryUrlParams("searchTerm")                         
         ,  deps: [ConfigService], // Dependencies required by the factory function
    }  
  ]
})
export class DjangoDemoComponent extends _SearchComponent  
{
     //
     constructor(
                 public override searchService         : _SearchService,
     )
     {
         //
         super(searchService);
     }
} 
