import { Component, effect, Inject, signal          } from '@angular/core';
import { ActivatedRoute,  Params                    } from '@angular/router';
import { PAGE_TITLE_LOG                             } from 'src/app/_models/common';
import { BackendService                             } from 'src/app/_services/BackendService/backend.service';
import { ConfigService                              } from 'src/app/_services/__Utils/ConfigService/config.service';
import { SpeechService                              } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { _environment                               } from 'src/environments/environment';

@Component({
  selector: 'app-base-reference',
  templateUrl: './base-reference.component.html',
  styleUrl: './base-reference.component.css'
})
export class BaseReferenceComponent {
  /////////////////////////////////////////////////////////
  // PROPERTIES
  /////////////////////////////////////////////////////////
  
  public get pageTitle()   : string {
    return this._pageTitle;
  }
  public set pageTitle(value : string) {
    this._pageTitle = value;
  }
  private _pageTitle       : string = "";
  //
  public isListVisible            = false; // Initially hidden
  public toogleLisCaption: string = "[See references]";
  //
  public status_message           = signal<string>('');
  //
  public _pages                   : any[]   = [];
  public _pages_nested            : any[]   = [];
  public _page_name               : string  = ''
  public  pagesByGroupId          : { [id: number]: any[] } = {};
  /////////////////////////////////////////////////////////
  // CONSTRUCTOR - EVENT HANDLERS
  /////////////////////////////////////////////////////////
  //
  constructor(    public configService                            : ConfigService,
                  public backendService                           : BackendService, 
                  public route                                    : ActivatedRoute,
                  public speechService                            : SpeechService,
                  @Inject(PAGE_TITLE_LOG) public PAGE_TITLE_LOG   : string
             ) 
  {
      // Define an effect to react to changes in the signal
      effect(() => {
        if (this.status_message())
            //
            console.log(`status_message : ${this.status_message()} `);
            //
            this.speechService.speakTextCustom(this.status_message());
      });
      //      
      this.configService._loadMainPages().then( ()=> 
      {
            //
            const pageData = _environment.mainPageListDictionary?.[PAGE_TITLE_LOG];
            this._page_name = pageData?.page_name;

            //
            if (this._page_name && typeof this._page_name === 'string') {
              
                //
                this.pageTitle = this._page_name;
                this.speechService.speakTextCustom(this.pageTitle, "en-US");
                this.backendService.SetLog(this._pageTitle, PAGE_TITLE_LOG);

                //
                if (_environment.mainPageListDictionary[PAGE_TITLE_LOG].pages !== null){
                    // Convert all query strings to proper objects
                    _environment.mainPageListDictionary[PAGE_TITLE_LOG].pages          = _environment.mainPageListDictionary[PAGE_TITLE_LOG].pages.map(page => ({
                        ...page,
                        queryParamsObj: this.parseQueryParams(page.queryParams)
                    }));
                    //
                    this._pages          = _environment.mainPageListDictionary[PAGE_TITLE_LOG].pages;
                    // Convert all query strings to proper objects
                    this._pages          = this._pages.map(page => ({
                        ...page,
                        queryParamsObj: (page.queryParams && typeof page.queryParams === 'string')? this.parseQueryParams(page.queryParams) : page.queryParamsObj
                    }));
                }
                //
                if (_environment.mainPageListDictionary[PAGE_TITLE_LOG].pages_nested !== null){
                    //
                    this._pages_nested    = _environment.mainPageListDictionary[PAGE_TITLE_LOG].pages_nested;

                    // Convert all query strings to proper objects
                    this._pages_nested = this._pages_nested.map(page => ({
                        ...page,
                        queryParamsObj: this.parseQueryParams(page.queryParams)
                    }));

                    // Group pages by ID
                    this.pagesByGroupId = this._pages_nested.reduce((groups, page) => {
                        const id = page.id;
                        if (!groups[id]) {
                          groups[id] = [];
                        }
                        groups[id].push(page);
                        return groups;
                    }, {});
                }
            } else {
                console.warn(`Page data not found for key: ${PAGE_TITLE_LOG}`);
                // Handle missing page gracefully
                this.pageTitle = PAGE_TITLE_LOG;
            }
     
      });
  }
  /////////////////////////////////////////////////////////
  // METHODS
  /////////////////////////////////////////////////////////
  //
  toggleList() {
    //
    this.isListVisible     = !this.isListVisible; // Toggle visibility
    this.toogleLisCaption  = !(this.isListVisible)? "[See references]" : "[Hide references]";
    //
    if (this.isListVisible)
      this.speechService.speakTextCustom("See references");
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

