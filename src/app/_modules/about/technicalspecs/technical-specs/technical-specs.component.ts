import { Component, signal, VERSION        } from '@angular/core';
import { ActivatedRoute                    } from '@angular/router';
import { Observable                        } from 'rxjs';
import { ConfigService                     } from 'src/app/_services/__Utils/ConfigService/config.service';
import { BaseComponent                     } from 'src/app/_components/base/base.component';
import { SpeechService                     } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { PAGE_ABOUT_TECHNICAL_SPECS        } from 'src/app/_models/common';
import { OCRService                        } from 'src/app/_services/__AI/OCRService/ocr.service';
import { ComputerVisionService             } from 'src/app/_services/__AI/ComputerVisionService/Computer-Vision.service';
import { AlgorithmService                  } from 'src/app/_services/AlgorithmService/algorithm.service';
import { BackendService                    } from '../../../../_services/BackendService/backend.service';
import { TensorFlowService                 } from '../../../../_services/__AI/TensorflowService/tensor-flow.service';
import { VersionBundle, VersionCacheService } from 'src/app/_services/__Utils/VersionCacheService/versio-cache.service';

//
@Component({
    selector: 'app-technical-specs',
    templateUrl: './technical-specs.component.html',
    styleUrls: ['./technical-specs.component.css'],
    standalone: false
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
    /* same properties as before – just initialise with cached value if we have it */
    _webApiAppVersion          = this.fromCache('webApiApp');
    _AlgorithmAppVersion       = this.fromCache('algorithmApp');
    _Algorithm_CPPSTDVersion   = this.fromCache('algorithmCpp');
    _ASPNETCoreCppVersion      = this.fromCache('aspNetCoreCpp');
    _OpenCvAppVersion          = this.fromCache('openCvApp');
    _OpenCvAPIVersion          = this.fromCache('openCvApi');
    _OpenCvCPPSTDVersion       = this.fromCache('openCvCpp');
    _tesseractAppVersion       = this.fromCache('tesseractApp');
    _tesseractAPIVersion       = this.fromCache('tesseractApi');
    _tesseractCPPSTDVersion    = this.fromCache('tesseractCpp');

;
    _TensorFlowAPPVersion      = this.fromCache('tfApp');;
    _TensorFlowAPIVersion      = this.fromCache('tfApi');;
    _TensorFlowCPPSTDVersion   = this.fromCache('tfCpp');;
    //
    guid = signal<string>(''); // Signal to hold the GUID
    //
    public get _baseUrlNetCoreSwagger(): string {
      //
      return this.__baseUrlNetCoreSwagger;
    }
    //
    public get _baseUrlNetCoreCPPSwagger(): string {
      //
      return this.__baseUrlNetCoreCPPSwagger;
    }
    protected __baseUrlNetCoreSwagger    : string = `${this.configService.getConfigValue('baseUrlNetCore')}swagger`;
    protected __baseUrlNetCoreCPPSwagger : string = `${this.configService.getConfigValue('baseUrlNetCoreCPPEntry')}swagger`;
    protected _repo                      : string = `https://github.com/aperezNWO/PWA_DEMO_ENV_PROD`;
    ////////////////////////////////////////////////////////////////  
    // [EVENT HANDLERS]
    ////////////////////////////////////////////////////////////////  
    constructor(
           /* inject the cache */
           private         versionCache          : VersionCacheService,
           public override configService         : ConfigService,
           public override backendService        : BackendService,
           public override route                 : ActivatedRoute,
           public override speechService         : SpeechService,
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
      /* remove all _GetXxxVersion() calls from constructor */
      this._appBrand                = this.configService.getConfigValue('appBrand');
      this._appVersion              = this.configService.getConfigValue('appVersion');
    }
    //
    ngOnInit(): void {
        //
        this.versionCache.versions$.subscribe(v => {
          this._webApiAppVersion        = v.webApiApp        ?? '(..loading..)';
          this._AlgorithmAppVersion     = v.algorithmApp     ?? '(..loading..)';
          this._Algorithm_CPPSTDVersion = v.algorithmCpp     ?? '(..loading..)';
          this._ASPNETCoreCppVersion    = v.aspNetCoreCpp    ?? '(..loading..)';
          this._tesseractAppVersion     = v.tesseractApp     ?? '(..loading..)';
          this._tesseractAPIVersion     = v.tesseractApi     ?? '(..loading..)';
          this._tesseractCPPSTDVersion  = v.tesseractCpp     ?? '(..loading..)';
          this._OpenCvAppVersion        = v.openCvApp        ?? '(..loading..)';
          this._OpenCvAPIVersion        = v.openCvApi        ?? '(..loading..)';
          this._OpenCvCPPSTDVersion     = v.openCvCpp        ?? '(..loading..)';
          this._TensorFlowAPPVersion    = v.tfApp            ?? '(..loading..)';
          this._TensorFlowAPIVersion    = v.tfApi            ?? '(..loading..)';
          this._TensorFlowCPPSTDVersion = v.tfCpp            ?? '(..loading..)';
        });
    }
    //
    /* helper: read synchronous snapshot from localStorage (instant first paint) */
    private fromCache(key: keyof VersionBundle): string {
      try {
        const raw = localStorage.getItem('version-cache');
        if (!raw) return '(..loading..)';
        const v = JSON.parse(raw) as VersionBundle;
        return v[key] ?? '(..loading..)';
      } catch { return '(..loading..)'; }
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
}
