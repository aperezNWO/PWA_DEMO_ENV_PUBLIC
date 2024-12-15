import { Component, OnInit, VERSION    } from '@angular/core';
import { Title                         } from '@angular/platform-browser';
import { CustomErrorHandler            } from 'src/app/app.component';
import { BackendService                   } from 'src/app/_services/backend.service';
import { ConfigService                } from 'src/app/_services/config.service';
//
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
//
export class NavComponent {

    // propiedades publicas
    public readonly _appBrand                                    : string | undefined  = "";
    public readonly _title                                       : string | undefined  = "";
    public readonly _appEnv                                      : string | undefined  = "";
    public readonly _appVersion                                  : string | undefined  = "";
    //
    public  _navbarCollapsed                                     : boolean = true;
    //
    public get _NavbarCollapsed() : boolean {
      //
      return this._navbarCollapsed;
    }
    //
    public set _NavbarCollapsed(p_navbarCollapsed: boolean) {
        //
        this._navbarCollapsed = p_navbarCollapsed;
    }
    //
    pages =[
    {
      'url' : '/Home',
      'text': '[HOME]',
    },
    {
      'url': '/Miscelaneous', 
      'text': '[MISCELANEOUS]',
    },  
    {
      'url': '/GamesWeb', 
      'text': '[GAMES]',
    },    
    {
      'url': '/AlgorithmWeb',
      'text': '[ALGORITMOS]',
    },
    {
      'url': '/FilesGenerationWeb', 
      'text': '[GENERAR ARCHIVOS]',
    },
    {
      'url' : '/Index', 
      'text': '[INDEX]',
    }, 
    {
      'url' : '/AAboutWeb', 
      'text': '[ACERCA DE]',
    },    
  ];
    //-----------------------------------------------------------------------------------------------------
    constructor(
                private _customErrorHandler : CustomErrorHandler, 
                private backendService         : BackendService, 
                private _configService      : ConfigService,
                private titleService        : Title
               ) 
    {
      //
      console.log("Loading AppComponent...");
      // IMPLEMENT AS MAP AND ITERATE
      let keyName  : string = '';
      let keyValue : string = '';
      //
      keyName        = 'appBrand';
      keyValue       = this._configService.getConfigValue(keyName);
      this._appBrand = keyValue;
      //
      keyName        = 'appEnv';
      keyValue       = this._configService.getConfigValue(keyName);
      this._appEnv   = keyValue;
      //
      keyName          = 'appVersion';
      keyValue         = this._configService.getConfigValue(keyName);
      this._appVersion = keyValue;
      //
      let __baseUrlNetCore = this._configService.getConfigValue('baseUrlNetCore');
      let __baseUrlNodeJs  = this._configService.getConfigValue('baseUrlNodeJs');
      //
      this.backendService._baseUrlNetCore = __baseUrlNetCore;
      this.backendService._baseUrlNodeJs  = __baseUrlNodeJs;
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
      let title : string = `${this._appBrand} -- ${this._appEnv} -- ${this._appVersion}`;
      //
      this.titleService.setTitle(title);
      //
      console.log("Setting Title : " + title);
    }   
    //-----------------------------------------------------------------------------------------------------
    ngOnInit() {
        //
    }
    //
    getValueFromConfig(key: string) {
      return this._configService.getConfigValue(key);
    }
}   
