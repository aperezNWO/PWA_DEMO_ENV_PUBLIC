import { AfterViewInit, Component, OnInit, ViewChild   } from '@angular/core';
import { FormBuilder, Validators                       } from '@angular/forms';
import { MatTableDataSource                            } from '@angular/material/table';
import { MatPaginator                                  } from '@angular/material/paginator';
import { Observable                                    } from 'rxjs';
import { MCSDService                                   } from '../../../_services/mcsd.service';
import { CustomErrorHandler                            } from '../../../app.module';
import { PersonEntity, SearchCriteria, _languageName   } from '../../../_models/entityInfo.model';
//
@Component({
  selector: 'app-files-generation-csv',
  templateUrl: './files-generation-csv.component.html',
  styleUrls: ['./files-generation-csv.component.css']
})
//
export class FilesGenerationCSVComponent implements OnInit, AfterViewInit {
    //--------------------------------------------------------------------------
    // PROPIEDADES COMUNES
    //--------------------------------------------------------------------------
    //
    public static get PageTitle()   : string {
      return '[GENERAR ARCHIVOS CSV]';
    }
    readonly pageTitle   : string = FilesGenerationCSVComponent.PageTitle;
    //--------------------------------------------------------------------------
    // PROPIEDADES - LISTADO
    //--------------------------------------------------------------------------
    public csv_dataSource                          = new MatTableDataSource<PersonEntity>();
    // 
    public csv_displayedColumns                    : string[] = ['id_Column', 'ciudad','nombreCompleto'];
    //
    public downloadLink                            : string   = "";
    //
    public downloadCaption                         : string   = "[DESCARGAR CSV]";
    //
    @ViewChild("csv_paginator" ,{read:MatPaginator}) csv_paginator!:  MatPaginator;
    //--------------------------------------------------------------------------
    // PROPIEADES - REACTIVE FORMS
    //--------------------------------------------------------------------------
    //
    rf_textStatus                      : string = "";
    //
    rf_buttonCaption                   : string = "[Buscar]";
    //
    rf_formSubmit                      : boolean = false;
    //
    rf_buttonCaption_csv               : string  = "";
    //
    rf_dataSource                      = new MatTableDataSource<PersonEntity>();
    // 
    rf_displayedColumns                : string[] = ['id_Column', 'ciudad', 'nombreCompleto'];
    //
    rf_model                           = new SearchCriteria( "1"
                                            ,"1"
                                            ,"999"
                                            ,"2023-01-01"
                                            ,"2023-12-31"
                                            ,""
                                            ,"");
    //
    public __languajeList                              : any;
    protected tituloListadoLenguajes                   : string = "[Backend]:";
    //
    @ViewChild("rf_paginator" ,{read:MatPaginator}) rf_paginator!:  MatPaginator;
    @ViewChild('_languajeList')    _languajeList                 : any;
    //
    rf_searchForm   = this.formBuilder.group({
      _P_ROW_NUM          : ["999"         , Validators.required],
      _P_FECHA_INICIO     : ["2023-01-01"  , Validators.required],
      _P_FECHA_FIN        : ["2022-12-31"  , Validators.required],
    });
    //--------------------------------------------------------------------------
    // EVENT HANDLERS FORMIULARIO 
    //--------------------------------------------------------------------------
    //
    constructor(public mcsdService: MCSDService, public formBuilder: FormBuilder, public customErrorHandler : CustomErrorHandler) {
      //
    }
    //
    ngOnInit(): void {
        //
        this.rf_newSearch();
        //
        console.log(FilesGenerationCSVComponent.PageTitle + " - [INGRESO]");
    }
    //
    ngAfterViewInit():void {
        //
        //-----------------------------------------------------------------------------
        // LENGUAJES DE PROGRAMACION
        //-----------------------------------------------------------------------------
        this.__languajeList = new Array();
        //
        this.__languajeList.push(
          new _languageName(0, '(SELECCIONE OPCION..)', false),
        );
        //
        this.__languajeList.push(new _languageName(1, '(.Net Core)'      , true));
        this.__languajeList.push(new _languageName(2, '(Node.js)'        , false));
    }
    //
    SetCSVData():void
    {
        //
        console.log(FilesGenerationCSVComponent.PageTitle + " - [SET CSV DATA]");
        //
        let selectedIndex: number = this._languajeList.nativeElement.options.selectedIndex; // (.NET CORE) POR DEFECTO
        //
        switch (selectedIndex)
        {
            case 1: // (.NET CORE)
                //
                let csv_informeLogRemoto!                 : Observable<string>;
                csv_informeLogRemoto                      = this.mcsdService.getInformeRemotoCSV();
                //
                const csv_observer = {
                  next: (csv_data: string)     => { 
                    //
                    console.log(FilesGenerationCSVComponent.PageTitle + " - [SET CSV DATA] - Return Values : [" + csv_data + "]");
                    //
                    let jsondata     = JSON.parse(csv_data);
                    //
                    let recordNumber = jsondata.length;
                    //
                    console.log(FilesGenerationCSVComponent.PageTitle + ' - [SET CSV DATA] - RecordNumber ' + recordNumber);
                    //
                    this.rf_textStatus        = "Se encontraton [" + recordNumber  + "] registros";
                    //
                    this.csv_dataSource           = new MatTableDataSource<PersonEntity>(jsondata);
                    this.csv_dataSource.paginator = this.csv_paginator;
                  },
                  error           : (err: Error)      => {
                    //
                    console.log(FilesGenerationCSVComponent.PageTitle + " - [SET CSV DATA] - Error : [" + err.message + "]");
                    //
                    this.rf_textStatus    = "[Ha ocurrido un error]";
                    //
                    this.rf_buttonCaption = "[Buscar]";
                  },
                  complete        : ()                => {
                    //
                    console.log(FilesGenerationCSVComponent.PageTitle + " - [SET CSV DATA] - [Search end]");
                    //
                    this.rf_buttonCaption = "[Buscar]";
                  },
                }
                //
                csv_informeLogRemoto.subscribe(csv_observer);
            break;
            case 2: // NODE.JS
                //
                let csv_informeLogRemoto_NodeJS!                 : Observable<string>;
                csv_informeLogRemoto_NodeJS                      = this.mcsdService.getInformeRemotoCSV_NodeJS();
                //
                const csv_observer_node_js = {
                  next: (csv_data_node_js: string)     => { 
                    //
                    console.log(FilesGenerationCSVComponent.PageTitle + " - [SET CSV DATA] - [NODE JS] - Return Values : [" + csv_data_node_js + "]");
                    //
                    let csv_data_node_js_json =  JSON.parse(csv_data_node_js)['recordsets'][0];
                    //
                    let recordNumber = csv_data_node_js_json.length;
                    //
                    console.log(FilesGenerationCSVComponent.PageTitle + ' - [SET CSV DATA] - [NODE JS] - RecordNumber ' + recordNumber);
                    //
                    this.rf_textStatus            = "Se encontraton [" + recordNumber  + "] registros";
                    //
                    this.csv_dataSource           = new MatTableDataSource<PersonEntity>(csv_data_node_js_json);
                    this.csv_dataSource.paginator = this.csv_paginator;

                  },
                  error           : (err: Error)      => {
                    //
                    console.log(FilesGenerationCSVComponent.PageTitle + " - [SET CSV DATA] - [NODE JS] - Error : [" + err.message + "]");
                    //
                    this.rf_textStatus    = "[Ha ocurrido un error]";
                    //
                    this.rf_buttonCaption = "[Buscar]";
                  },
                  complete        : ()                => {
                    //
                    console.log(FilesGenerationCSVComponent.PageTitle + " - [SET CSV DATA] - [NODE JS] - [Search end]");
                    //
                    this.rf_buttonCaption = "[Buscar]";
                  },
                };      
                //
                csv_informeLogRemoto_NodeJS.subscribe(csv_observer_node_js);
            break;          
        };
    } 
    //
    SetCSVLink()
    {
        //
        console.log(FilesGenerationCSVComponent.PageTitle + " - [SET CSV Link]");
        //
        let csv_link!                 : Observable<string>;
        csv_link                      = this.mcsdService.getCSVLink();
        //
        const csv_link_observer = {
          next: (p_csv_link: string)          => { 
            //
            let fileUrl        = this.mcsdService._baseUrlNetCore + p_csv_link;
            //
            let downloadLink_1 = fileUrl;
            //
            while (downloadLink_1.indexOf("\"") > -1) 
                downloadLink_1 = downloadLink_1.replace("\"", "");
            //
            this.downloadLink = downloadLink_1;
            //
            console.log(FilesGenerationCSVComponent.PageTitle + " - [SET CSV LINK] - DOWNLOAD LINK : [" + this.downloadLink + "]");
          },
          error           : (err: Error)      => {
            //
            console.log(FilesGenerationCSVComponent.PageTitle + " - [SET CSV LINK] - Error : [" + err.message + "]");
            //
            this.downloadCaption = "";
          },
          complete        : ()                => {
            //
            console.log(FilesGenerationCSVComponent.PageTitle + " - [SET CSV LINK] - [Search end]");
            //
            this.downloadCaption = "[Donwload CSV]";
          },
        }
        //
        csv_link.subscribe(csv_link_observer);
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
        this.rf_dataSource           = new MatTableDataSource<PersonEntity>();
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
        this.rf_buttonCaption       = "[Buscar]";
        //
        this.rf_formSubmit          = false;
        //
        this.rf_textStatus          = "";
        //
        this.rf_buttonCaption_csv   = "[Generar CSV]";
        //
        this.downloadCaption        = "";
        //
        this.downloadLink           = "";
        //
        this.csv_dataSource           = new MatTableDataSource<PersonEntity>();
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
      this.SetCSVData();
    }
}

