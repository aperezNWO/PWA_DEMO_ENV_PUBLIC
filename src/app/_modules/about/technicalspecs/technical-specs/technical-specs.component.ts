import { Component, signal, VERSION        } from '@angular/core';
import { BackendService                    } from '../../../../_services/BackendService/backend.service';
import { ConfigService                     } from 'src/app/_services/ConfigService/config.service';
import { Observable                        } from 'rxjs';
import { BaseComponent                     } from 'src/app/_components/base/base.component';
import { ActivatedRoute                    } from '@angular/router';
import { SpeechService                     } from 'src/app/_services/speechService/speech.service';
//
@Component({
  selector: 'app-technical-specs',
  templateUrl: './technical-specs.component.html',
  styleUrls: ['./technical-specs.component.css']
})
//
export class TechnicalSpecsComponent extends BaseComponent {
    ////////////////////////////////////////////////////////////////  
    // [PROPIEDADES]
    //////////////////////////////////////////////////////////////// 
    //
    _appBrand          : string | undefined;
    _appVersion        : string | undefined;
    _runtimeVersion    : string = VERSION.full;
    _webApiAppVersion  : string = "";
    //
    guid = signal<string>(''); // Signal to hold the GUID
    //
    public get _baseUrlNetCore(): string {
      //
      return this.__baseUrlNetCore;
    }
    //
    public get _baseUrlNodeJs(): string {
      //
      return this.__baseUrlNodeJs;
    }
    public get _baseUrlNodeJsOcr(): string {
      //
      return this.__baseUrlNodeJsOcr;
    }
    //
    public get _baseUrlNodeJsChat(): string
    {
      return this.__baseUrlNodeJsChat;
    }
    //
    public get _baseUrlSpringBootJava(): string
    {
      return this.__baseUrlSprinbBootJava;
    }
    //
    protected __baseUrlNetCore        : string = '';
    protected __baseUrlNodeJs         : string = '';
    protected __baseUrlNodeJsChat     : string = '';
    protected __baseUrlNodeJsOcr      : string = '';
    protected __baseUrlSprinbBootJava : string = '';
    ////////////////////////////////////////////////////////////////  
    // [EVENT HANDLERS]
    ////////////////////////////////////////////////////////////////  
    constructor(
           public          _configService     : ConfigService,
           public override backendService     : BackendService,
           public override route              : ActivatedRoute,
           public override speechService      : SpeechService,
    )
    {
      //
      super(backendService,
            route,
            speechService,
            "[ACERCA DE - ESPECIFICACIONES TÉCNICAS]",
            "PAGE_ABOUT_TECHNICAL_SPECS",
      );
      ////
      this._appBrand                = this._configService.getConfigValue('appBrand');
      this._appVersion              = this._configService.getConfigValue('appVersion');
      this.__baseUrlNetCore         = this._configService.getConfigValue('baseUrlNetCore');
      this.__baseUrlNodeJs          = this._configService.getConfigValue('baseUrlNodeJs');
      this.__baseUrlNodeJsChat      = this._configService.getConfigValue('baseUrlNodeJsChat');
      this.__baseUrlNodeJsOcr       = this._configService.getConfigValue('baseUrlNodeJsOcr');
      this.__baseUrlSprinbBootJava  = this._configService.getConfigValue('baseUrlSpringBootJava');

      //
      //console.log("baseUrlNetCore : " + this.__baseUrlNetCore);
      //console.log("baseUrlNodeJs  : " + this.__baseUrlNodeJs);
      //
      //console.log(this.pageTitle + "- [INGRESO]");
      //
      backendService.SetLog(this.pageTitle,"PAGE_TECH_SPECS");
      //
      this._GetWebApiAppVersion();
    }
    //
    ngOnInit(): void {
      //
    }
    ////////////////////////////////////////////////////////////////  
    // [METODOS COMUNES]
    ////////////////////////////////////////////////////////////////  
    private _GetWebApiAppVersion() {
      //
      let appVersion : Observable<string> = this.backendService._GetWebApiAppVersion();
      //
      const appVersionObserver = {
        next: (jsondata: string)     => { 
          //
          //console.log('_GetAppVersion - (return): ' + jsondata);
          //
          this._webApiAppVersion = jsondata;
          //
          //console.log(this.pageTitle + "- [webApiVersion] - " + this._webApiAppVersion);
        },
        error           : (err: Error)      => {

          //
          console.error('_GetAppVersion- (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          //
          //console.log('_GetAppVersion -  (COMPLETE)');
        },
      };
      //
      appVersion.subscribe(appVersionObserver);
      //
      this.setNewGuid();
    }
    //
    setNewGuid():string
    {
      let guid = this._configService.generateGuid();
      this.guid.set(guid);
      return guid;
    }
    //
    async generateNewGuid() {
      try {
        await navigator.clipboard.writeText(this.setNewGuid());
        alert('Text copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy text: ', error);
        alert('Failed to copy text.');
      }
    }
    ///////////////////////////////////////////////////////////  
}
