import { Component, OnInit, AfterViewInit        } from '@angular/core';
import { ActivatedRoute                          } from '@angular/router';
import { _environment                            } from 'src/environments/environment';
import { PAGE_ANGULAR_DEMO_INDEX                 } from 'src/app/_models/common';
import { SpeechService                           } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { ConfigService                           } from 'src/app/_services/__Utils/ConfigService/config.service';
import { BackendService                          } from '../../../_services/BackendService/backend.service';
import { BaseReferenceComponent                  } from 'src/app/_components/base-reference/base-reference.component';
//
@Component({
  selector    : 'app-home-web',
  templateUrl : './home-web.component.html',
  styleUrls   : ['./home-web.component.css']
})
export class HomeWebComponent extends BaseReferenceComponent implements OnInit, AfterViewInit {
  //
  public get _appBrand()            : string
  {
      return `Welcome to ${this.configService.getConfigValue('appBrand')}`;
  }
  //
  selectedLandingPage : string = '';
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
      this.queryParams();
  }
  //
  ngAfterViewInit():void
  {  
      //
  }
  //
  queryParams():void
  {
    //
    this.route.queryParams.subscribe({ next: (params) => {
        //
        let landingPage = params['landingPage'] ? params['landingPage'] : 'NO_ASSIGNED' ;
        //
        console.log(` Landing Page Query Param : ${landingPage} `);
        //
        if (landingPage !== 'NO_ASSIGNED')
        {
            //
            this.selectedLandingPage = landingPage;
        } 
    }
    ,complete        : ()                => {
        //
      },
    });
  }
}
