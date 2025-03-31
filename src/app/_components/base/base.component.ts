import { Component, effect, Inject, signal          } from '@angular/core';
import { ActivatedRoute                             } from '@angular/router';
import { PAGE_TITLE, PAGE_TITLE_LOG                 } from 'src/app/_models/common';
import { BackendService                             } from 'src/app/_services/BackendService/backend.service';
import { SpeechService                              } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
  //
  public PageTitle()   : string {
    return this.pageTitle;
  }
  pageTitle   : string;
  //
  public isListVisible            = false; // Initially hidden
  public toogleLisCaption: string = "[Ver Referencias]";
  //
  public status_message           = signal<string>('');
  //
  constructor(    public backendService                           : BackendService, 
                  public route                                    : ActivatedRoute,
                  public speechService                            : SpeechService,
                  @Inject(PAGE_TITLE)     public  _pageTitle      : string,
                  @Inject(PAGE_TITLE_LOG) public PAGE_TITLE_LOG   : string
             ) 
  {
      //
      this.pageTitle  = _pageTitle;
      //
      this.speechService.speakTextCustom(this.pageTitle);
      //
      this.backendService.SetLog(this.pageTitle,this.PAGE_TITLE_LOG);
      // Define an effect to react to changes in the signal
      effect(() => {
        if (this.status_message())
            this.speechService.speakTextCustom(this.status_message());
      });
  }
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
