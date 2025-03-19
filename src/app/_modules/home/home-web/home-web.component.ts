import { Component, OnInit, AfterViewInit        } from '@angular/core';
import { BackendService                          } from '../../../_services/BackendService/backend.service';
import { SpeechService                           } from 'src/app/_services/speechService/speech.service';
import { ConfigService                           } from 'src/app/_services/ConfigService/config.service';
//
@Component({
  selector    : 'app-home-web',
  templateUrl : './home-web.component.html',
  styleUrls   : ['./home-web.component.css']
})
export class HomeWebComponent implements OnInit, AfterViewInit {
  //
  public _appBrand            : string | undefined = '';
  pageTitle                   : string             = '[HOME]';
  static PageTitle            : string             = '[HOME]';
  //
      //
      pages =[
        {
          'url': '/DemosFeaturesWeb', 
          'text': '[CARACTERISTICAS]',
        },  
        {
          'url': '/DemosLanguageWeb', 
          'text': '[LENGUAJES]',
        },    
        {
          'url': '/DemosCurriculumWeb',
          'text': '[CURRICULUM]',
        },
      ];
  //
  constructor(public  backendService : BackendService, 
              private _configService : ConfigService, 
              public   speechService : SpeechService)
  {
      //
      if (backendService._baseUrlNetCore != null)
      {
        //
        backendService.SetLog(this.pageTitle,"PAGE_ANGULAR_DEMO_INDEX");
      }
      //
      this._appBrand  = this._configService.getConfigValue('appBrand');

  }
  //
  ngOnInit(): void {
      //
      // Preload voices
      speechSynthesis.getVoices();
  }
  //
  ngAfterViewInit():void
  {
      //
      this.speechService.speakTextCustom("Bienvenidos a Angular Demo");
  }
}
