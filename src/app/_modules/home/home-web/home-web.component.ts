import { Component, OnInit, AfterViewInit        } from '@angular/core';
import { BackendService                          } from '../../../_services/BackendService/backend.service';
import { SpeechService                           } from 'src/app/_services/speechService/speech.service';
import { ConfigService                           } from 'src/app/_services/ConfigService/config.service';
import { BaseComponent                           } from 'src/app/_components/base/base.component';
import { ActivatedRoute                          } from '@angular/router';
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
  constructor(private configService           : ConfigService, 
              public  override backendService : BackendService,
              public  override route          : ActivatedRoute, 
              public  override speechService  : SpeechService)
  {
    //
    super(backendService,
      route,
      speechService,
      `Bienvenidos a ${configService.getConfigValue('appBrand')}`,
      "PAGE_ANGULAR_DEMO_INDEX"
    );
  }
  //
  ngOnInit(): void {
      //
  }
  //
  ngAfterViewInit():void
  {
      //
  }
}
