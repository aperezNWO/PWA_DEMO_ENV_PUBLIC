import { Component                                              } from '@angular/core';
import { Router                                                 } from '@angular/router';
import { _environment                                           } from 'src/environments/environment';
import { _BaseModel                                             } from 'src/app/_models/entity.model';
import { PAGE_DEMOS_NETCORE_CPP, PAGE_ID, PAGE_SIZE,SEARCH_TERM } from 'src/app/_models/common';
import { ConfigService                                          } from 'src/app/_services/ConfigService/config.service';
import { _SearchService                                         } from 'src/app/_services/searchService/_search.service';
import { _SearchComponent                                       } from 'src/app/_components/search/_search.component ';


//
@Component({
  selector: 'app-cpp-demo',
  templateUrl: './cpp-demo.component.html',
  styleUrl: './cpp-demo.component.css',
  providers: [
    _SearchService,
    { provide: PAGE_ID,     useValue: PAGE_DEMOS_NETCORE_CPP     }, // Unique ID for this component
    { provide: PAGE_SIZE,   useValue: 8                          },
    { provide: SEARCH_TERM  
         ,  useFactory: (configService: ConfigService) => configService.queryUrlParams("searchTerm")                         
         ,  deps: [ConfigService], // Dependencies required by the factory function
    }  
  ]
})
export class CppDemoComponent  extends _SearchComponent  
{
      //
      toogleLisCaption: string = "[Ir a Referencia / C++...]";
      //
      constructor(
                  public override searchService         : _SearchService,
                  public          router                : Router,
      )
      {
          //
          super(searchService);
      }
      //
      toggleList() 
      {
          //
          this.router.navigateByUrl('/CurriculumCpp'); // Redirects to '/target-route'
      }
} 



