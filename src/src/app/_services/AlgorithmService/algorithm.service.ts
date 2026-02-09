import { Injectable    } from '@angular/core';
import { HttpClient    } from '@angular/common/http';
import { Observable    } from 'rxjs';
import { BaseService   } from '../__baseService/base.service';
import { ConfigService } from '../__Utils/ConfigService/config.service';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService extends BaseService {
    //
    constructor(public http: HttpClient, public _configService : ConfigService) { 
        //
        super();    
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [COMUNES]
    ////////////////////////////////////////////////////////////////  
    //
    _Algorithm_GetAppVersion(): Observable<string> {
      //
      let p_url         : string  = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}api/Algorithm/GetAppVersion`;
      //
      let appVersion    : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return appVersion;
    }
    // 
    _Algorithm_GetCPPSTDVersion(): Observable<string> {
      //
      let p_url         : string  = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}api/Algorithm/GetCPPSTDVersion`;
      //
      let appVersion    : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return appVersion;
    }

    ////////////////////////////////////////////////////////////////  
    // METODOS - [ALGORITMOS - DISTANCIA MAS CORTA]
    ////////////////////////////////////////////////////////////////  
    //    
    getRandomVertex(vertexSize : Number,sourcePoint : Number): Observable<string> {
      //
      let p_url    = `${this._configService.getConfigValue('baseUrlNetCore')}api/Dijkstra/GenerateRandomVertex?p_vertexSize=${vertexSize}&p_sourcePoint=${sourcePoint}`;
      //
      let dijkstraData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return dijkstraData; 
    }
    //
    getRandomVertexCpp(vertexSize : Number,sourcePoint : Number): Observable<string> {
      //
      let p_url    = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}api/Algorithm/GenerateRandomVertex_CPP?p_vertexSize=${vertexSize}&p_sourcePoint=${sourcePoint}`;
      //
      let dijkstraData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return dijkstraData; 
    }
    //
    getRandomVertexSpringBoot(vertexSize : Number,sourcePoint : Number): Observable<string> {
       //
      let p_url    = `${this._configService.getConfigValue('baseUrlSpringBootJava')}GenerateRandomVertex_SpringBoot`;
      //
      let dijkstraData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text_Plain);
      //
      return dijkstraData; 
    }
    
    ////////////////////////////////////////////////////////////////  
    // METODOS - [ALGORITMOS - ORDENAMIENTO]
    ////////////////////////////////////////////////////////////////     
    SortBenchMark_getNewSort_C_Sharp():Observable<string>
    {
      //
      let p_url    = `${this._configService.getConfigValue('baseUrlNetCore')}api/SortBenchMark/NewSort`;
      //
      let newSortData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return newSortData; 
    }
    //    
    SortBenchMark_getSort_C_Sharp(p_sortAlgoritm: number, p_unsortedList: string):Observable<string>
    {
      //
      let p_url    = `${this._configService.getConfigValue('baseUrlNetCore')}api/SortBenchMark/GetSort?p_sortAlgoritm=${p_sortAlgoritm}&p_unsortedList=${p_unsortedList}`;
      //
      let newSortData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return newSortData; 
    }
    //    
    getSort_CPP(p_sortAlgoritm: number, p_unsortedList: string):Observable<string>
    {
      //
      let p_url    = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}api/Algorithm/_GetSort_CPP?p_sortAlgoritm=${p_sortAlgoritm}&p_unsortedList=${p_unsortedList}`;
      //
      let newSortData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return newSortData; 
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [ALGORITMOS - EXPRESIONES REGULARES]
    ////////////////////////////////////////////////////////////////  
    //    
    _GetXmlData():Observable<string>
    {
      //
      let p_url  : string  = `${this._configService.getConfigValue('baseUrlNetCore')}api/RegExManager/GetXmlData`;
      //
      let xmlData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return xmlData; 
    }
    //
    _SetXmlDataToCache(_prefix : string | undefined):void
    {
      //
      let p_url   : string  = `${_prefix}api/RegExManager/SetXmlDataToCache`;
      //
      ////console.log("Setting XML data to cache :  " + p_url)
      //
      let xmlData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      const td_observer = {
        next: (jsondata: string)     => { 
          //
          ////console.log('_SetXmlDataToCache - (return): ' + jsondata);
        },
        error           : (err: Error)      => {
          //
          console.error('_SetXmlDataToCache- (ERROR) : ' + JSON.stringify(err.message));
          //
        },
        complete        : ()                => {
          //
          ////console.log('_SetXmlDataToCache -  (COMPLETE)');
        },
      };
      //
      xmlData.subscribe(td_observer);
    }
    //
    public _RegExEval(tagSearchIndex: number, textSearchValue: string): Observable<string>
    {
      //
      let p_url    : string = `${this._configService.getConfigValue('baseUrlNetCore')}api/RegExManager/RegExEval?p_tagSearch=${tagSearchIndex}&p_textSearch=${textSearchValue}`;
      //
      let regExData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return regExData; 
    }
    //
    public _RegExEval_CPP(tagSearchIndex: number, textSearchValue: string): Observable<string>
    {
      //
      let p_url    : string = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}api/Algorithm/_RegExEval_CPP?p_tagSearch=${tagSearchIndex}&p_textSearch=${textSearchValue}`;
      //
      let regExData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return regExData; 
    }
  ///////////////////////////////////////////////////////////////
}
