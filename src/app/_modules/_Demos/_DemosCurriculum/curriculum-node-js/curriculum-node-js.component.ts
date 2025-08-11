import { Component                                                } from '@angular/core';
import { Router                                                   } from '@angular/router';
import { _SearchComponent                                         } from 'src/app/_components/search/_search.component ';
import { PAGE_ID, PAGE_CURRICULUM_NODE_JS, PAGE_SIZE, SEARCH_TERM } from 'src/app/_models/common';
import { ConfigService                                            } from 'src/app/_services/ConfigService/config.service';
import { _SearchService                                           } from 'src/app/_services/searchService/_search.service';

@Component({
  selector: 'app-curriculum-node-js',
  templateUrl: './curriculum-node-js.component.html',
  styleUrl: './curriculum-node-js.component.css',
  providers : 
  [
      ConfigService,
      _SearchService,
      { provide: PAGE_ID,     useValue: PAGE_CURRICULUM_NODE_JS     }, // Unique ID for this component
      { provide: PAGE_SIZE,   useValue: 8                       },
      { provide: SEARCH_TERM  
           ,  useFactory: (configService: ConfigService) => configService.queryUrlParams("searchTerm")                         
           ,  deps: [ConfigService], // Dependencies required by the factory function
      }  
     ] 
})
export class CurriculumNodeJsComponent extends _SearchComponent{
      //
      toogleLisCaption: string = "[Ir a Demos - Node.js / Javascript ...]";
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
              pageName: 'PAGE_DEMOS_NODEJS_JAVASCRIPT'
            }
          });
      }
}
