import { Component, signal, VERSION        } from '@angular/core';
import { BackendService                    } from '../../../../_services/BackendService/backend.service';
import { ConfigService                     } from 'src/app/_services/ConfigService/config.service';
import { Observable                        } from 'rxjs';
import { BaseComponent                     } from 'src/app/_components/base/base.component';
import { ActivatedRoute                    } from '@angular/router';
import { SpeechService                     } from 'src/app/_services/speechService/speech.service';
import { PAGE_ABOUT_TECHNICAL_SPECS        } from 'src/app/_models/common';
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
    _tesseractVersion  : string = "";
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
    public get _baseUrlNetCoreCPPEntry(): string
    {
      return this.__baseUrlNetCoreCPPEntry;
    }
    //
    protected __baseUrlNetCore          : string = '';
    protected __baseUrlNodeJs           : string = '';
    protected __baseUrlNodeJsChat       : string = '';
    protected __baseUrlNodeJsOcr        : string = '';
    protected __baseUrlSprinbBootJava   : string = '';
    protected __baseUrlNetCoreCPPEntry  : string = '';
    ////////////////////////////////////////////////////////////////  
    // [EVENT HANDLERS]
    ////////////////////////////////////////////////////////////////  
    constructor(
           public override configService      : ConfigService,
           public override backendService     : BackendService,
           public override route              : ActivatedRoute,
           public override speechService      : SpeechService,
    )
    {
      //
      super(configService,
            backendService,
            route,
            speechService,
            PAGE_ABOUT_TECHNICAL_SPECS,
      );
      ////
      this._appBrand                = this.configService.getConfigValue('appBrand');
      this._appVersion              = this.configService.getConfigValue('appVersion');
      this.__baseUrlNetCoreCPPEntry = this.configService.getConfigValue('baseUrlNetCoreCPPEntry');
      this.__baseUrlNetCore         = this.configService.getConfigValue('baseUrlNetCore');
      this.__baseUrlNodeJs          = this.configService.getConfigValue('baseUrlNodeJs');
      this.__baseUrlNodeJsChat      = this.configService.getConfigValue('baseUrlNodeJsChat');
      this.__baseUrlNodeJsOcr       = this.configService.getConfigValue('baseUrlNodeJsOcr');
      this.__baseUrlSprinbBootJava  = this.configService.getConfigValue('baseUrlSpringBootJava');
      //
      this._GetWebApiAppVersion();
      //
      this._GetTesseractVersion();
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
      let guid = this.configService.generateGuid();
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
    private _GetTesseractVersion() {
      //
      let cppBackendObservable : Observable<string> = this.backendService._GetTesseractVersion();
      //
      const cppBackendObserver       = {
        next: (jsondata: string)     => { 
          //
          //console.log('_GetAppVersion - (return): ' + jsondata);
          //
          this._tesseractVersion = jsondata;
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
      cppBackendObservable.subscribe(cppBackendObserver);
      //
      return this._tesseractVersion;
    }
    ///////////////////////////////////////////////////////////  
}
