import { Component, OnInit, ViewChild            } from '@angular/core';
import { CustomErrorHandler   } from '../../../app.module';
import { BackendService          } from '../../../_services/BackendService/backend.service';
import { ConfigService       } from 'src/app/_services/ConfigService/config.service';
import { NavComponent         } from '../nav/nav.component';
//
@Component({
  selector    : 'app-home-web',
  templateUrl : './home-web.component.html',
  styleUrls   : ['./home-web.component.css']
})
export class HomeWebComponent implements OnInit {
  //
  public _appBrand            : string | undefined = '';
  pageTitle                   : string             = '[HOME]';
  static PageTitle            : string             = '[HOME]';
  @ViewChild('nav') nav!      : NavComponent;
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
  constructor(backendService : BackendService, private _configService: ConfigService, customErrorHandler : CustomErrorHandler)
  {
      //
      //console.log(this.pageTitle + " - [INGRESO]") ;
      //
      if (backendService._baseUrlNetCore != null)
      {
        //
        backendService.SetLog(this.pageTitle,"PAGE_ANGULAR_DEMO_INDEX");
      }
      //
      this._appBrand  = this._configService.getConfigValue('appBrand');;
  }
  //
  ngOnInit(): void {
    //
    this.nav._NavbarCollapsed = true;
  }
}
