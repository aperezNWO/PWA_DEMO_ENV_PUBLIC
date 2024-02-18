import { AfterViewInit, Component, OnInit, ViewChild   } from '@angular/core';
import { FormBuilder, Validators                       } from '@angular/forms';
import { MatTableDataSource                            } from '@angular/material/table';
import { MatPaginator                                  } from '@angular/material/paginator';
import { LogEntry,SearchCriteria, _languageName        } from '../../../_models/entityInfo.model';
import { MCSDService                                   } from '../../../_services/mcsd.service';
import { CustomErrorHandler                            } from '../../../app.component';
import { UtilManager                                   } from 'src/app/_engines/util.engine';
import { PdfService                                    } from 'src/app/_engines/pdf.engine';
import { Observable                                    } from 'rxjs';
import { Chart, registerables                          } from 'chart.js';
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
    pdf_message                        : string = '';
    //
    rf_textStatus                      : string = "";
    //
    rf_buttonCaption                   : string = "[Buscar]";
    //
    rf_formSubmit                      : boolean = false;
    //
    rf_ExcelDownloadLink               : string  = "";
    //
    rf_buttonCaption_xls               : string  = "";
    //
    rf_textStatus_xls                  : string  = "";
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
    td_textStatus                      : string  = "";
    //
    td_formSubmit                      : boolean = false;
    //
    td_buttonCaption                   : string  = "[Buscar]";
    //
    td_buttonCaption_xls               : string  = "[Generar Excel]";
    //
    td_textStatus_xls                  : string  = "";
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
    protected tituloListadoLenguajes                   : string = "Seleccione Backend";
    //--------------------------------------------------------------------------
    // PROPIEDADES - ESTADISTICA
    //--------------------------------------------------------------------------
    //
    @ViewChild('canvas_xls')      canvas_xls     : any;
    //
    @ViewChild('divPieChart_XLS') divPieChart_xls : any;
    //
    public pieChartVar                            : any;
    //--------------------------------------------------------------------------
    // EVENT HANDLERS FORMIULARIO 
    //--------------------------------------------------------------------------
    constructor(private mcsdService: MCSDService, private formBuilder: FormBuilder, private customErrorHandler : CustomErrorHandler, public pdfService: PdfService) {
      //
      Chart.register(...registerables);
      //
    }
    //
    ngOnInit(): void {
        //
        console.log(this.pageTitle + "- [INGRESO]" );
        //
        this.rf_newSearch();
        this.td_newSearch();
        //
        this.SetChart();
    }
    //
    ngAfterViewInit():void {
        //-----------------------------------------------------------------------------
        // LENGUAJES DE PROGRAMACION
        //-----------------------------------------------------------------------------
        this.__languajeList = new Array();
        //
        this.__languajeList.push(
          new _languageName(0, '(SELECCIONE OPCION..)', false),
        );
        //
        this.__languajeList.push(new _languageName(1, '(.Net Core)'   , true  ));
        this.__languajeList.push(new _languageName(2, '(Node.js)'     , false ));
    }
    //--------------------------------------------------------------------------
    // METODOS COMUNES 
    //--------------------------------------------------------------------------
    //
    GetFormattedDate(p_date : /*Date*/ string, order : number) {
      //
      var today = '';
      switch (order) {
          case 0:  // FECHA COMPLATIBLE CON ORACLE
              var p_dates = p_date.toString().split('-'); // P_DATE   = 2022-04-09
              var day     = p_dates[2];
              var month   = p_dates[1];
              var year    = p_dates[0];
              today       = day + "/" + month + "/" + year;
              //
              break;
          case 1:  // FECHA COMPATIBLE  CON UIX
              //
              /*
              var _day      :number  = p_date.getDate();
              var _month    :number  = p_date.getMonth() + 1;
              var _yearStr  :string  = p_date.getFullYear().toString();
              var _monthStr :string  = "";
              var _dayStr   :string  = "";
              //
              if (_month < 10) _monthStr = "0"   + _month.toString();
              if (_day < 10)   _dayStr   = "0"   + _day.toString();
              //
              today                 = _yearStr  + "-" + _monthStr + "-" + _dayStr;*/
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
          //_P_DATA_SOURCE_ID   : ["1"           , Validators.required],
          //_P_ID_TIPO_LOG      : ["1"           , Validators.required],
          _P_ROW_NUM          : ["999"         , Validators.required],
          _P_FECHA_INICIO     : ["2023-01-01"  , Validators.required],
          _P_FECHA_FIN        : ["2023-12-31"  , Validators.required],
        });
        //
        console.log("(DEFAULT VALUES - INIT)");
        console.log("P_ROW_NUM         : " + (this.rf_searchForm.value["_P_ROW_NUM"]        || ""));
        console.log("P_FECHA_INICIO    : " + (this.rf_searchForm.value["_P_FECHA_INICIO"]   || ""));      
        console.log("P_FECHA_FIN       : " + (this.rf_searchForm.value["_P_FECHA_FIN"]      || "")); 
        console.log("(DEFAULT VALUES - END)");
        //
        this.rf_buttonCaption     = "[Buscar]";
        //
        this.rf_formSubmit        = false;
        //
        this.rf_textStatus        = "";
        //
        this.rf_buttonCaption_xls               = "[Generar Excel]";
        //
        this.rf_textStatus_xls                  = "";
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
        this.rf_textStatus        = "";
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
      rf_informeLogRemoto       = this.mcsdService.getLogRemoto(_searchCriteria);
      //
      const logSearchObserver   = {
        //
        next: (p_logEntry: LogEntry[])     => { 
          //
          console.log('Observer got a next value: ' + JSON.stringify(p_logEntry));
          //
          let recordCount : number  = p_logEntry.length;
          //
          this.rf_textStatus        = "Se encontraton [" + recordCount  + "] registros";
          //
          this.rf_dataSource           = new MatTableDataSource<LogEntry>(p_logEntry);
          this.rf_dataSource.paginator = this.rf_paginator;
          //
          // los botones se configuran en el evento "complete()".
        },
        error: (err: Error) => {
          //
          console.error('Observer got an error: ' + err);
          //
          this.rf_textStatus        = "Ha ocurrido un error";
          //
          this.rf_buttonCaption     = "[Buscar]";
          //
          this.rf_formSubmit        = false;
        },       
        complete: ()        => {
          //
          console.log('Observer got a complete notification');
          //
          this.rf_buttonCaption     = "[Buscar]";
          //
          this.rf_formSubmit        = false;
        },
      };
      //
      rf_informeLogRemoto.subscribe(logSearchObserver);
    }
    //
    rf_GenerarInformeXLSValidate():void{
      //
      this.rf_GenerarInformeXLSPost();
    };
    //
    rf_GenerarInformeXLSPost():void  {
      //
      console.log("GENERAR EXCEL (RF) - POST");
      //
      let rf_excelFileName!                   : Observable<string>;
      //
      rf_excelFileName                        = this.mcsdService.getInformeExcel(this.rf_model);
      //
      this.rf_ExcelDownloadLink               = "#";
      //
      this.rf_buttonCaption_xls               = "[Generando por favor espere...]";
      //
      this.rf_textStatus_xls                  = "[Generando por favor espere...]";
      //
      const xlsObserver                       = {
        //
        next: (_excelFileName: string) => { 
          //
          console.log('Observer got a next value: ' + _excelFileName);
          //
          let urlFile                = UtilManager.DebugHostingContent(_excelFileName);
          //
          this.rf_ExcelDownloadLink  = `${this.mcsdService._baseUrlNetCore}/wwwroot/xlsx/${urlFile}`;
          //
          this.rf_textStatus_xls     = "[Descargar Excel]";
        },
        error   : (err: Error)  => {
          //
          console.error('Observer got an error: ' + err.cause);
          //
          console.error('Observer got an error: ' + err.message);
          //
          this.rf_buttonCaption_xls  = "[Ha ocurrido un error]";
          //
          this.rf_textStatus_xls     = "[Ha ocurrido un error]";
        },
        complete: () => {
          //
          console.log('Observer got a complete notification')
          //
          this.rf_buttonCaption_xls  = "[Generar Excel]";
        },
      };
      //
      rf_excelFileName.subscribe(xlsObserver);
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
      console.log("(DEFAULT VALUES - INIT)");
      console.log("P_ROW_NUM         : " + this.td_model.P_ROW_NUM);
      console.log("P_FECHA_INICIO    : " + this.td_model.P_FECHA_INICIO);      
      console.log("P_FECHA_FIN       : " + this.td_model.P_FECHA_FIN); 
      console.log("(DEFAULT VALUES - END)");
      //
      this.td_buttonCaption     = "[Buscar]";
      //
      this.td_formSubmit        = false;
      //
      this.td_textStatus        = "";
      //
      this.td_buttonCaption_xls               = "[Generar Excel]";
      //
      this.td_textStatus_xls                  = "";
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
      console.log("(FROM PARAM) : P_DATA_SOURCE_ID                     : " + td_searchCriteria.P_DATA_SOURCE_ID);
      console.log("(FROM PARAM) : P_ROW_NUM                            : " + td_searchCriteria.P_ROW_NUM);  
      console.log("(FROM PARAM) : P_FECHA_INICIO (origen)              : " + td_searchCriteria.P_FECHA_INICIO);
      console.log("(FROM PARAM) : P_FECHA_FIN    (origen)              : " + td_searchCriteria.P_FECHA_FIN);  
      console.log("(FROM PARAM) : P_FECHA_INICIO (valid : 01/09/2022)  : " + td_searchCriteria.P_FECHA_INICIO_STR);
      console.log("(FROM PARAM) : P_FECHA_FIN    (valid : 30/09/2022)  : " + td_searchCriteria.P_FECHA_FIN_STR);
      console.log("(SEARCH INIT)");
      //
      let selectedIndex: number = this._languajeList.nativeElement.options.selectedIndex; // c++ by default
      //
      switch (selectedIndex) {
        case 1: // C#
              //
              this.td_buttonCaption = "[Favor espere...]";
              //
              this.td_textStatus    = "";
              // 
              let td_informeLogRemoto!                 : Observable<LogEntry[]>;
              //      
              td_informeLogRemoto                      = this.mcsdService.getLogRemoto(td_searchCriteria);
              //
              const td_observer = {
                next: (td_logEntry: LogEntry[])     => { 
                  //
                  console.log('TEMPLATE DRIVEN - RETURN VALUES (Record Count): ' + td_logEntry.length);
                  //
                  this.td_dataSource           = new MatTableDataSource<LogEntry>(td_logEntry);
                  this.td_dataSource.paginator = this.td_paginator;
                  //
                  this.td_textStatus           = "Se encontraron [" + td_logEntry.length + "] registros ";
                  this.td_formSubmit           = false;
                },
                error           : (err: Error)      => {
                  //
                  console.error('TEMPLATE DRIVEN - (ERROR) : ' + JSON.stringify(err.message));
                  //
                  this.td_textStatus           = "Ha ocurrido un error. Favor intente de nuevo";
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Buscar]";
                  //
                },
                complete        : ()                => {
                  //
                  console.log('TEMPLATE DRIVEN -  (SEARCH END)');
                  //
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Buscar]";
                },
              }; 
              //
              td_informeLogRemoto.subscribe(td_observer);
          break;
        case 2: // NODE.JS
              //
              this.td_buttonCaption = "[Favor espere...]";
              //
              this.td_textStatus    = "";
              // 
              let td_informeLogRemoto_NodeJs!   : Observable<string>;
              // 
              td_informeLogRemoto_NodeJs        = this.mcsdService.getLogRemotoNodeJS(td_searchCriteria);
              //
              const td_observer_node_js = {
                next: (td_logEntry_node_js: string)     => { 
                  //
                  console.log('TEMPLATE DRIVEN - NODE.JS - RETURN VALUES  : ' + td_logEntry_node_js);
                  //
                  let td_logEntry_node_js_json = JSON.parse(td_logEntry_node_js)['recordsets'][0];
                  //
                  console.log('TEMPLATE DRIVEN - NODE.JS - RETURN VALUE   : ' + td_logEntry_node_js_json);
                  //
                  this.td_dataSource           = new MatTableDataSource<LogEntry>(td_logEntry_node_js_json);
                  this.td_dataSource.paginator = this.td_paginator;
                  //
                  this.td_textStatus           = "Se encontraron [" + td_logEntry_node_js_json.length + "] registros ";
                  this.td_formSubmit           = false;
                },
                error           : (err: Error)      => {
                  //
                  console.error('TEMPLATE DRIVEN - NODE.JS - (ERROR) : ' + JSON.stringify(err.message));
                  //
                  this.td_textStatus           = "Ha ocurrido un error. Favor intente de nuevo";
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Buscar]";
                  //
                },
                complete        : ()                => {
                  //
                  console.log('TEMPLATE DRIVEN - NODE.JS -  (SEARCH END)');
                  //
                  this.td_formSubmit           = false;
                  this.td_buttonCaption        = "[Buscar]";
                },
              }; 
              //
              td_informeLogRemoto_NodeJs.subscribe(td_observer_node_js);
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
      console.log("GENERAR EXCEL (td) - POST");
      //
      let td_excelFileName!                   : Observable<string>;
      //
      td_excelFileName                        = this.mcsdService.getInformeExcel(this.rf_model);
      //
      this.td_ExcelDownloadLink               = "#";
      //
      this.td_buttonCaption_xls               = "[Generando por favor espere...]";
      //
      this.td_textStatus_xls                  = "[Generando por favor espere...]";
      //
      const xlsObserver                       = {
        //
        next: (_excelFileName: string) => { 
          //
          console.log('Observer got a next value: ' + _excelFileName);
          //
          let urlFile                = UtilManager.DebugHostingContent(_excelFileName); 
          //
          this.td_ExcelDownloadLink  = `${this.mcsdService._baseUrlNetCore}/wwwroot/xlsx/${urlFile}`;
          //
          this.td_textStatus_xls     = "[Descargar Excel]";
        },
        error   : (err: Error)  => {
          //
          console.error('Observer got an error: ' + err.cause);
          //
          console.error('Observer got an error: ' + err.message);
          //
          this.td_buttonCaption_xls  = "[Ha ocurrido un error]";
          //
          this.td_textStatus_xls     = "[Ha ocurrido un error]";
        },
        complete: () => {
          //
          console.log('Observer got a complete notification')
          //
          this.td_buttonCaption_xls  = "[Generar Excel]";
        },
      };
      //
      td_excelFileName.subscribe(xlsObserver);
    }
    //--------------------------------------------------------------------------
    // METODOS - ESTADISTICAS
    //--------------------------------------------------------------------------
    //
    SetChart():void {
      //
      console.log(FilesGenerationXLSComponent.PageTitle + " - [SET CHART]");
      //
      const statLabels          : string[]          = [];
      const statData            : Number[]          = [];
      const statBackgroundColor : string[]          = [];
      // 
      let td_informeLogStat!                 : Observable<string>;
      td_informeLogStat                      = this.mcsdService.getLogStatPOST();
      //
      const td_observer = {
        next: (td_logEntry: string)     => { 
          //
          let jsondata     = JSON.parse(JSON.stringify(td_logEntry));
          //
          let recordNumber = jsondata.length;
          //
          console.log('ESTADISTICA - (return): ' + recordNumber);
          //
          jsondata.forEach((element: JSON, index : number) => {
              //
              console.log(index + " " + JSON.stringify(element));
              //
              console.log("[SI-SPAE-WEB] - GET STAT - RESULT : index [" + index + "] value={"
              + jsondata[index]["pageName"]
              + "," + jsondata[index]["ipValue"] + "}");
                //
                statLabels.push(jsondata[index]["pageName"] + " - " + jsondata[index]["ipValue"]);
                statData.push(Number(jsondata[index]["ipValue"]));
                statBackgroundColor.push('rgb('
                    + (Number(jsondata[index]["ipValue"]) / 4) + ','
                    + (Number(jsondata[index]["ipValue"]) / 3) + ','
                    + (Number(jsondata[index]["ipValue"]) / 2) + ')');
          });
        },
        error           : (err: Error)      => {
          //
          console.error('ESTADISTICA- (ERROR) : ' + JSON.stringify(err.message));
          //
        },
        complete        : ()                => {
          //
          console.log('ESTADISTICA -  (SEARCH END)');
          //
          const data = {
            labels              : statLabels,
            datasets            : [{
                label           : 'CONTEO DE SESIONES',
                data            : statData,
                backgroundColor : statBackgroundColor,
                hoverOffset     : 4
            }]
          };
          //
          let context = this.canvas_xls.nativeElement.getContext('2d');
          //
          this.pieChartVar = new Chart(context, 
          {
                type    : 'bar',
                data    : data,
                options : {
                    responsive: true,
                    plugins   : {
                            legend      : {
                                position: 'top',
                            },
                            title       : {
                                display : true,
                                text    : 'CONTEO DE SESIONES'
                              }
                          }
                }
          });
        },
      };
      //
      td_informeLogStat.subscribe(td_observer);
    }   
    //--------------------------------------------------------------------------
    // METODOS - PDF
    //--------------------------------------------------------------------------
    //
    //
    GetPDF():void
    {
        //
        let fileName        = 'BAR CHART';
        let fileName_Output = '';
        //
        this.pdfService._GetPDF(
          this.pageTitle,
          this.canvas_xls,
          this.divPieChart_xls,
          fileName,
        ).subscribe(
        {
            next: (fileName:string) =>{
                //
                fileName_Output = fileName
            },
            error: (error : Error) => {
                //
                this.pdf_message   = 'ha ocurrido un error : ' + error.message;
            },
            complete: () => {
                //
                this.pdf_message   = `Se ha generado el archivo [${fileName_Output}]`;
            }
          }
        );
    }

}


