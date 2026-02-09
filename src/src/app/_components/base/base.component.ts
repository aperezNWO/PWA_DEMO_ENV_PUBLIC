import { Component, effect, Inject, signal          } from '@angular/core';
import { ActivatedRoute                             } from '@angular/router';
import { PAGE_TITLE_LOG                             } from 'src/app/_models/common';
import { BackendService                             } from 'src/app/_services/BackendService/backend.service';
import { ConfigService                              } from 'src/app/_services/__Utils/ConfigService/config.service';
import { SpeechService                              } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { _environment                               } from 'src/environments/environment';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
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
  public _page_name     : string  = ''
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
            const pageData = _environment.mainPageListDictionary?.[PAGE_TITLE_LOG];
            this._page_name = pageData?.page_name;

            if (this._page_name && typeof this._page_name === 'string') {
              
                //
                this.pageTitle = this._page_name;
                this.speechService.speakTextCustom(this.pageTitle, "en-US");
                this.backendService.SetLog(this._pageTitle, PAGE_TITLE_LOG);

                //
                if (_environment.mainPageListDictionary[PAGE_TITLE_LOG].pages !== null){
                    //
                    this._pages    = _environment.mainPageListDictionary[PAGE_TITLE_LOG].pages;
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
}
