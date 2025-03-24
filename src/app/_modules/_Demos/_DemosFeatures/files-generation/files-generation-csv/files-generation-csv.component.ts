import { AfterViewInit, Component, effect, OnInit, ViewChild ,signal  } from '@angular/core';
import { FormBuilder, Validators                       } from '@angular/forms';
import { MatTableDataSource                            } from '@angular/material/table';
import { MatPaginator                                  } from '@angular/material/paginator';
import { BehaviorSubject, Observable                   } from 'rxjs';
import { PersonEntity, SearchCriteria, _languageName   } from 'src/app/_models/entity.model';
import { BackendService                                } from 'src/app/_services/BackendService/backend.service';
import { CustomErrorHandler                            } from 'src/app/app.component';
import { ActivatedRoute                                } from '@angular/router';
import { SpeechService                                 } from 'src/app/_services/speechService/speech.service';
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
    protected rf_textStatus            = signal<string>("");
    //
    rf_buttonCaption                   : string = "[Buscar]";
    //
    rf_formSubmit                      : boolean = false;
    //
    rf_buttonCaption_csv               : string  = "";
    //
    //rf_dataSource                      = new MatTableDataSource<PersonEntity>();
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
    // @ViewChild("rf_paginator" ,{read:MatPaginator}) rf_paginator!:  MatPaginator;
    @ViewChild('_languajeList')    _languajeList                 : any;
    //
    rf_searchForm   = this.formBuilder.group({
      _P_ROW_NUM          : ["999"         , Validators.required],
      _P_FECHA_INICIO     : ["2023-01-01"  , Validators.required],
      _P_FECHA_FIN        : ["2022-12-31"  , Validators.required],
    });
    //
    public _loading                 = new BehaviorSubject<boolean>(false);
    public isListVisible            = false; // Initially hidden
    public toogleLisCaption: string = "[Ver Referencias]";
    //--------------------------------------------------------------------------
    // EVENT HANDLERS FORMIULARIO 
    //--------------------------------------------------------------------------
    //
    constructor(public backendService       : BackendService, 
                public formBuilder          : FormBuilder, 
                public customErrorHandler   : CustomErrorHandler,
                public route                : ActivatedRoute,
                public speechService        : SpeechService) 
    {
      // Define an effect to react to changes in the signal
      effect(() => {
        if (this.rf_textStatus())
            this.speechService.speakTextCustom(this.rf_textStatus());
      });
      //
      this.speechService.speakTextCustom(this.pageTitle);
    }
    //
    ngOnInit(): void {
        //
        this.queryParams();
        //
        this.rf_newSearch();
    }
    //
    ngAfterViewInit():void {
        //
    }  
    //--------------------------------------------------------------------------
    // METODOS COMUNES 
    //--------------------------------------------------------------------------
    //
    toggleList() {
      this.isListVisible     = !this.isListVisible; // Toggle visibility
      this.toogleLisCaption  = !(this.isListVisible)? "[Ver Referencias]" : "[Ocultar Referencias]";
      if (this.isListVisible)
        this.speechService.speakTextCustom("Ver Referncias");
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
    SetCSVData():void
    {
        //
        this.rf_textStatus.set("Generando por favor espere...");
        //
        let selectedIndex: number = this._languajeList.nativeElement.options.selectedIndex; // (.NET CORE) POR DEFECTO
        //
        switch (selectedIndex)
        {
            case 1: // (.NET CORE)
                //
                let csv_informeLogRemoto!                 : Observable<string>;
                csv_informeLogRemoto                      = this.backendService.getInformeRemotoCSV();
                //
                const csv_observer = {
                  next: (csv_data: string)     => { 
                    //
                    let jsondata     = JSON.parse(csv_data);
                    //
                    let recordNumber = jsondata.length;
                    //
                    this.rf_textStatus.set("Se encontraton [" + recordNumber  + "] registros");
                    //
                    this.csv_dataSource           = new MatTableDataSource<PersonEntity>(jsondata);
                    this.csv_dataSource.paginator = this.csv_paginator;
                  },
                  error           : (err: Error)      => {
                    //
                    this.rf_textStatus.set("[Ha ocurrido un error]");
                    //
                    this.rf_buttonCaption = "[Buscar]";
                  },
                  complete        : ()                => {
                    //
                    this.rf_buttonCaption = "[Buscar]";
                  },
                }
                //
                csv_informeLogRemoto
                .subscribe(csv_observer);
            break;
            case 2: // NODE.JS
                //
                let csv_informeLogRemoto_NodeJS!                 : Observable<string>;
                csv_informeLogRemoto_NodeJS                      = this.backendService.getInformeRemotoCSV_NodeJS();
                //
                const csv_observer_node_js = {
                  next: (csv_data_node_js: string)     => { 
                    //
                    let csv_data_node_js_json =  JSON.parse(csv_data_node_js)['recordsets'][0];
                    //
                    let recordNumber = csv_data_node_js_json.length;
                    //
                    this.rf_textStatus.set("Se encontraton [" + recordNumber  + "] registros");
                    //
                    this.csv_dataSource           = new MatTableDataSource<PersonEntity>(csv_data_node_js_json);
                    this.csv_dataSource.paginator = this.csv_paginator;
                  },
                  error           : (err: Error)      => {
                    //
                    this.rf_textStatus.set("[Ha ocurrido un error]");
                    //
                    this.rf_buttonCaption = "[Buscar]";
                    //
                  },
                  complete        : ()                => {
                    //
                    this.rf_buttonCaption = "[Buscar]";
                  },
                };      
                //
                csv_informeLogRemoto_NodeJS
                .subscribe(csv_observer_node_js);
            break;          
            case 3: // SPRINGBOOT / JAVA
                // 
                let td_informeLogRemoto_SprinbBootJava!   : Observable<string>;
                td_informeLogRemoto_SprinbBootJava        = this.backendService.getPersonsSprinbBootJava();
                //
                const td_observer_sprinbbootjava = {
                  next: (td_persons_sprinbboot_java: string)     => { 
                    //
                    let td_persons_springboot_java_json   = JSON.parse(td_persons_sprinbboot_java);
                    //
                    this.rf_textStatus.set("Se encontraron [" + td_persons_springboot_java_json.length + "] registros ");
                    this.rf_formSubmit            = false;
                    //
                    this.csv_dataSource           = new MatTableDataSource<PersonEntity>(td_persons_springboot_java_json);
                    this.csv_dataSource.paginator = this.csv_paginator;
                  },
                  error           : (err: Error)      => {
                    //
                    console.error('TEMPLATE DRIVEN - sprigboot/Java - (ERROR) : ' + JSON.stringify(err.message));
                    //
                    this.rf_textStatus.set("Ha ocurrido un error. Favor intente de nuevo");
                    this.rf_formSubmit           = false;
                    this.rf_buttonCaption        = "[Buscar]";
                  },
                  complete        : ()                => {
                    //
                    this.rf_formSubmit           = false;
                    this.rf_buttonCaption        = "[Buscar]";
                  },
                }; 
                //
                td_informeLogRemoto_SprinbBootJava
                .subscribe(td_observer_sprinbbootjava);
            break;
            case 4: // DJANGO / PYTHON
                // 
                let td_Persons_DjangoPython!   : Observable<string>;
                td_Persons_DjangoPython        = this.backendService.getPersonsDjangoPython();
                //
                const td_observer_pythondjango = {
                  next: (td_persons_python_django: string)     => { 
                    //
                    let td_persons_django_pytnon_json   = JSON.parse(td_persons_python_django);
                    //
                    this.rf_textStatus.set("Se encontraron [" + td_persons_django_pytnon_json.length + "] registros ");
                    this.rf_formSubmit            = false;
                    //
                    this.csv_dataSource           = new MatTableDataSource<PersonEntity>(td_persons_django_pytnon_json);
                    this.csv_dataSource.paginator = this.csv_paginator;
                  },
                  error           : (err: Error)      => {
                    //
                    console.error('TEMPLATE DRIVEN - python/django - (ERROR) : ' + JSON.stringify(err.message));
                    //
                    this.rf_textStatus.set("Ha ocurrido un error. Favor intente de nuevo");
                    this.rf_formSubmit           = false;
                    this.rf_buttonCaption        = "[Buscar]";
                  },
                  complete        : ()                => {
                    //
                    this.rf_formSubmit           = false;
                    this.rf_buttonCaption        = "[Buscar]";
                  },
                }; 
                //
                td_Persons_DjangoPython
                .subscribe(td_observer_pythondjango);
            break;
            default:
            return;
       };
    } 
    //
    SetCSVLink()
    {
        //
        this.rf_textStatus.set("Generando por favor espere...");
        //
        let csv_link!                 : Observable<string>;
        csv_link                      = this.backendService.getCSVLink();
        //
        const csv_link_observer = {
          next: (p_csv_link: string)          => { 
            //
            let fileUrl        = this.backendService._baseUrlNetCore + p_csv_link;
            //
            let downloadLink_1 = fileUrl;
            //
            while (downloadLink_1.indexOf("\"") > -1) 
                downloadLink_1 = downloadLink_1.replace("\"", "");
            //
            this.downloadLink = downloadLink_1;
            //
            this.rf_textStatus.set("Se generó el archivo CSV correctamente");
          },
          error           : (err: Error)      => {
            //
            this.downloadCaption = "";
            //
            this.rf_textStatus.set("ha ocurrido un error generando archivo CSV");
          },
          complete        : ()                => {
            //
            this.downloadCaption = "[Donwload CSV]";
          },
        }
        //
        csv_link
        .subscribe(csv_link_observer);
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
        this.rf_searchForm   = this.formBuilder.group({
          _P_ROW_NUM          : ["999"         , Validators.required],
          _P_FECHA_INICIO     : ["2023-01-01"  , Validators.required],
          _P_FECHA_FIN        : ["2023-12-31"  , Validators.required],
        });
        //
        this.rf_buttonCaption       = "[Buscar]";
        //
        this.rf_formSubmit          = false;
        //
        this.rf_textStatus.set("");
        //
        this.rf_buttonCaption_csv   = "[Generar CSV]";
        //
        this.downloadCaption        = "";
        //
        this.downloadLink           = "";
        //
        this.csv_dataSource            = new MatTableDataSource<PersonEntity>();
        //
        this.csv_dataSource.paginator  = this.csv_paginator
        //
        this.isListVisible             = false;
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
      this.SetCSVData();
    }
}

