import { Component, effect, signal ,OnInit          } from '@angular/core';
import { ActivatedRoute, Params                     } from '@angular/router';
import { BackendService                             } from 'src/app/_services/BackendService/backend.service';
import { ConfigService                              } from 'src/app/_services/__Utils/ConfigService/config.service';
import { SpeechService                              } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { _environment                               } from 'src/environments/environment';

@Component({
  selector: 'app-base-custom',
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
})
export class _BaseComponent implements OnInit {
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
  public _pages         : any[]   = [];
  /////////////////////////////////////////////////////////
  // CONSTRUCTOR - EVENT HANDLERS
  /////////////////////////////////////////////////////////
  //
  constructor(    
                  public configService                            : ConfigService,
                  public backendService                           : BackendService, 
                  public route                                    : ActivatedRoute,
                  public speechService                            : SpeechService,
             ) 
  {
    //
    effect(() => {
      if (this.status_message())
          this.speechService.speakTextCustom(this.status_message());
    });
  }
  /////////////////////////////////////////////////////////
  // EVENT HANDLERRS
  /////////////////////////////////////////////////////////
  ngOnInit(): void {

    // Subscribe to query param changes
    this.route.queryParams.subscribe(params => {
      //
      const pageName =  params['pageName']? params['pageName'] : '';
      //
      if (!pageName) {
        console.warn('No pageName provided in query params');
        return;
      }
      //
      console.log(`PAGE NAME: ${pageName}`);
      // Update title and pages based on pageName
      this.updatePageContent(pageName);
    });
  }
  /////////////////////////////////////////////////////////
  // METHODS
  /////////////////////////////////////////////////////////
  //
  private async updatePageContent(pageName: string) {
    // Clear previous state
    this._pages = [];
    //
    try 
    {
      //
      await this.configService._loadMainPages(); // Ensure data is loaded
      //
      if (_environment.mainPageListDictionary[pageName]) {
        //
        this.pageTitle = _environment.mainPageListDictionary[pageName].page_name;
        //  
        this.speechService.speakTextCustom(this.pageTitle);
        //  
        this.backendService.SetLog(this.pageTitle, pageName);
        //  
        if (_environment.mainPageListDictionary[pageName].pages) 
        {
          //
          this._pages = _environment.mainPageListDictionary[pageName].pages;

          // Convert all query strings to proper objects
          this._pages = this._pages.map(page => ({
                ...page,
                queryParamsObj: (page.queryParams && typeof page.queryParams === 'string')? this.parseQueryParams(page.queryParams) : page.queryParamsObj
          }));
        }
      } 
      else 
      {
        //
        console.error(`Unknown pageName: ${pageName}`);
        //
        this.pageTitle = 'Página no encontrada';
      }
    } 
    catch (error) 
    {
      //
      console.error('Failed to load pages', error);
    }
  }
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
