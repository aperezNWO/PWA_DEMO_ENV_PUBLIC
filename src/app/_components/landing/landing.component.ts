import { AfterViewInit, Component, Input } from '@angular/core';
import { _environment                    } from 'src/environments/environment';
import { ConfigService                   } from 'src/app/_services/__Utils/ConfigService/config.service';
import { PAGE_ANGULAR_DEMO_LANDING       } from 'src/app/_models/common';
import { Params } from '@angular/router';


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
                      // Convert all query strings to proper objects
                      this._pages_nested = this._pages_nested.map(page => ({
                        ...page,
                        queryParamsObj: this.parseQueryParams(page.queryParams)
                      }));
                  }
              } else {
                  console.warn(`Page data not found for key: ${pageName}`);
                  // Handle missing page gracefully
              }
      });
  }
  // 
  parseQueryParams(str: string): Params {
        // Comprehensive validation
        if (typeof str !== 'string' || !str.trim()) {
            console.debug('parseQueryParams: Invalid input', { input: str });
            return {};
        }
        // Clean the string (remove curly braces, quotes, extra spaces)
        const cleanStr = str
            .replace(/{|}/g, '')
            .replace(/['"]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        
        // Split into key-value pairs
        return cleanStr.split(',').reduce((params, pair) => {
            const [key, value] = pair.split(':').map(s => s.trim());
            if (key && value) {
            params[key] = value;
            }
            return params;
        }, {} as Params);
        }
}
