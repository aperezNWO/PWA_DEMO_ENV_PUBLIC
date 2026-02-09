import { Component                                               } from '@angular/core';
import { Router                                                  } from '@angular/router';
import { PAGE_CURRICULUM_ANGULAR, PAGE_ID, PAGE_SIZE,SEARCH_TERM } from 'src/app/_models/common';
import { ConfigService                                           } from 'src/app/_services/__Utils/ConfigService/config.service';
import { _SearchService                                          } from 'src/app/_services/__Utils/SearchService/_search.service';
import { _SearchComponent                                        } from 'src/app/_components/search/_search.component ';


@Component({
  selector: 'app-curriculum-angular',
  templateUrl: './curriculumAngular.component.html',
  styleUrl: './curriculumAngular.component.css',
  providers: [
    ConfigService,
    _SearchService,
    { provide: PAGE_ID,     useValue: PAGE_CURRICULUM_ANGULAR }, // Unique ID for this component
    { provide: PAGE_SIZE,   useValue: 8                       },
    { provide: SEARCH_TERM  
         ,  useFactory: (configService: ConfigService) => configService.queryUrlParams("searchTerm")                         
         ,  deps: [ConfigService], // Dependencies required by the factory function
    }   
  ]
})
export class CurriculumAngularComponent extends _SearchComponent  
{
    //
    toogleLisCaption: string = "[Ir a Demos / Angular ...]";
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
      this.router.navigate(['/GridParam'], {
        queryParams: {
          pageName: 'PAGE_DEMOS_ANGULAR_JAVASCRIPT'
        }
      });
    }
} 