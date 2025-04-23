import { Injectable, OnInit                                      } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders         } from '@angular/common/http';
import { HttpRequest, HttpResponse  , HttpInterceptor            } from '@angular/common/http';
import { Observable                                              } from 'rxjs';
import { LogEntry, LogType, SearchCriteria                       } from '../../_models/entity.model';
import { ConfigService                                           } from '../ConfigService/config.service';
//
@Injectable({
  providedIn: 'root'
})
//
export class BackendService implements OnInit {
    ////////////////////////////////////////////////////////////////  
    // CAMPOS
    ////////////////////////////////////////////////////////////////  
    //
    public HTTPOptions_Text_Plain = {
      headers: new HttpHeaders(),
      'responseType'  : 'text' as 'json'
    };
     //
    public HTTPOptions_Text = {
      headers: new HttpHeaders({
        'Accept':'application/text'
      }),
      'responseType'  : 'text' as 'json'
    };
    //    
    public HTTPOptions_JSON = {
      headers: new HttpHeaders({
       'Content-Type' : 'application/json'
      })
      ,'responseType' : 'text' as 'json'
    }; 
    public get _baseUrlNetCoreCPPEntry(): string
    {
       return this.__baseUrlNetCoreCPPEntry;
    }

    //
    public get _baseUrlNetCore(): string {
      //
      return this.__baseUrlNetCore;
    }
    //
    public set _baseUrlNetCore(value: string) {
      //
      this.__baseUrlNetCore = value;
    }
    //
    public get _baseUrlNodeJs(): string {
      //
      return this.__baseUrlNodeJs;
    }
    //
    public set _baseUrlNodeJs(value: string) {
      //
      this.__baseUrlNodeJs = value;
    }
    //
    public set _baseUrlNodeJsOcr(value: string) {
      //
      this.__baseUrlNodeJsOcr = value;
    }
    //
    public set _baseUrlSpringBoot(value: string) {
      //
      this.__baserUrlSpringBoot = value;
    }
    //
    public get _baseUrlSpringBoot():string {
      //
      return this.__baserUrlSpringBoot;
    }
    //
    public set _baseUrlDjangoPython(value: string) {
    //
    this.__baseUrlDjangoPython = value;
    }
    //
    public get _baseUrlDjangoPython():string {
      //
      return this.__baseUrlDjangoPython;
    }
      //
    protected __baseUrlNetCoreCPPEntry     : string = '';
    protected __baseUrlNetCore        : string = '';
    protected __baseUrlNodeJs         : string = '';
    protected __baseUrlNodeJsOcr      : string = '';
    protected __baserUrlSpringBoot    : string = '';
    protected __baseUrlDjangoPython   : string = '';
    //
    ////////////////////////////////////////////////////////////////  
    // METODOS - [EVENT HANDLERS]
    ////////////////////////////////////////////////////////////////  
    //
    ngOnInit(): void {
      //
      ////console.log("Calling MCSDService initialization...");
      //
    }
    constructor(public http: HttpClient, public _configService : ConfigService) {
      //
      ////console.log("Calling MCSDService constructor...");
      //
      this.__baseUrlNetCoreCPPEntry   = this._configService.getConfigValue('baseUrlNetCoreCPPEntry');
      this.__baseUrlNetCore           = this._configService.getConfigValue('baseUrlNetCore');
      this.__baseUrlNodeJs            = this._configService.getConfigValue('baseUrlNodeJs');
      this.__baseUrlNodeJsOcr         = this._configService.getConfigValue('baseUrlNodeJsOcr');
      this.__baserUrlSpringBoot       = this._configService.getConfigValue('baseUrlSpringBootJava');
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [COMUNES]
    ////////////////////////////////////////////////////////////////  
    //
    _GetWebApiAppVersion(): Observable<string>
    {
      //
      let p_url         : string  = `${this._baseUrlNetCore}demos/_GetAppVersion`;
      //
      let appVersion    : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return appVersion;
    }
    _GetTesseractVersion(): Observable<string> {
      //
      let p_url         : string  = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}GetTesseractVersion`;
      //
      let appVersion    : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return appVersion;
    }
    _GetASPNETCoreCppVersion(): Observable<string> {
      //
      let p_url         : string  = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}_GetAppVersion`;
      //
      let appVersion    : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return appVersion;
    }
    //
    _GetCppDLLVersion(): Observable<string> {
      //
      let p_url         : string  = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}GetDLLVersion`;
      //
      let appVersion    : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return appVersion;
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [GENERAR ARCHIVO CSV]
    ////////////////////////////////////////////////////////////////  
    getCSVLinkGET(): Observable<string> {
      //
      let p_url    = this._baseUrlNetCore + 'demos/_GetCSVLinkJsonGET';
      //
      let csvLink : Observable<string> =  this.http.get<string>(p_url);
      //
      return csvLink; 
    }
    //
    getCSVLink(): Observable<string> {
      //
      let p_url    = this._baseUrlNetCore + 'demos/_GetCSVLinkJson';
      //
      let csvLink : Observable<string> =  this.http.post<string>(p_url,this.HTTPOptions_Text);
      //
      return csvLink; 
    }
    //    
    getInformeRemotoCSV(): Observable<string> {
      //
      let p_url    = this._baseUrlNetCore + 'demos/GenerarInformeCSVJson';
      //
      let jsonCSVData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return jsonCSVData; 
    }
    //
    getInformeRemotoCSV_STAT():Observable<string> {
        //
        let p_url    = this._baseUrlNetCore + 'demos/GenerarInformeCSVJsonSTAT';
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
      ////console.log("Setting STAT Pie data to cache :  " + p_url);
      //
      let jsonCSVData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      const jsonCSVDataObserver = {
        next: (jsondata: string)     => { 
          //
          ////console.log('_SetSTATPieCache - (return): ' + jsondata);
        },
        error           : (err: Error)      => {
          //
          //console.error('_SetSTATPieCache- (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          //
          ////console.log('_SetSTATPieCache -  (COMPLETE)');
        },
      };
      //
      jsonCSVData.subscribe(jsonCSVDataObserver); 
    }
    //    
    getInformeRemotoCSV_NodeJS(): Observable<string> {
    //
    let p_url: string = `${this._baseUrlNodeJs}GenerarInformeCSVJson`;
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
    // METODOS - [GENERAR ARCHIVO XLS]
    ////////////////////////////////////////////////////////////////  
    //
    getLogRemoto(_searchCriteria : SearchCriteria) {
        //
        let url    = this._baseUrlNetCore + 'demos/generarinformejson';
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
      //console.log('getLogRemotoNodeJS : ' + p_url);
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
      ////console.log('getLogRemotoSprinbBootJava ' + p_url);
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
      ////console.log('getPersonsSprinbBootJava ' + p_url);
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
      ////console.log('getLogRemotoSprinbBootJava ' + p_url);
      //
      return djantoPythonOutput;
    }
    //
    getInformeExcel(_searchCriteria : SearchCriteria){
        //
        let p_url  = this._baseUrlNetCore + 'demos/generarinformexls';
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
      ////console.log('getLogRemotoSprinbBootJava ' + p_url);
      //
      return djantoPythonOutput;
    }
    //
    getLogStatPOST() {
      //
      let url    = `${this._baseUrlNetCore}demos/GetConsultaLogStatPost`;
      //
      return this.http.post<string>(url,this.HTTPOptions_JSON);   
    }    
    //
    getLogStatGET() {
      //
      let url    = `${this._baseUrlNetCore}demos/GetConsultaLogStatGet`;
      //
      return this.http.get<LogEntry[]>(url);   
    } 
    //
    _SetSTATBarCache(_prefix : string | undefined) : void {
      //
      let p_url    = `${_prefix}demos/_SetSTATBarCache`;
      //
      ////console.log("Setting STAT Bar data to cache :  " + p_url);
      //
      let jsonDataObservable : Observable<string> = this.http.get<string>(p_url,this.HTTPOptions_Text);   
      //
      const jsonDataOberver = {
        next: (jsondata: string)     => { 
          //
          ////console.log('_SetSTATBarCache - (return): ' + jsondata);
        },
        error           : (err: Error)      => {
          //
          console.error('_SetSTATBarCache- (ERROR) : ' + JSON.stringify(err.message));
          //
        },
        complete        : ()                => {
          //
          ////console.log('_SetSTATBarCache -  (COMPLETE)');
        },
      };
      //
      jsonDataObservable.subscribe(jsonDataOberver);
    } 
    //////////////////////////////////////////////////////////////
    // GET ZIP / FILE UPLODAD METHODS
    //////////////////////////////////////////////////////////////
    upload(file: File) : Observable<HttpEvent<any>> {
      //
      const formData: FormData = new FormData();
      //
      formData.append('file', file);
      //
      let url    = `${this._baseUrlNetCore}demos/_ZipDemoGetFileName`;
      //
      //console.log("[GENERATE ZIP FILE] - (UPLOADING FILE) url: " + url);
      // USAR REQUEST PARA OBTENER PORCENTAJE DE STATUS
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true,
        responseType  : 'text',
      });
      //
      return this.http.request<HttpEvent<any>>(req);
    }
    //
    SetZip(p_fileName : string | undefined):Observable<string> {
        //
        let p_url   = `${this._baseUrlNetCore}demos/_SetZip?p_fileName=${p_fileName}`;
        //
        ////console.log("[GENERATE ZIP FILE] - [GETTING ZIP] - fileName: " + p_fileName);
        //
        ////console.log("[GENERATE ZIP FILE] - [GETTING ZIP] - url     : " + p_url);
        //
        let returnUrl     : Observable<string> = this.http.get<string>(p_url,this.HTTPOptions_JSON); 
        //
        return returnUrl;   
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [GENERAR ARCHIVOS  - PDF]
    ////////////////////////////////////////////////////////////////
    public GetPDF(subjectName: string | undefined): Observable<HttpEvent<any>> {
        //
        let p_url   = `${this._baseUrlNetCore}demos/_GetPdf?subjectName=${subjectName}`;
        //
        ////console.log("[GENERATE PDF FILE] - [GETTING ZIP] - subjectName  : " + subjectName);
        //
        ////console.log("[GENERATE PDF FILE] - [GETTING ZIP] - url          : " + p_url);
        // USAR REQUEST PARA OBTENER PORCENTAJE DE STATUS
        const req = new HttpRequest('GET', p_url, {
          reportProgress: true,
          responseType  : 'text',
        });
        //
        return this.http.request<HttpEvent<any>>(req);
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [ALGORITMOS - DISTANCIA MAS CORTA]
    ////////////////////////////////////////////////////////////////  
    //    
    getRandomVertex(vertexSize : Number,sourcePoint : Number): Observable<string> {
      //
      let p_url    = `${this._baseUrlNetCore}demos/GenerateRandomVertex?p_vertexSize=${vertexSize}&p_sourcePoint=${sourcePoint}`;
      //
      let dijkstraData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return dijkstraData; 
    }
    //
    getRandomVertexCpp(vertexSize : Number,sourcePoint : Number): Observable<string> {
      //
      let p_url    = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}GenerateRandomVertex_CPP?p_vertexSize=${vertexSize}&p_sourcePoint=${sourcePoint}`;
      //
      let dijkstraData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return dijkstraData; 
    }
    //
    getRandomVertexSpringBoot(vertexSize : Number,sourcePoint : Number): Observable<string> {
         //
      let p_url    = `${this._baseUrlSpringBoot}GenerateRandomVertex_SpringBoot`;
      //
      let dijkstraData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text_Plain);
      //
      return dijkstraData; 
    }
    
    ////////////////////////////////////////////////////////////////  
    // METODOS - [ALGORITMOS - ORDENAMIENTO]
    ////////////////////////////////////////////////////////////////     
    getNewSort():Observable<string>
    {
      //
      let p_url    = `${this._baseUrlNetCore}demos/_NewSort`;
      //
      let newSortData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return newSortData; 
    }
    //    
    getSort(p_sortAlgoritm: number, p_unsortedList: string):Observable<string>
    {
      //
      let p_url    = `${this._baseUrlNetCore}demos/_GetSort?p_sortAlgoritm=${p_sortAlgoritm}&p_unsortedList=${p_unsortedList}`;
      //
      let newSortData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return newSortData; 
    }
    //    
    getSort_CPP(p_sortAlgoritm: number, p_unsortedList: string):Observable<string>
    {
      //
      let p_url    = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}_GetSort_CPP?p_sortAlgoritm=${p_sortAlgoritm}&p_unsortedList=${p_unsortedList}`;
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
      let p_url  : string  = `${this._baseUrlNetCore}demos/_GetXmlData`;
      //
      let xmlData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return xmlData; 
    }
    //
    _SetXmlDataToCache(_prefix : string | undefined):void
    {
      //
      let p_url   : string  = `${_prefix}demos/_SetXmlDataToCache`;
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
      let p_url    : string = `${this._baseUrlNetCore}demos/_RegExEval?p_tagSearch=${tagSearchIndex}&p_textSearch=${textSearchValue}`;
      //
      let regExData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return regExData; 
    }
    //
    public _RegExEval_CPP(tagSearchIndex: number, textSearchValue: string): Observable<string>
    {
      //
      let p_url    : string = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}_RegExEval_CPP?p_tagSearch=${tagSearchIndex}&p_textSearch=${textSearchValue}`;
      //
      let regExData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return regExData; 
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [LOG]
    ////////////////////////////////////////////////////////////////  
    //
    public SetLog(p_PageTitle : string ,p_logMsg : string, logType : LogType = LogType.Info):void
    {
      //
      let logInfo!  : Observable<string>;
      //
      let p_url     = `${this._baseUrlNetCore}demos/_SetLog?p_logMsg=${p_logMsg}&logType=${logType.toString()}`;
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
    // GAMES
    //////////////////////////////////////////////////////////////// 
     //
     _GetSudoku_NodeJS(): Observable<string> {
      //
      let p_url: string = `${this._baseUrlNodeJs}Sudoku_Generate_NodeJS`;
      //
      let sudokuGenerated: Observable<string> = this.http.get<string>(
        p_url,
        this.HTTPOptions_JSON,
      );
      //
      return sudokuGenerated;
    } 
    //
    _GetSudoku_CPP(): Observable<string>
    {
      // 
      let p_url              : string  =  `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}Sudoku_Generate_CPP`;
      //
      let sudokuGenerated    : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return sudokuGenerated;
    };
   //
   _SolveSudoku_CPP(p_matrix : string): Observable<string>
   {
     // 
     let p_url               : string  = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}Sudoku_Solve_CPP?p_matrix=${p_matrix}`
     //
     let sudokuSolved        : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
     //
     return sudokuSolved;
   };
    //
    _SolveSudoku_NodeJS(p_matrix: string): Observable<string> {
      //
      let p_url: string = `${this.__baseUrlNodeJs}Sudoku_Solve_NodeJS?p_matrix=${p_matrix}`;
      //
      let sudokuSolved: Observable<string> = this.http.get<string>(
        p_url,
        this.HTTPOptions_Text,
      );
      //
      return sudokuSolved;
    }
  //-------------------------------------------------------------
  // FILE UPLODAD METHODS
  //-------------------------------------------------------------
  uploadSudoku(file: File): Observable<HttpEvent<any>> {
    //
    const formData: FormData = new FormData();
    //
    formData.append('file', file);
    //
    let url = `${this._baseUrlNetCore}demos/Sudoku_Upload_File`;
    //
    //console.log('[SUDOKU] - (UPLOADING FILE) url: ' + url);
    //
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'text',
    });
    //
    return this.http.request<HttpEvent<any>>(req);
  }
  //
  uploadBase64Image(base64Image: string) {
    //
    let url = this._configService.getConfigValue('baseUrlNodeJsOcr');
    //
    ////console.log('Sending ocr to url : ' + url);
    //
    return this.http.post(url, { base64Image });
  }
  ///////////////////////////////////////////////////////////////
}
  