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
    _appBrand                 : string | undefined;
    _appVersion               : string | undefined;
    _runtimeVersion           : string = VERSION.full;
    _webApiAppVersion         : string = "(..cargando..)";
    _AlgorithmAppVersion      : string = "(..cargando..)";
    _Algorithm_CPPSTDVersion  : string = "(..cargando..)";
    _ASPNETCoreCppVersion     : string = "(..cargando..)";
    _tesseractAppVersion      : string = "(..cargando..)";
    _tesseractAPIVersion      : string = "(..cargando..)";
    _tesseractCPPSTDVersion   : string = "(..cargando..)";
    _OpenCvAppVersion         : string = "(..cargando..)";
    _OpenCvAPIVersion         : string = "(..cargando..)";
    _OpenCvCPPSTDVersion      : string = "(..cargando..)";
    _TensorFlowAPIVersion     : string = "(..cargando..)";
    _TensorFlowAPPVersion     : string = "(..cargando..)";
    _TensorFlowCPPSTDVersion  : string = "(..cargando..)";
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
      this._GetAlgorithmAppVersion();
      //
      this._GetAlgorithmCPPSTDVersion();
      //
      this._GetASPNETCoreCppVersion();
      //
      this._GetTesseractAppVersion();
      //
      this._GetTesseractAPIVersion();
      //
      this._GetTesseract_CPPSTDVersion();
      //
      this._GetOpenCvAppVersion();
      //
      this._GetOpenCVAPIVersion();
      //
      this._GetOpenCV_CPPSTDVersion();
      //
      this._GetTensorflowAPIVersion();
      //
      this._GetTensorflowAPPVersion();
      //
      this._GetTensorflowcCPPSTDVersion();
    }
    //
    ngOnInit(): void {
      //
    }
    ////////////////////////////////////////////////////////////////  
    // [METODOS COMUNES]
    ////////////////////////////////////////////////////////////////  
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
    // [METODOS BACKEND]
    /////////////////////////////////////////////////////////// 
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
    private _GetAlgorithmAppVersion() {
      //
      let cppBackendObservable : Observable<string> = this.backendService._GetAlgothmAppVersion();
      //
      const cppBackendObserver       = {
        next: (jsondata: string)     => { 
          //
          //console.log('_GetAppVersion - (return): ' + jsondata);
          //
          this._AlgorithmAppVersion = jsondata;
          //
          //console.log(this.pageTitle + "- [webApiVersion] - " + this._webApiAppVersion);
        },
        error           : (err: Error)      => {

          //
          console.error('_GetCppDLLVersion- (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          //
          //console.log('_GetAppVersion -  (COMPLETE)');
        },
      };
      //
      cppBackendObservable.subscribe(cppBackendObserver);
      //
      return this._tesseractAppVersion;
    }
    //
    private _GetAlgorithmCPPSTDVersion() {
      //
      let cppBackendObservable : Observable<string> = this.backendService._Algorithm_GetCPPSTDVersion();
      //
      const cppBackendObserver       = {
        next: (jsondata: string)     => { 
          //
          //console.log('_GetAppVersion - (return): ' + jsondata);
          //
          this._Algorithm_CPPSTDVersion = jsondata;
          //
          //console.log(this.pageTitle + "- [webApiVersion] - " + this._webApiAppVersion);
        },
        error           : (err: Error)      => {

          //
          console.error('_Algorithm_CPPSTDVersion  - (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          //
          //console.log('_GetAppVersion -  (COMPLETE)');
        },
      };
      //
      cppBackendObservable.subscribe(cppBackendObserver);
      //
      return this._Algorithm_CPPSTDVersion;
    }
    //
    private _GetASPNETCoreCppVersion() {
      //
      let cppBackendObservable : Observable<string> = this.backendService._GetASPNETCoreCppVersion();
      //
      const cppBackendObserver       = {
        next: (jsondata: string)     => { 
          //
          //console.log('_GetAppVersion - (return): ' + jsondata);
          //
          this._ASPNETCoreCppVersion = jsondata;
          //
          //console.log(this.pageTitle + "- [webApiVersion] - " + this._webApiAppVersion);
        },
        error           : (err: Error)      => {

          //
          console.error('_GetASPNETCoreCppVersion- (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          //
          //console.log('_GetAppVersion -  (COMPLETE)');
        },
      };
      //
      cppBackendObservable.subscribe(cppBackendObserver);
      //
      return this._tesseractAppVersion;
    }
    //
    private _GetTesseractAppVersion() {
      //
      let cppBackendObservable : Observable<string> = this.backendService._GetTesseractAppVersion();
      //
      const cppBackendObserver       = {
        next: (jsondata: string)     => { 
          //
          //console.log('_GetAppVersion - (return): ' + jsondata);
          //
          this._tesseractAppVersion = jsondata;
          //
          //console.log(this.pageTitle + "- [webApiVersion] - " + this._webApiAppVersion);
        },
        error           : (err: Error)      => {

          //
          console.error('_GetTesseractAppVersion- (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          //
          //console.log('_GetAppVersion -  (COMPLETE)');
        },
      };
      //
      cppBackendObservable.subscribe(cppBackendObserver);
      //
      return this._tesseractAppVersion;
    }
    //
    private _GetTesseractAPIVersion() {
    //
      let cppBackendObservable : Observable<string> = this.backendService._GetTesseractAPIVersion();
      //
      const cppBackendObserver       = {
        next: (jsondata: string)     => { 
          //
          //console.log('_GetAppVersion - (return): ' + jsondata);
          //
          this._tesseractAPIVersion = jsondata;
          //
          //console.log(this.pageTitle + "- [webApiVersion] - " + this._webApiAppVersion);
        },
        error           : (err: Error)      => {

          //
          console.error('_GetTesseractAppVersion- (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          //
          //console.log('_GetAppVersion -  (COMPLETE)');
        },
      };
      //
      cppBackendObservable.subscribe(cppBackendObserver);
      //
      return this._tesseractAPIVersion;
    }
    //
    private _GetTesseract_CPPSTDVersion() {
    //
      let cppBackendObservable : Observable<string> = this.backendService._GetTesseract_CPPSTDVersion();
      //
      const cppBackendObserver       = {
        next: (jsondata: string)     => { 
          //
          //console.log('_GetAppVersion - (return): ' + jsondata);
          //
          this._tesseractCPPSTDVersion = jsondata;
          //
          //console.log(this.pageTitle + "- [webApiVersion] - " + this._webApiAppVersion);
        },
        error           : (err: Error)      => {

          //
          console.error('_GetTesseract_CPPSTDVersion- (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          //
          //console.log('_GetAppVersion -  (COMPLETE)');
        },
      };
      //
      cppBackendObservable.subscribe(cppBackendObserver);
      //
      return this._tesseractCPPSTDVersion;
    }
    //
    private _GetOpenCvAppVersion() {
      //
      let cppBackendObservable : Observable<string> = this.backendService._GetOpenCvAppVersion();
      //
      const cppBackendObserver       = {
        next: (jsondata: string)     => { 
          //
          //console.log('_GetAppVersion - (return): ' + jsondata);
          //
          this._OpenCvAppVersion = jsondata;
          //
          //console.log(this.pageTitle + "- [webApiVersion] - " + this._webApiAppVersion);
        },
        error           : (err: Error)      => {

          //
          console.error('_GetOpenCvAppVersion- (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          //
          //console.log('_GetAppVersion -  (COMPLETE)');
        },
      };
      //
      cppBackendObservable.subscribe(cppBackendObserver);
      //
      return this._OpenCvAppVersion;
    } 
    //
    private _GetOpenCVAPIVersion(){
      //
      let cppBackendObservable : Observable<string> = this.backendService._GetOpenCvAPIVersion();
      //
      const cppBackendObserver       = {
        next: (jsondata: string)     => { 
          //
          //console.log('_GetAppVersion - (return): ' + jsondata);
          //
          this._OpenCvAPIVersion = jsondata;
          //
          //console.log(this.pageTitle + "- [webApiVersion] - " + this._webApiAppVersion);
        },
        error           : (err: Error)      => {

          //
          console.error('_GetOpenCvAppVersion- (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          //
          //console.log('_GetAppVersion -  (COMPLETE)');
        },
      };
      //
      cppBackendObservable.subscribe(cppBackendObserver);
      //
      return this._OpenCvAPIVersion;
    } 
    //
    private _GetOpenCV_CPPSTDVersion(){
      //
      let cppBackendObservable : Observable<string> = this.backendService._GetOpenCv_CPPSTDVersion();
      //
      const cppBackendObserver       = {
        next: (jsondata: string)     => { 
          //
          //console.log('_GetAppVersion - (return): ' + jsondata);
          //
          this._OpenCvCPPSTDVersion = jsondata;
          //
          //console.log(this.pageTitle + "- [webApiVersion] - " + this._webApiAppVersion);
        },
        error           : (err: Error)      => {

          //
          console.error('_GetOpenCV_CPPSTDVersion- (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          //
          //console.log('_GetAppVersion -  (COMPLETE)');
        },
      };
      //
      cppBackendObservable.subscribe(cppBackendObserver);
      //
      return this._OpenCvCPPSTDVersion;
    } 
    //
    private _GetTensorflowAPIVersion(){
      //
      let cppBackendObservable : Observable<string> = this.backendService._GetTensorFlowAPIVersion();
      //
      const cppBackendObserver       = {
        next: (jsondata: string)     => { 
          //
          this._TensorFlowAPIVersion = jsondata;
        },
        error           : (err: Error)      => {
          //
          console.error('_GetTensorflowAPIVersion - (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          // 
        },
      };
      //
      cppBackendObservable.subscribe(cppBackendObserver);
      //
      return this._TensorFlowAPIVersion;
    } 
    //
    private _GetTensorflowAPPVersion(){
      //
      let cppBackendObservable : Observable<string> = this.backendService._GetTensorFlowAPPVersion();
      //
      const cppBackendObserver       = {
        next: (jsondata: string)     => { 
          //
          this._TensorFlowAPPVersion = jsondata;
        },
        error           : (err: Error)      => {
          //
          console.error('_GetTensorflowAPIVersion - (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          // 
        },
      };
      //
      cppBackendObservable.subscribe(cppBackendObserver);
      //
      return this._TensorFlowAPPVersion;
    } 
    //
    private _GetTensorflowcCPPSTDVersion(){
      //
      let cppBackendObservable : Observable<string> = this.backendService._TensorFlow_GetCPPSTDVersion();
      //
      const cppBackendObserver       = {
        next: (jsondata: string)     => { 
          //
          this._TensorFlowCPPSTDVersion = jsondata;
        },
        error           : (err: Error)      => {
          //
          console.error('_GetTensorflowcCPPSTDVersion - (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          // 
        },
      };
      //
      cppBackendObservable.subscribe(cppBackendObserver);
      //
      return this._TensorFlowCPPSTDVersion;
    }     
    ///////////////////////////////////////////////////////////  
}
