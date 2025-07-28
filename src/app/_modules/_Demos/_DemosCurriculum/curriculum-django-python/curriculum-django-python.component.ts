import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { _SearchComponent } from 'src/app/_components/search/_search.component ';
import { PAGE_ID, PAGE_CURRICULUM_DJANGO_PYTHON, PAGE_SIZE, SEARCH_TERM } from 'src/app/_models/common';
import { ConfigService } from 'src/app/_services/ConfigService/config.service';
import { _SearchService } from 'src/app/_services/searchService/_search.service';

@Component({
  selector: 'app-curriculum-django-python',
  templateUrl: './curriculum-django-python.component.html',
  styleUrl: './curriculum-django-python.component.css',
  providers : 
  [
      ConfigService,
      _SearchService,
      { provide: PAGE_ID,     useValue: PAGE_CURRICULUM_DJANGO_PYTHON     }, // Unique ID for this component
      { provide: PAGE_SIZE,   useValue: 8                                 },
      { provide: SEARCH_TERM  
           ,  useFactory: (configService: ConfigService) => configService.queryUrlParams("searchTerm")                         
           ,  deps: [ConfigService], // Dependencies required by the factory function
      }  
     ] 
})
export class CurriculumDjangoPythonComponent extends _SearchComponent {
      //
      toogleLisCaption: string = "[Ir a Demos - Django / Python ...]";
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
        this.router.navigateByUrl('/DjangoDemo'); // Redirects to '/target-route'
      }

}
