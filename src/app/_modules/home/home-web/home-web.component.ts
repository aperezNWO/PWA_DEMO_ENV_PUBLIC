import { Component, OnInit, ViewChild            } from '@angular/core';
import { CustomErrorHandler   } from '../../../app.module';
import { MCSDService          } from '../../../_services/mcsd.service';
import { _ConfigService       } from 'src/app/_services/-config.service';
import { NavComponent } from '../nav/nav.component';
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
  constructor(mcsdService : MCSDService, private _configService: _ConfigService, customErrorHandler : CustomErrorHandler)
  {
      //
      console.log(this.pageTitle + " - [INGRESO]") ;
      //
      if (mcsdService._baseUrlNetCore != null)
      {
        //
        mcsdService.SetLog(this.pageTitle,"PAGE_ANGULAR_DEMO_INDEX");
      }
      //
      this._appBrand  = this._configService.getConfigValue('appBrand');;
  }
  //
  ngOnInit(): void {
    //
  }
}
