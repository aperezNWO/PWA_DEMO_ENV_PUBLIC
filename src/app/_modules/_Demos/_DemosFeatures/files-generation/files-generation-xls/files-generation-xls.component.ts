import { Component, OnInit, ViewChild, signal, effect  } from '@angular/core';
import { FormBuilder, Validators                       } from '@angular/forms';
import { ActivatedRoute                                } from '@angular/router';
import { MatTableDataSource                            } from '@angular/material/table';
import { MatPaginator                                  } from '@angular/material/paginator';
import { BehaviorSubject, Observable                                    } from 'rxjs';
import { UtilManager                                   } from 'src/app/_engines/util.engine';
import { LogEntry, SearchCriteria, _languageName       } from 'src/app/_models/entity.model';
import { BackendService                                } from 'src/app/_services/BackendService/backend.service';
import { SpeechService                                 } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { ConfigService                                 } from 'src/app/_services/__Utils/ConfigService/config.service';
import { PAGE_TITLE_LOG,PAGE_FILE_GENERATION_XLS, PAGE_TITLE_NO_SOUND       } from 'src/app/_models/common';
import { CustomErrorHandler                                                 } from 'src/app/app.component';
import { BaseReferenceComponent                                             } from 'src/app/_components/base-reference/base-reference.component';
//
@Component({
  selector     : 'app-files-generation-xls',
  templateUrl  : './files-generation-xls.component.html',
  styleUrls    : ['./files-generation-xls.component.css'],
  providers    : [
          { 
            provide : PAGE_TITLE_LOG, 
            useValue: PAGE_FILE_GENERATION_XLS 
          },
  ]
})
//
export class FilesGenerationXLSComponent extends BaseReferenceComponent implements OnInit {
    //--------------------------------------------------------------------------
    // PROPERTIES - COMMON
    //--------------------------------------------------------------------------
    //
    public _loading                                     = new BehaviorSubject<boolean>(false);
    //
    public __languajeList                              : any;
    protected tituloListadoLenguajes                   : string = "[Backend] :";
    //
    rf_searchForm   = this.formBuilder.group({
      _P_ROW_NUM          : ["999"         , Validators.required],
      _P_FECHA_INICIO     : ["2023-01-01"  , Validators.required],
      _P_FECHA_FIN        : ["2022-12-31"  , Validators.required],
    });
    //
    _model                           = new SearchCriteria( 
      "1"
      ,"1"
      ,"999"
      ,"2022-09-01"
      ,"2022-09-30"
      ,""
      ,"");
    //
    @ViewChild('_languajeList')    _languajeList       : any;
    //--------------------------------------------------------------------------
    // PROPIEADES - TEMPLATE FORMS
    //--------------------------------------------------------------------------
    //
    td_formSubmit                      : boolean = false;
    //
    td_buttonCaption                   : string  = "[Search]";
    //
    td_buttonCaption_xls               : string  = "[Generate XLS]";
    //
    td_textStatus_xls                  : string  = "";
    //
    td_ExcelDownloadLink               : string  = "#";
    //
    td_dataSource                      = new MatTableDataSource<LogEntry>();
    // 
    rf_displayedColumns                : string[] = ['id_Column', 'pageName', 'accessDate', 'ipValue'];
    //
    @ViewChild("td_paginator" ,{read:MatPaginator}) td_paginator!:  MatPaginator;
    //--------------------------------------------------------------------------
    // EVENT HANDLERS FORMIULARIO 
    //--------------------------------------------------------------------------
    //
    constructor(
                   public formBuilder          : FormBuilder, 
                   public customErrorHandler            : CustomErrorHandler,
                   public override configService        : ConfigService,
                   public override backendService       : BackendService, 
                   public override route                : ActivatedRoute,
                   public override speechService        : SpeechService) 
    {
             super(configService,
                   backendService,
                   route,
                   speechService,
                   PAGE_TITLE_NO_SOUND
             )
    }
    //
    ngOnInit(): void {
        //
        this.speechService.speakTextCustom(this.pageTitle); 
        //
        this.queryParams();
        //
        //this.rf_newSearch();
        this.td_newSearch();
    }
    //--------------------------------------------------------------------------
    // METODOS TEMÑLEATE BASED FORMS 
    //--------------------------------------------------------------------------
    //
    td_newSearch() : void {
      //
      this.td_dataSource           = new MatTableDataSource<LogEntry>();
      this.td_dataSource.paginator = this.td_paginator;
      //
      this._model                  = new SearchCriteria( 
          "1"
         ,"1"
         ,"999"
         ,"2022-09-01"
         ,"2022-09-30"
         ,""
         ,"");
      //
      this.td_buttonCaption     = "[Search]";
      //
      this.td_formSubmit        = false;
      //
      this.status_message.set("");
      //
      this.td_buttonCaption_xls               = "[Generate XLS]";
      //
      this.td_textStatus_xls                  = "";
      //
      this.td_ExcelDownloadLink               = "#";
    }
    //
    td_valid_form() : boolean {
      return (     
             ( ( this._model.P_ROW_NUM        != "" ) && (this._model.P_ROW_NUM       !=  null) && (this._model.P_ROW_NUM      != "0") ) 
          && ( ( this._model.P_FECHA_INICIO   != "" ) && (this._model.P_FECHA_INICIO  !=  null) ) 
          && ( ( this._model.P_FECHA_FIN      != "" ) && (this._model.P_FECHA_FIN     !=  null) ) 
      );  
    }
    //
    td_onSubmit() 
    { 
        //
        console.warn("TEMPLATE DRIVEN - (SUBMIT)");
        //
        console.warn("TEMPLATE DRIVEN - FORM VALID : " + this.td_valid_form());
        //
        this.td_formSubmit    = true;
        //
        if (this.td_valid_form())
            this.td_update(this._model);
    }
    //
    td_update(td_searchCriteria : SearchCriteria):void {
      //
      td_searchCriteria.P_FECHA_INICIO_STR = this.GetFormattedDate(td_searchCriteria.P_FECHA_INICIO,0);
      td_searchCriteria.P_FECHA_FIN_STR    = this.GetFormattedDate(td_searchCriteria.P_FECHA_FIN   ,0); 
      //
      let selectedIndex: number = this._languajeList.nativeElement.options.selectedIndex; // c++ by default
      //
      switch (selectedIndex) {
        case 1: // C#
              //
              this.td_buttonCaption = "[Please wait...]";
              //
              this.status_message.set("[Please wait...]");
              // 
              let td_informeLogRemoto!                 : Observable<LogEntry[]>;
              //      
              td_informeLogRemoto                      = this.backendService.getLogRemoto(td_searchCriteria);
              //
              const td_observer = {
                next: (td_logEntry: LogEntry[])     => { 
                  //
                  this.td_dataSource           = new MatTableDataSource<LogEntry>(td_logEntry);
                  this.td_dataSource.paginator = this.td_paginator;
                  //
                  this.status_message.set("[" + td_logEntry.length + "] records found ");
                  this.td_formSubmit           = false;
                },
                error           : (err: Error)      => {
                  //
                  console.error('TEMPLATE DRIVEN - (ERROR) : ' + JSON.stringify(err.message));
                  //
                  this.status_message.set("An error ocurred. Please try again");
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Search]";
                },
                complete        : ()                => {
                  //
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Search]";
                },
              }; 
              //
              td_informeLogRemoto
              .subscribe(td_observer);
          break;
        case 2: // NODE.JS
              //
              this.td_buttonCaption = "[Please wait...]";
              //
              this.status_message.set("[Please wait...]");
              // 
              let td_informeLogRemoto_NodeJs!   : Observable<string>;
              // 
              td_informeLogRemoto_NodeJs        = this.backendService.getLogRemotoNodeJS(td_searchCriteria);
              //
              const td_observer_node_js = {
                next: (td_logEntry_node_js: string)     => { 
                  //
                  let td_logEntry_node_js_json = JSON.parse(td_logEntry_node_js)['recordsets'][0];
                  //
                  this.td_dataSource           = new MatTableDataSource<LogEntry>(td_logEntry_node_js_json);
                  this.td_dataSource.paginator = this.td_paginator;
                  //
                  this.status_message.set("[" + td_logEntry_node_js_json.length + "] records found ");
                  this.td_formSubmit           = false;
                },
                error           : (err: Error)      => {
                  //
                  console.error('TEMPLATE DRIVEN - NODE.JS - (ERROR) : ' + JSON.stringify(err.message));
                  //
                  this.status_message.set("An error ocurred. Please try again");
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Search]";
                },
                complete        : ()                => {
                  //
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Search]";
                },
              }; 
              //
              td_informeLogRemoto_NodeJs
              .subscribe(td_observer_node_js);
          break;
        case 3: // SPRINGBOOT / JAVA
              //
              this.td_buttonCaption = "[Please wait...]";
              //
              this.status_message.set("[Please wait...]");
              // 
              let td_informeLogRemoto_SprinbBootJava!   : Observable<string>;
              // 
              td_informeLogRemoto_SprinbBootJava        = this.backendService.getLogRemotoSprinbBootJava(td_searchCriteria);
              //
              const td_observer_sprinbbootjava = {
                next: (td_logEntry_sprinbboot_java: string)     => { 
                  //
                  //console.log('TEMPLATE DRIVEN - SPRINGBOOT / JAVA - RETURN VALUES  : ' + td_logEntry_sprinbboot_java);
                  //
                  let td_logEntry_springboot_java_json   = JSON.parse(td_logEntry_sprinbboot_java);
                  //
                  this.td_dataSource           = new MatTableDataSource<LogEntry>(td_logEntry_springboot_java_json);
                  this.td_dataSource.paginator = this.td_paginator;
                  //
                  this.status_message.set("[" + td_logEntry_springboot_java_json.length + "] records found ");
                  this.td_formSubmit           = false;
                },
                error           : (err: Error)      => {
                  //
                  console.error('TEMPLATE DRIVEN - sprigboot/Java - (ERROR) : ' + JSON.stringify(err.message));
                  //
                  this.status_message.set("An error ocurred. Please try again");
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Search]";
                },
                complete        : ()                => {
                  //
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Search]";
                },
              }; 
              //
              td_informeLogRemoto_SprinbBootJava
              .subscribe(td_observer_sprinbbootjava);
          break;
        case 4: // DJANGO     / PYTHON
          //
          this.td_buttonCaption = "[Please wait...]";
          //
          this.status_message.set("[Please wait...]");
          // 
          let td_informeLogRemoto_PythonDjango!   : Observable<string>;
          // 
          td_informeLogRemoto_PythonDjango        = this.backendService.getLogRemotoDjangoPython(td_searchCriteria);
          //
          const td_observer_pythondjango = {
            next: (td_logEntry_python_django: string)     => { 
              //
              let td_logEntry_python_django_json   = JSON.parse(td_logEntry_python_django);
              //
              this.td_dataSource           = new MatTableDataSource<LogEntry>(td_logEntry_python_django_json);
              this.td_dataSource.paginator = this.td_paginator;
              //
              this.status_message.set("[" + td_logEntry_python_django_json.length + "] records found ");
              this.td_formSubmit           = false;
            },
            error           : (err: Error)      => {
              //
              console.error('TEMPLATE DRIVEN - python/django - (ERROR) : ' + JSON.stringify(err.message));
              //
              this.status_message.set("An error ocurred. Please try again");
              this.td_formSubmit           = false;
              this.td_buttonCaption        = "[Search]";
            },
            complete        : ()                => {
              //
              this.td_formSubmit           = false;
              this.td_buttonCaption        = "[Search]";
            },
          }; 
          //
          td_informeLogRemoto_PythonDjango
          .subscribe(td_observer_pythondjango);
      break;
        default:
          return;
      }
    };
    //
    td_GenerarInformeXLSValidate():void
    {
        this.td_GenerarInformeXLS(this._model);
    }
    //
    td_GenerarInformeXLS(_searchCriteria : SearchCriteria)
    {
      //
      let td_excelFileName!                   : Observable<string>;
      //
      td_excelFileName                        = this.backendService.getInformeExcel(this._model);
      //
      this.td_ExcelDownloadLink               = "#";
      //
      this.td_buttonCaption_xls               = "[Generating please wait ...]";
      //
      this.status_message.set("[Generating please wait ...]");
      //
      const xlsObserver                       = {
        //
        next: (_excelFileName: string) => { 
          //
          let urlFile                = UtilManager.DebugHostingContent(_excelFileName); 
          //
          this.td_ExcelDownloadLink  = `${this.configService.getConfigValue('baseUrlNetCore')}/wwwroot/xlsx/${urlFile}`;
          //
          this.status_message.set("[XLS file generated correctly]");
          //
          this.td_textStatus_xls = "[Download XLS File]";
        },
        error   : (err: Error)  => {
          //
          console.error('Observer got an error: ' + err.cause);
          //
          console.error('Observer got an error: ' + err.message);
          //
          this.td_buttonCaption_xls  = "[An error ocurred]";
          //
          this.td_textStatus_xls = "[An error ocurred]";
          //
          this.status_message.set("[An error ocurred]")
        },
        complete: () => {
          //
          this.td_buttonCaption_xls  = "[Generate XLS]";
        },
      };
      //
      td_excelFileName
      .subscribe(xlsObserver);
    }
     //--------------------------------------------------------------------------
    // METODOS COMUNES 
    //--------------------------------------------------------------------------
    //
    queryParams():void{
      //
      this.route.queryParams.subscribe(params => {
        //-----------------------------------------------------------------------------
        // LENGUAJES DE PROGRAMACION
        //-----------------------------------------------------------------------------
        this.__languajeList = new Array();
        //
        this.__languajeList.push(
          new _languageName(0, '(CHOOSE OPTION...)', false,""),
        );
        //
        this.__languajeList.push(new _languageName(1, '(.Net Core   / C#)'             , false ,"CS"   ));
        this.__languajeList.push(new _languageName(2, '(Node.js     / JavaScript)'     , false ,"JS"   ));
        this.__languajeList.push(new _languageName(3, '(SpringBoot  / Java)'           , false ,"JAVA" ));
        this.__languajeList.push(new _languageName(4, '(Django      / Pytnon)'         , false ,"PY"   ));
        //
        let langName = params['langName'] ? params['langName'] : "" ;
        //
        if (langName !== '')
        {   
            //
            for (var index = 1; index < this.__languajeList.length; index++) {
                //
                if (this.__languajeList[index]._shortName  == langName)
                  this.__languajeList[index]._selected = true;        
            }

        } else {
          //
          this.__languajeList[1]._selected = true; // C#
        }

        //
        console.warn(`QUERY PARAMS... ${this.__languajeList.length}`);
      });
    }
    //
    GetFormattedDate(p_date : /*Date*/ string, order : number) {
        //
        var today = '';
        switch (order) {
            case 0:  // FECHA COMPLATIBLE CON RDBMS
                var p_dates = p_date.toString().split('-'); // P_DATE   = 2022-04-09
                var day     = p_dates[2];
                var month   = p_dates[1];
                var year    = p_dates[0];
                today       = day + "/" + month + "/" + year;
                //
                break;
        }
        //
        return today;
    }  
}


