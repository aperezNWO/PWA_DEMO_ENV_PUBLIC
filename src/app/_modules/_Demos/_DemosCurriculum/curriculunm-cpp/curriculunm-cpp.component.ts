import { Component          } from '@angular/core';
import { Router             } from '@angular/router';
import { _SearchComponent   } from 'src/app/_components/search/_search.component ';
import { _SearchService     } from 'src/app/_services/searchService/_search.service';

@Component({
  selector: 'app-curriculunm-cpp',
  templateUrl: './curriculunm-cpp.component.html',
  styleUrl: './curriculunm-cpp.component.css'
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
        this.router.navigateByUrl('/CppDemo'); // Redirects to '/target-route'
      }
}
