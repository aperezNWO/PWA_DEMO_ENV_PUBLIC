import { Component                                                       } from '@angular/core';
import { _environment                                                    } from 'src/environments/environment';
import { _BaseModel                                                      } from 'src/app/_models/entity.model';
import { PAGE_DEMOS_ANGULAR_JAVASCRIPT, PAGE_ID, PAGE_SIZE,SEARCH_TERM   } from 'src/app/_models/common';
import { ConfigService                                                   } from 'src/app/_services/ConfigService/config.service';
import { _SearchComponent                                                } from 'src/app/_components/search/_search.component ';
import { _SearchService                                                  } from 'src/app/_services/searchService/_search.service';
import { Router                                                          } from '@angular/router';
@Component({
  selector: 'app-feature-pages',
  templateUrl: './feature-pages.component.html',
  styleUrl: './feature-pages.component.css',
  providers: [
    ConfigService,
    _SearchService,
    { provide: PAGE_ID,     useValue: PAGE_DEMOS_ANGULAR_JAVASCRIPT }, // Unique ID for this component
    { provide: PAGE_SIZE,   useValue: 8                             },
    { provide: SEARCH_TERM  
         ,  useFactory: (configService: ConfigService) => configService.queryUrlParams("searchTerm")                         
         ,  deps: [ConfigService], // Dependencies required by the factory function
    }  
  ]
})
export class FeaturePagesComponent  extends _SearchComponent  
{
    //
    toogleLisCaption: string = "[Ir a Curriculum / Angular...]";
    //
    constructor(
                public override searchService         : _SearchService,
                public          router                : Router,
    )
    {
        //
        super(searchService);
    }
    toggleList() 
    {
      //
      this.router.navigateByUrl('/CurriculumAngular'); // Redirects to '/target-route'
    }
} 


