import { Component, effect, Inject, signal          } from '@angular/core';
import { ActivatedRoute                             } from '@angular/router';
import { BackendService                             } from 'src/app/_services/BackendService/backend.service';
import { ConfigService                              } from 'src/app/_services/ConfigService/config.service';
import { SpeechService                              } from 'src/app/_services/speechService/speech.service';
import { _environment                               } from 'src/environments/environment';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
})
export class _BaseComponent {
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
  public toogleLisCaption: string = "[Ver Referencias]";
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
      let _PAGE_NAME     = configService.queryUrlParams("pageName");
      //
      console.log(` PAGE NAME : ${_PAGE_NAME}`);
      // Define an effect to react to changes in the signal
      effect(() => {
        if (this.status_message())
            this.speechService.speakTextCustom(this.status_message());
      });
      //      
      this.configService._loadMainPages().then( ()=> 
      {
            //
            this.pageTitle = _environment.mainPageListDictionary[_PAGE_NAME].page_name;
            //
            this.speechService.speakTextCustom(this.pageTitle);
            //
            this.backendService.SetLog(this._pageTitle,_PAGE_NAME);
            //
            if (_environment.mainPageListDictionary[_PAGE_NAME].pages)
                 this._pages    = _environment.mainPageListDictionary[_PAGE_NAME].pages;
      });
  }
  /////////////////////////////////////////////////////////
  // METHODS
  /////////////////////////////////////////////////////////
  //
  toggleList() {
    //
    this.isListVisible     = !this.isListVisible; // Toggle visibility
    this.toogleLisCaption  = !(this.isListVisible)? "[Ver Referencias]" : "[Ocultar Referencias]";
    //
    if (this.isListVisible)
      this.speechService.speakTextCustom("Ver Referncias");
  }
}
