import { Component                                               } from '@angular/core';
import { Router                                                  } from '@angular/router';
import { ConfigService                                           } from 'src/app/_services/ConfigService/config.service';
import { PAGE_CURRICULUM_CPP, PAGE_ID, PAGE_SIZE,SEARCH_TERM     } from 'src/app/_models/common';
import { _SearchComponent                                        } from 'src/app/_components/search/_search.component ';
import { _SearchService                                          } from 'src/app/_services/searchService/_search.service';

@Component({
  selector: 'app-curriculunm-cpp',
  templateUrl: './curriculunm-cpp.component.html',
  styleUrl: './curriculunm-cpp.component.css',
  providers : 
[
    ConfigService,
    _SearchService,
    { provide: PAGE_ID,     useValue: PAGE_CURRICULUM_CPP     }, // Unique ID for this component
    { provide: PAGE_SIZE,   useValue: 8                       },
    { provide: SEARCH_TERM  
         ,  useFactory: (configService: ConfigService) => configService.queryUrlParams("searchTerm")                         
         ,  deps: [ConfigService], // Dependencies required by the factory function
    }  
   ] 
 })

export class CurriculunmCppComponent extends _SearchComponent{
      //
      toogleLisCaption: string = "[Ir a Demos / C++ ...]";
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
          this.router.navigate(['/GridParam'], {
            queryParams: {
              pageName: 'PAGE_DEMOS_NETCORE_CPP'
            }
          });
      }
}
