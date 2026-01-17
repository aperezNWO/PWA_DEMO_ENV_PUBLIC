import { AfterViewInit, Component, Input } from '@angular/core';
import { _environment                    } from 'src/environments/environment';
import { ConfigService                   } from 'src/app/_services/__Utils/ConfigService/config.service';
import { PAGE_ANGULAR_DEMO_LANDING       } from 'src/app/_models/common';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements AfterViewInit {
  //
  public _pages_nested  : any[]   = [];
  //
  @Input() LandingPage? : string = undefined;
  //
  constructor(public configService : ConfigService)
  {
      //
  }
  //
  ngAfterViewInit(): void {
    // 
    this.loadLandingPage();
  }
  //
  loadLandingPage()
  {
      //      
      this.configService._loadMainPages().then( ()=> 
      {
              //
              const pageData = _environment.mainPageListDictionary?.[PAGE_ANGULAR_DEMO_LANDING];
              const pageName = this.LandingPage? this.LandingPage :  pageData?.page_name;
              //
              if (pageName && typeof pageName === 'string') {
                
                  //
                  console.log(`Selected Landing Page : ${pageName}`);

                  //
                  if (_environment.mainPageListDictionary[pageName].pages_nested !== null){
                      //
                      this._pages_nested    = _environment.mainPageListDictionary[pageName].pages_nested;
                  }
              } else {
                  console.warn(`Page data not found for key: ${pageName}`);
                  // Handle missing page gracefully
              }
      });
  }
}
