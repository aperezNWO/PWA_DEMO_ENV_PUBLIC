import { Component                                               } from '@angular/core';
import { _environment                                            } from 'src/environments/environment';
import { _BaseModel                                              } from 'src/app/_models/entity.model';
import { PAGE_CURRICULUM_ANGULAR, PAGE_ID, PAGE_SIZE,SEARCH_TERM } from 'src/app/_models/common';
import { ConfigService                                           } from 'src/app/_services/ConfigService/config.service';
import { _SearchService                                          } from 'src/app/_services/searchService/_search.service';
import { _SearchComponent                                        } from 'src/app/_components/search/_search.component ';
import { Router                                                  } from '@angular/router';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css',
  providers: [
    ConfigService,
    _SearchService,
    { provide: PAGE_ID,     useValue: PAGE_CURRICULUM_ANGULAR }, // Unique ID for this component
    { provide: PAGE_SIZE,   useValue: 8                    },
    { provide: SEARCH_TERM  
         ,  useFactory: (configService: ConfigService) => configService.queryUrlParams("searchTerm")                         
         ,  deps: [ConfigService], // Dependencies required by the factory function
    }  
  ]
})
export class CurriculumComponent extends _SearchComponent  
{
    //
    toogleLisCaption: string = "Demos";
    //
    constructor(
                public override searchService         : _SearchService,
                public          router                : Router,
    )  
    {
        //
        super(
              searchService);
    }
    toggleList() 
    {
      //
      this.router.navigateByUrl('/AngularDemo'); // Redirects to '/target-route'
    }
} 