import { AfterViewInit, Component, OnInit, ViewChild, signal, effect  } from '@angular/core';
import { FormBuilder, Validators                       } from '@angular/forms';
import { MatTableDataSource                            } from '@angular/material/table';
import { MatPaginator                                  } from '@angular/material/paginator';
import { UtilManager                                   } from 'src/app/_engines/util.engine';
import { BehaviorSubject, Observable                   } from 'rxjs';
import { LogEntry, SearchCriteria, _languageName       } from 'src/app/_models/entity.model';
import { BackendService                                } from 'src/app/_services/BackendService/backend.service';
import { ActivatedRoute                                } from '@angular/router';
import { SpeechService                                 } from 'src/app/_services/speechService/speech.service';
//
@Component({
  selector     : 'app-files-generation-xls',
  templateUrl  : './files-generation-xls.component.html',
  styleUrls    : ['./files-generation-xls.component.css']
})
//
export class FilesGenerationXLSComponent implements OnInit, AfterViewInit {
    //--------------------------------------------------------------------------
    // PROPIEDADES COMUNES
    //--------------------------------------------------------------------------
    public static get PageTitle()   : string {
      return '[GENERAR ARCHIVOS XLS]';
    }
    readonly pageTitle          : string = FilesGenerationXLSComponent.PageTitle;
    //--------------------------------------------------------------------------
    // PROPIEADES - REACTIVE FORMS
    //--------------------------------------------------------------------------
    //
    rf_textStatus                      = signal<string>("");
    //
    rf_buttonCaption                   : string = "[Buscar]";
    //
    rf_formSubmit                      : boolean = false;
    //
    rf_ExcelDownloadLink               : string  = "";
    //
    rf_buttonCaption_xls               : string  = "";
    //
    rf_textStatus_xls                  = signal<string>("");
    //
    rf_dataSource                      = new MatTableDataSource<LogEntry>();
    // 
    rf_displayedColumns                : string[] = ['id_Column', 'pageName', 'accessDate', 'ipValue'];
    //
    rf_model                           = new SearchCriteria( "1"
                                            ,"1"
                                            ,"999"
                                            ,"2023-01-01"
                                            ,"2023-12-31"
                                            ,""
                                            ,"");
    //
    @ViewChild("rf_paginator" ,{read:MatPaginator}) rf_paginator!:  MatPaginator;
    //
    rf_searchForm   = this.formBuilder.group({
      _P_ROW_NUM          : ["999"         , Validators.required],
      _P_FECHA_INICIO     : ["2023-01-01"  , Validators.required],
      _P_FECHA_FIN        : ["2022-12-31"  , Validators.required],
    });
    //--------------------------------------------------------------------------
    // PROPIEADES - TEMPLATE FORMS
    //--------------------------------------------------------------------------
    //
    td_textStatus                      = signal<string>("");
    //
    td_formSubmit                      : boolean = false;
    //
    td_buttonCaption                   : string  = "[Buscar]";
    //
    td_buttonCaption_xls               : string  = "[Generar Excel]";
    //
    td_textStatus_xls                  = signal<string>("");
    //
    td_ExcelDownloadLink               : string  = "#";
    //
    td_dataSource                      = new MatTableDataSource<LogEntry>();
    //
    td_model                           = new SearchCriteria( 
      "1"
     ,"1"
     ,"999"
     ,"2022-09-01"
     ,"2022-09-30"
     ,""
     ,"");
    //
    @ViewChild("td_paginator" ,{read:MatPaginator}) td_paginator!:  MatPaginator;
    //
    @ViewChild('_languajeList')    _languajeList       : any;
    //
    public __languajeList                              : any;
    protected tituloListadoLenguajes                   : string = "[Backend] :";
    //
    public _loading                  = new BehaviorSubject<boolean>(false);
    public isListVisible             = false; // Initially hidden
    public toogleLisCaption: string  = "[Ver Referencias]";
    //--------------------------------------------------------------------------
    // EVENT HANDLERS FORMIULARIO 
    //--------------------------------------------------------------------------
    constructor(
                private backendService      : BackendService, 
                private formBuilder         : FormBuilder, 
                public  route               : ActivatedRoute,
                public  speechService       : SpeechService,
    ) 
    {
        // Define an effect to react to changes in the signal
        effect(() => {
          if (this.rf_textStatus())
              this.speechService.speakTextCustom(this.rf_textStatus());
        });
        // Define an effect to react to changes in the signal
        effect(() => {
          if (this.rf_textStatus_xls())
              this.speechService.speakTextCustom(this.rf_textStatus_xls());
          //console.log('Signal value changed:', this.status_message());
        });
        // Define an effect to react to changes in the signal
        effect(() => {
          if (this.td_textStatus())
              this.speechService.speakTextCustom(this.td_textStatus());
        });
        // Define an effect to react to changes in the signal
        effect(() => {
          if (this.td_textStatus_xls())
              this.speechService.speakTextCustom(this.td_textStatus_xls());
        });
    }
    //
    ngOnInit(): void {
        //
        this.speechService.speakTextCustom(this.pageTitle); 
        //
        this.queryParams();
        //
        this.rf_newSearch();
        this.td_newSearch();
    }
    //
    ngAfterViewInit():void {
    }
    //--------------------------------------------------------------------------
    // METODOS COMUNES 
    //--------------------------------------------------------------------------
    //
    toggleList() {
      this.isListVisible     = !this.isListVisible; // Toggle visibility
      this.toogleLisCaption  = !(this.isListVisible)? "[Ver Referencias]" : "[Ocultar Referencias]";
      if(this.isListVisible)
        this.speechService.speakTextCustom("Ver Referencia");
    }
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
          new _languageName(0, '(SELECCIONE OPCION..)', false,""),
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
            //console.log("search langName :" + langName );
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
    //--------------------------------------------------------------------------
    // METODOS REACTIVE FORMS 
    //--------------------------------------------------------------------------
    //
    rf_newSearch()
    {
        //
        console.warn("(NEW SEARCH RF)");
        //
        this.rf_dataSource           = new MatTableDataSource<LogEntry>();
        this.rf_dataSource.paginator = this.rf_paginator;
        //
        this.rf_searchForm   = this.formBuilder.group({
          _P_ROW_NUM          : ["999"         , Validators.required],
          _P_FECHA_INICIO     : ["2023-01-01"  , Validators.required],
          _P_FECHA_FIN        : ["2023-12-31"  , Validators.required],
        });
        //
        this.rf_buttonCaption     = "[Buscar]";
        //
        this.rf_formSubmit        = false;
        //
        this.rf_textStatus.set("");
        //
        this.rf_buttonCaption_xls               = "[Generar Excel]";
        //
        this.rf_textStatus_xls.set("");
        //
        this.rf_ExcelDownloadLink               = "#";
    }
    //
    rf_onSubmit() 
    {
        //
        console.warn("(SUBMIT 1)");
        //
        let _P_DATA_SOURCE_ID  : string = ""/*this.searchForm.value["_P_DATA_SOURCE_ID"] || ""*/;
        let _P_ID_TIPO_LOG     : string = ""/*this.searchForm.value["_P_ID_TIPO_LOG"]    || ""*/;
        let _P_ROW_NUM         : string = this.rf_searchForm.value["_P_ROW_NUM"]        || "";
        let _P_FECHA_INICIO    : string = this.rf_searchForm.value["_P_FECHA_INICIO"]   || "";      
        let _P_FECHA_FIN       : string = this.rf_searchForm.value["_P_FECHA_FIN"]      || "";

        //
        let _model  = new SearchCriteria( 
                                _P_DATA_SOURCE_ID
                              , _P_ID_TIPO_LOG
                              , _P_ROW_NUM
                              , _P_FECHA_INICIO
                              , _P_FECHA_FIN
                              , "","");
        //
        this.rf_formSubmit        = true;
        //
        this.rf_textStatus.set("");
        //
        if ((this.rf_searchForm.valid == true))
            this.rf_update(_model);
    }
    //
    rf_update(_searchCriteria : SearchCriteria):void {
      //
      this.rf_buttonCaption     = "[Buscando por favor espere]";
      //
      this.rf_formSubmit        = true;
      //
      let rf_informeLogRemoto!  : Observable<LogEntry[]>;
      //
      rf_informeLogRemoto       = this.backendService.getLogRemoto(_searchCriteria);
      //
      const logSearchObserver   = {
        //
        next: (p_logEntry: LogEntry[])     => { 
          //
          let recordCount : number  = p_logEntry.length;
          //
          this.rf_textStatus.set("Se encontraton [" + recordCount  + "] registros");
          //
          this.rf_dataSource           = new MatTableDataSource<LogEntry>(p_logEntry);
          this.rf_dataSource.paginator = this.rf_paginator;
          //
        },
        error: (err: Error) => {
          //
          console.error('Observer got an error: ' + err);
          //
          this.rf_textStatus.set("Ha ocurrido un error");
          //
          this.rf_buttonCaption     = "[Buscar]";
          //
          this.rf_formSubmit        = false;
        },       
        complete: ()        => {
          //
          //console.log('Observer got a complete notification');
          //
          this.rf_buttonCaption     = "[Buscar]";
          //
          this.rf_formSubmit        = false;
        },
      };
      //
      rf_informeLogRemoto
      .subscribe(logSearchObserver);
    }
    //
    rf_GenerarInformeXLSValidate():void{
      //
      this.rf_GenerarInformeXLSPost();
    };
    //
    rf_GenerarInformeXLSPost():void  {
      //
      //console.log("GENERAR EXCEL (RF) - POST");
      //
      let rf_excelFileName!                   : Observable<string>;
      //
      rf_excelFileName                        = this.backendService.getInformeExcel(this.rf_model);
      //
      this.rf_ExcelDownloadLink               = "#";
      //
      this.rf_buttonCaption_xls               = "[Generando por favor espere...]";
      //
      this.rf_textStatus_xls.set("Generando por favor espere");
      //
      const xlsObserver                       = {
        //
        next: (_excelFileName: string) => { 
          //
          //
          let urlFile                = UtilManager.DebugHostingContent(_excelFileName);
          //
          this.rf_ExcelDownloadLink  = `${this.backendService._baseUrlNetCore}/wwwroot/xlsx/${urlFile}`;
          //
          this.rf_textStatus_xls.set("[Descargar Excel]");
        },
        error   : (err: Error)  => {
          //
          console.error('Observer got an error: ' + err.cause);
          //
          console.error('Observer got an error: ' + err.message);
          //
          this.rf_buttonCaption_xls  = "[Ha ocurrido un error]";
          //
          this.rf_textStatus_xls.set("[Ha ocurrido un error]");
        },
        complete: () => {
          //
          this.rf_buttonCaption_xls  = "[Generar Excel]";
        },
      };
      //
      rf_excelFileName
      .subscribe(xlsObserver);
    }
    //--------------------------------------------------------------------------
    // METODOS REACTIVE FORMS 
    //--------------------------------------------------------------------------
    //
    td_newSearch() : void {
      //
      console.warn("(NEW SEARCH TD)");
      //
      this.td_dataSource           = new MatTableDataSource<LogEntry>();
      this.td_dataSource.paginator = this.rf_paginator;
      //
      this.td_model                  = new SearchCriteria( 
          "1"
         ,"1"
         ,"999"
         ,"2022-09-01"
         ,"2022-09-30"
         ,""
         ,"");
      //
      this.td_buttonCaption     = "[Buscar]";
      //
      this.td_formSubmit        = false;
      //
      this.td_textStatus.set("");
      //
      this.td_buttonCaption_xls               = "[Generar Excel]";
      //
      this.td_textStatus_xls.set("");
      //
      this.td_ExcelDownloadLink               = "#";
    }
    //
    td_valid_form() : boolean {
      return (     
             ( ( this.td_model.P_ROW_NUM        != "" ) && (this.td_model.P_ROW_NUM       !=  null) && (this.td_model.P_ROW_NUM      != "0") ) 
          && ( ( this.td_model.P_FECHA_INICIO   != "" ) && (this.td_model.P_FECHA_INICIO  !=  null) ) 
          && ( ( this.td_model.P_FECHA_FIN      != "" ) && (this.td_model.P_FECHA_FIN     !=  null) ) 
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
            this.td_update(this.td_model);
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
              this.td_buttonCaption = "[Favor espere...]";
              //
              this.td_textStatus.set("Favor espere...");
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
                  this.td_textStatus.set("Se encontraron [" + td_logEntry.length + "] registros ");
                  this.td_formSubmit           = false;
                },
                error           : (err: Error)      => {
                  //
                  console.error('TEMPLATE DRIVEN - (ERROR) : ' + JSON.stringify(err.message));
                  //
                  this.td_textStatus.set("Ha ocurrido un error. Favor intente de nuevo");
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Buscar]";
                },
                complete        : ()                => {
                  //
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Buscar]";
                },
              }; 
              //
              td_informeLogRemoto
              .subscribe(td_observer);
          break;
        case 2: // NODE.JS
              //
              this.td_buttonCaption = "[Favor espere...]";
              //
              this.td_textStatus.set("Favor espere");
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
                  this.td_textStatus.set("Se encontraron [" + td_logEntry_node_js_json.length + "] registros ");
                  this.td_formSubmit           = false;
                },
                error           : (err: Error)      => {
                  //
                  console.error('TEMPLATE DRIVEN - NODE.JS - (ERROR) : ' + JSON.stringify(err.message));
                  //
                  this.td_textStatus.set("Ha ocurrido un error. Favor intente de nuevo");
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Buscar]";
                },
                complete        : ()                => {
                  //
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Buscar]";
                },
              }; 
              //
              td_informeLogRemoto_NodeJs
              .subscribe(td_observer_node_js);
          break;
        case 3: // SPRINGBOOT / JAVA
              //
              this.td_buttonCaption = "[Favor espere...]";
              //
              this.td_textStatus.set("Favor espere");
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
                  this.td_textStatus.set("Se encontraron [" + td_logEntry_springboot_java_json.length + "] registros ");
                  this.td_formSubmit           = false;
                },
                error           : (err: Error)      => {
                  //
                  console.error('TEMPLATE DRIVEN - sprigboot/Java - (ERROR) : ' + JSON.stringify(err.message));
                  //
                  this.td_textStatus.set("Ha ocurrido un error. Favor intente de nuevo");
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Buscar]";
                },
                complete        : ()                => {
                  //
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Buscar]";
                },
              }; 
              //
              td_informeLogRemoto_SprinbBootJava
              .subscribe(td_observer_sprinbbootjava);
          break;
        case 4: // DJANGO     / PYTHON
          //
          this.td_buttonCaption = "[Favor espere...]";
          //
          this.td_textStatus.set("Favor espere");
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
              this.td_textStatus.set("Se encontraron [" + td_logEntry_python_django_json.length + "] registros ");
              this.td_formSubmit           = false;
            },
            error           : (err: Error)      => {
              //
              console.error('TEMPLATE DRIVEN - python/django - (ERROR) : ' + JSON.stringify(err.message));
              //
              this.td_textStatus.set("Ha ocurrido un error. Favor intente de nuevo");
              this.td_formSubmit           = false;
              this.td_buttonCaption        = "[Buscar]";
            },
            complete        : ()                => {
              //
              this.td_formSubmit           = false;
              this.td_buttonCaption        = "[Buscar]";
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
        this.td_GenerarInformeXLS(this.td_model);
    }
    td_GenerarInformeXLS(_searchCriteria : SearchCriteria)
    {
      //
      let td_excelFileName!                   : Observable<string>;
      //
      td_excelFileName                        = this.backendService.getInformeExcel(this.rf_model);
      //
      this.td_ExcelDownloadLink               = "#";
      //
      this.td_buttonCaption_xls               = "[Generando por favor espere...]";
      //
      this.td_textStatus_xls.set("Generando por favor espere.");
      //
      const xlsObserver                       = {
        //
        next: (_excelFileName: string) => { 
          //
          let urlFile                = UtilManager.DebugHostingContent(_excelFileName); 
          //
          this.td_ExcelDownloadLink  = `${this.backendService._baseUrlNetCore}/wwwroot/xlsx/${urlFile}`;
          //
          this.td_textStatus_xls.set("Descargar Excel");
        },
        error   : (err: Error)  => {
          //
          console.error('Observer got an error: ' + err.cause);
          //
          console.error('Observer got an error: ' + err.message);
          //
          this.td_buttonCaption_xls  = "[Ha ocurrido un error]";
          //
          this.td_textStatus_xls.set("[Ha ocurrido un error]");
        },
        complete: () => {
          //
          this.td_buttonCaption_xls  = "[Generar Excel]";
        },
      };
      //
      td_excelFileName
      .subscribe(xlsObserver);
    }
}


