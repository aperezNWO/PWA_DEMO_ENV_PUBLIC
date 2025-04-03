import { Component, OnInit, AfterViewInit        } from '@angular/core';
import { BackendService                          } from '../../../_services/BackendService/backend.service';
import { SpeechService                           } from 'src/app/_services/speechService/speech.service';
import { ConfigService                           } from 'src/app/_services/ConfigService/config.service';
import { BaseComponent                           } from 'src/app/_components/base/base.component';
import { ActivatedRoute                          } from '@angular/router';
import { _environment                            } from 'src/environments/environment';
import { PAGE_ANGULAR_DEMO_INDEX                 } from 'src/app/_models/common';
//
@Component({
  selector    : 'app-home-web',
  templateUrl : './home-web.component.html',
  styleUrls   : ['./home-web.component.css']
})
export class HomeWebComponent extends BaseComponent implements OnInit, AfterViewInit {
  //
  public get _appBrand()            : string
  {
      return `Bienvenidos a ${this.configService.getConfigValue('appBrand')}`;
  }
  //
  constructor(public  override configService  : ConfigService, 
              public  override backendService : BackendService,
              public  override route          : ActivatedRoute, 
              public  override speechService  : SpeechService)
  {
    //
    super(
      configService,
      backendService,
      route,
      speechService,
      PAGE_ANGULAR_DEMO_INDEX,
    );
  }
  //
  ngOnInit(): void {
      //
      this.configService._loadMainPages().then( ()=> 
      {
          //
          console.log(_environment.mainPageListDictionary[PAGE_ANGULAR_DEMO_INDEX])
          //
          this._pages = _environment.mainPageListDictionary[PAGE_ANGULAR_DEMO_INDEX].pages;
          //
      });
  }
  //
  ngAfterViewInit():void
  {  

  }
}
