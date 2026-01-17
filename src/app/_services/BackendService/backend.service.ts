import { Injectable, OnInit                                      } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders                      } from '@angular/common/http';
import { HttpRequest                                             } from '@angular/common/http';
import { Observable                                              } from 'rxjs';
import { LogEntry, LogType, SearchCriteria                       } from '../../_models/entity.model';
import { ConfigService                                           } from '../__Utils/ConfigService/config.service';
import { BaseService                                             } from '../__baseService/base.service';
import { _environment                                            } from 'src/environments/environment';

//
@Injectable({
  providedIn: 'root'
})
//
export class BackendService extends BaseService implements OnInit  {
 
    constructor(public http: HttpClient, public _configService : ConfigService) {
      //
      super();
    }

    ////////////////////////////////////////////////////////////////  
    // METODOS - [EVENT HANDLERS]
    ////////////////////////////////////////////////////////////////  
    //
    ngOnInit(): void {
       //
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [COMUNES]
    ////////////////////////////////////////////////////////////////  
    //
    _GetWebApiAppVersion(): Observable<string>
    {
      //
      let p_url         : string  = `${this._configService.getConfigValue('baseUrlNetCore')}demos/_GetAppVersion`;
      //
      let appVersion    : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return appVersion;
    }
    //
    _GetASPNETCoreCppVersion(): Observable<string> {
      //
      let p_url         : string  = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}_GetAppVersion`;
      //
      let appVersion    : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return appVersion;
    }
    //
    public SetLog(p_PageTitle : string ,p_logMsg : string, logType : LogType = LogType.Info):void
    {
      //
      if ((p_PageTitle == '') || (p_logMsg == ''))
        return;
      //
      let logInfo!  : Observable<string>;
      //
      let p_url     = `${this._configService.getConfigValue('baseUrlNetCore')}demos/_SetLog?p_logMsg=${p_logMsg}&logType=${logType.toString()}`;
      //
      logInfo       = this.http.get<string>(p_url, this.HTTPOptions_Text);
      //
      const logInfoObserver   = {
            //
            next: (logResult: string)     => { 
                  //
                  //console.warn(p_PageTitle +  ' - [LOG] - [RESULT] : ' + logResult);
            },
            error: (err: Error) => {
                  //
                  //console.error(p_PageTitle + ' - [LOG] - [ERROR]  : ' + err);
            },       
            complete: ()        => {
                  //
                  //console.info(p_PageTitle  + ' - [LOG] - [COMPLETE]');
            },
        };
        //
        logInfo.subscribe(logInfoObserver);
    };
    ////////////////////////////////////////////////////////////////  
    // METODOS - [GENERAR ARCHIVO CSV] / CHARTS 
    ////////////////////////////////////////////////////////////////  
    getCSVLinkGET(): Observable<string> {
      //
      let p_url    = `${this._configService.getConfigValue('baseUrlNetCore')}demos/_GetCSVLinkJsonGET`;
      //
      let csvLink : Observable<string> =  this.http.get<string>(p_url);
      //
      return csvLink; 
    }
    //
    getCSVLink(): Observable<string> {
      //
      let p_url    = `${this._configService.getConfigValue('baseUrlNetCore')}demos/_GetCSVLinkJson`;
      //
      let csvLink : Observable<string> =  this.http.post<string>(p_url,this.HTTPOptions_Text);
      //
      return csvLink; 
    }
    //    
    getInformeRemotoCSV(): Observable<string> {
      //
      let p_url    = `${this._configService.getConfigValue('baseUrlNetCore')}demos/GenerarInformeCSVJson`;
      //
      let jsonCSVData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return jsonCSVData; 
    }
    //
    getInformeRemotoCSV_STAT():Observable<string> {
        //
        let p_url    = `${this._configService.getConfigValue('baseUrlNetCore')}demos/GenerarInformeCSVJsonSTAT`;
        //
        let jsonCSVData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
        //
        return jsonCSVData; 
    }
    //
    _SetSTATPieCache(_prefix : string | undefined):void{
      //
      let p_url    =  `${_prefix}demos/_SetSTATPieCache`;
      //
      let jsonCSVData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      const jsonCSVDataObserver = {
        next: (jsondata: string)            => { 
          //
        },
        error           : (err: Error)      => {
          //
        },
        complete        : ()                => {
          //
        },
      };
      //
      jsonCSVData.subscribe(jsonCSVDataObserver); 
    }
  //    
  getInformeRemotoCSV_NodeJS(): Observable<string> {
    //
    let p_url: string = `${this._configService.getConfigValue('baseUrlNodeJs')}GenerarInformeCSVJson`;
    //
    console.warn(" REQUESTING URL : " + p_url);
    //
    var HTTPOptions = {
      headers: new HttpHeaders({
        'Accept':'application/text'
      }),
      'responseType': 'text' as 'json'
    };
    //
    let jsonCSVData : Observable<string> =  this.http.get<string>(p_url,HTTPOptions);
    //
    return jsonCSVData; 
  }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [GENERAR ARCHIVO XLS] / CHARTS
    ////////////////////////////////////////////////////////////////  
    //
    getLogRemoto(_searchCriteria : SearchCriteria) {
          //
          let url    = `${this._configService.getConfigValue('baseUrlNetCore')}demos/generarinformejson`;
          //    
          return this.http.get<LogEntry[]>(url);
      }
    //
    getLogRemotoNodeJS(_searchCriteria : SearchCriteria) : Observable<string>{
        //
        let p_url       : string = `${this._configService.getConfigValue('baseUrlNodeJs')}generarinformejson`;
        //
        let nodeJsOutput: Observable<string> = this.http.get<string>(
          p_url,
          this.HTTPOptions_JSON,
        );
        //
        return nodeJsOutput;
      }
    //
    getLogRemotoSprinbBootJava(_searchCriteria : SearchCriteria) : Observable<string>{
        //
        let p_url       : string = `${this._configService.getConfigValue('baseUrlSpringBootJava')}getAllLogs`;
        //
        let nodeJsOutput: Observable<string> = this.http.get<string>(
          p_url,
          this.HTTPOptions_JSON,
        );

        //
        return nodeJsOutput;
      }
    //
    getPersonsSprinbBootJava() : Observable<string>{
        //
        let p_url       : string = `${this._configService.getConfigValue('baseUrlSpringBootJava')}getAllPersons`;
        //
        let nodeJsOutput: Observable<string> = this.http.get<string>(
          p_url,
          this.HTTPOptions_JSON,
        );
        //
        return nodeJsOutput;
    }
    //
    getLogRemotoDjangoPython(_searchCriteria : SearchCriteria) : Observable<string>{
        //
        let p_url       : string = `${this._configService.getConfigValue('baseUrlDjangoPython')}getAllLogs?format=json`;
        //
        let djantoPythonOutput: Observable<string> = this.http.get<string>(
          p_url,
          this.HTTPOptions_JSON,
        );
        //
        return djantoPythonOutput;
      }
    //
    getInformeExcel(_searchCriteria : SearchCriteria){
          //
          let p_url  = `${this._configService.getConfigValue('baseUrlNetCore')}demos/generarinformexls`;
          //
          let excelFileName : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
          //
          return excelFileName; 
      }
    //
    getPersonsDjangoPython() : Observable<string>{
      //
      let p_url       : string = `${this._configService.getConfigValue('baseUrlDjangoPython')}getAllPersons?format=json`;
      //
      let djantoPythonOutput: Observable<string> = this.http.get<string>(
        p_url,
        this.HTTPOptions_JSON,
      );
      //
      return djantoPythonOutput;
    }
    //
    getLogStatPOST() {
      //
      let url    = `${this._configService.getConfigValue('baseUrlNetCore')}demos/GetConsultaLogStatPost`;
      //
      return this.http.post<string>(url,this.HTTPOptions_JSON);   
    }    
    //
    getLogStatGET() {
      //
      let url    = `${this._configService.getConfigValue('baseUrlNetCore')}demos/GetConsultaLogStatGet`;
      //
      return this.http.get<LogEntry[]>(url);   
    } 
    //
    _SetSTATBarCache(_prefix : string | undefined) : void {
      //
      let p_url    = `${_prefix}demos/_SetSTATBarCache`;
      //
      let jsonDataObservable : Observable<string> = this.http.get<string>(p_url,this.HTTPOptions_Text);   
      //
      const jsonDataOberver = {
        next: (jsondata: string)     => { 
          //
        },
        error           : (err: Error)      => {
          //
          console.error('_SetSTATBarCache- (ERROR) : ' + JSON.stringify(err.message));
          //
        },
        complete        : ()                => {
          //
        },
      };
      //
      jsonDataObservable.subscribe(jsonDataOberver);
    } 
  ////////////////////////////////////////////////////////////////////
}
  