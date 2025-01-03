import { Component, OnInit, VERSION    } from '@angular/core';
import { ActivatedRoute, Router        } from '@angular/router';
import { Title                         } from '@angular/platform-browser';
import { CustomErrorHandler            } from './app.module';
import { BackendService                } from './_services/BackendService/backend.service';
import { ConfigService                 } from './_services/ConfigService/config.service';

//
@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.css']
})

//
export class AppComponent implements OnInit {
    // propiedades publicas
    public readonly _title                                       : string | undefined  = "";
    public readonly _appBrand                                    : string | undefined  = "";
    public readonly _appVersion                                  : string | undefined  = "";
                    redirectPage                                 : string | null       = null;
    //
    private  navbarCollapsed                                     : boolean = true;
    //
    public get NavbarCollapsed() : boolean {
      //
      return this.navbarCollapsed;
    }
    //
    public set NavbarCollapsed(p_navbarCollapsed: boolean) {
        //
        this.navbarCollapsed = p_navbarCollapsed;
    }
    //-----------------------------------------------------------------------------------------------------
    constructor(
                private router              : Router,
                public  route               : ActivatedRoute,  
                private _customErrorHandler : CustomErrorHandler, 
                private backendService      : BackendService, 
                private _configService      : ConfigService,
                private titleService        : Title
               ) 
    {
      //
      console.log("Loading AppComponent...");
      //
      console.log("[SETTING CONFIG VALUES (not working on service constructor)]...");
      // IMPLEMENT AS MAP AND ITERATE
      this._appBrand          = this._configService.getConfigValue('appBrand');
      this._appVersion        = this._configService.getConfigValue('appVersion');
      let __baseUrlNetCore    = this._configService.getConfigValue('baseUrlNetCore');
      let __baseUrlNodeJs     = this._configService.getConfigValue('baseUrlNodeJs');
      let __baseUrlNodeJsOcr  = this._configService.getConfigValue('baseUrlNodeJsOcr');
      let __baseUrlSpringBoot = this._configService.getConfigValue('baseUrlSpringBootJava');
      //
      this.backendService._baseUrlNetCore    = __baseUrlNetCore;
      this.backendService._baseUrlNodeJs     = __baseUrlNodeJs;
      this.backendService._baseUrlNodeJs     = __baseUrlNodeJs;
      this.backendService._baseUrlNodeJsOcr  = __baseUrlNodeJsOcr;
      this.backendService._baseUrlSpringBoot = __baseUrlSpringBoot;
      //
      //////////////////////////////////////////////////////
      // CACHE PARA XML
      ///////////////////////////////////////////////////////
      //
      this.backendService._SetXmlDataToCache(__baseUrlNetCore);
      ///////////////////////////////////////////////////////
      // CACHE PARA PIE CHART
      ///////////////////////////////////////////////////////
      this.backendService._SetSTATPieCache(__baseUrlNetCore);
      ///////////////////////////////////////////////////////
      // CACHE PARA BARCHART
      ///////////////////////////////////////////////////////
      this.backendService._SetSTATBarCache(__baseUrlNetCore);
      //
      let title : string = `${this._appBrand} - ${this._appVersion}`;
      //
      console.log("Setting Title : " + title);
      //
      this._title = `${this._appBrand}`;
      //
      this.titleService.setTitle(title);
      //
      this.route.queryParams.subscribe(params => {
        //
        this.redirectPage = params['redirectPage'] ? params['redirectPage'] : "" ;
        //
        if (this.redirectPage !== undefined)
        {
          //
          console.log("Redirecting To Page : "  +  this.redirectPage );
          //
          switch (this.redirectPage)
          {
            case "AlgorithmDijkstra":
                // 
                this.router.navigateByUrl('/AlgorithmDijkstra');
            break;
            //default : 
                //
            //    this.router.navigateByUrl("/Home");
            //break;
          };
          
        } else {
          //
          this.router.navigateByUrl("/Home");
        }
      });
    }   
    //-----------------------------------------------------------------------------------------------------
    ngOnInit() {

    }
    //
    getValueFromConfig(key: string) {
      return this._configService.getConfigValue(key);
    }

  }   
//-----------------------------------------------------------------------------------------------------
export { CustomErrorHandler };
//-----------------------------------------------------------------------------------------------------
