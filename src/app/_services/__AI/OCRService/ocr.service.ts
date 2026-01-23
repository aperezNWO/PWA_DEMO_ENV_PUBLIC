import { Injectable    } from '@angular/core';
import { Observable    } from 'rxjs';
import { HttpClient    } from '@angular/common/http';
import { ConfigService } from '../../__Utils/ConfigService/config.service';
import { BaseService   } from '../../__baseService/base.service';

@Injectable({
  providedIn: 'root'
})
export class OCRService extends BaseService {
  //
  __baseUrlTesseract     : string = '';
  //
  constructor(public http: HttpClient, public _configService : ConfigService) {
       //
       super();
       //
       this.__baseUrlTesseract  = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}api/ocr/`;     
  }

  //
  _GetTesseract_CPPSTDVersion(): Observable<string> {
    //
    let p_url                   : string  = `${this.__baseUrlTesseract}GetCPPSTDVersion`;
    //
    let appVersion              : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
    //
    return appVersion;
  }
  //
  _GetTesseract_AppVersion(): Observable<string> {
    //
    let p_url                   : string  = `${this.__baseUrlTesseract}GetAppVersion`;
    //
    let appVersion              : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
    //
    return appVersion;
  }
  //
  _GetTesseract_APIVersion(): Observable<string> {
    //
    let p_url                   : string  = `${this.__baseUrlTesseract}GetAPIVersion`;
    //
    let appVersion              : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
    //
    return appVersion;
  }

  //
  uploadBase64ImageCPP(base64Image: string) {
    //
    let url = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}api/ocr/upload`;
    //
    return this.http.post(url, { base64Image });
  }

  //
  uploadBase64ImageNodeJs(base64Image: string) {
    //
    let url = `${this._configService.getConfigValue('baseUrlNodeJsOcr')}upload`;
    //
    return this.http.post(url, { base64Image });
  }
}
