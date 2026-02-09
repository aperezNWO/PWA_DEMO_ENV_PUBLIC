/* app-core/services/version-cache.service.ts */
import { Injectable } from '@angular/core';
import { Observable, shareReplay, of, map, catchError, forkJoin } from 'rxjs';
import { ComputerVisionService } from '../../__AI/ComputerVisionService/Computer-Vision.service';
import { OCRService } from '../../__AI/OCRService/ocr.service';
import { TensorFlowService } from '../../__AI/TensorflowService/tensor-flow.service';
import { AlgorithmService } from '../../AlgorithmService/algorithm.service';
import { BackendService } from '../../BackendService/backend.service';
import { ConfigService } from '../ConfigService/config.service';

export interface VersionBundle {
  webApiApp     : string;
  algorithmApp  : string;
  algorithmCpp  : string;
  aspNetCoreCpp : string;
  openCvApp     : string;
  openCvApi     : string;
  openCvCpp     : string;
  tesseractApp  : string;
  tesseractApi  : string;
  tesseractCpp  : string;
  tfApp         : string;
  tfApi         : string;
  tfCpp         : string;
}

@Injectable({ providedIn: 'root' })
export class VersionCacheService {
  /* one single stream that every consumer shares */
  readonly versions$: Observable<VersionBundle>;

  constructor(
    private cfg: ConfigService,
    private back: BackendService,
    private algo: AlgorithmService,
    private ocr: OCRService,
    private cv: ComputerVisionService,
    private tf: TensorFlowService
  ) {
    /* kick-off immediately when the service is instantiated */
    this.versions$ = this.loadAll().pipe(shareReplay(1));
  }

  /* -------------------------------------------------------------- */
  private loadAll(): Observable<VersionBundle> {
    /* cold start: fire all calls in parallel */
    return forkJoin({
      webApiApp     : this.back._GetWebApiAppVersion(),
      algorithmApp  : this.algo._Algorithm_GetAppVersion(),
      algorithmCpp  : this.algo._Algorithm_GetCPPSTDVersion(),
      aspNetCoreCpp : this.back._GetASPNETCoreCppVersion(),
      tesseractApp  : this.ocr._GetTesseract_AppVersion(),
      tesseractApi  : this.ocr._GetTesseract_APIVersion(),
      tesseractCpp  : this.ocr._GetTesseract_CPPSTDVersion(),
      openCvApp     : this.cv._OpenCv_GetAppVersion(),
      openCvApi     : this.cv._OpenCv_GetAPIVersion(),
      openCvCpp     : this.cv._OpenCv_GetCPPSTDVersion(),
      tfApp         : this.tf._GetTensorFlowAPPVersion(),
      tfApi         : this.tf._GetTensorFlowAPIVersion(),
      tfCpp         : this.tf._TensorFlow_GetCPPSTDVersion()
    }).pipe(
      /* optional: persist so that *page reload* is instant too */
      map(v => {
        localStorage.setItem('version-cache', JSON.stringify(v));
        return v;
      }),
      /* if back-ends are down, try to return last known good */
      catchError(() => {
        const raw = localStorage.getItem('version-cache');
        return raw ? of(JSON.parse(raw) as VersionBundle) : of({} as VersionBundle);
      })
    );
  }
}