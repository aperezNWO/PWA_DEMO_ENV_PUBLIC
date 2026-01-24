import { AfterViewInit, Component, OnInit, ViewChild   } from '@angular/core';
import { FormBuilder, Validators                       } from '@angular/forms';
import { MatTableDataSource                            } from '@angular/material/table';
import { MatPaginator                                  } from '@angular/material/paginator';
import { ActivatedRoute                                } from '@angular/router';
import { BehaviorSubject, Observable                                    } from 'rxjs';
import { PersonEntity, SearchCriteria, _languageName   } from 'src/app/_models/entity.model';
import { BackendService                                } from 'src/app/_services/BackendService/backend.service';
import { CustomErrorHandler                            } from 'src/app/app.component';
import { SpeechService                                 } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { ConfigService                                 } from 'src/app/_services/__Utils/ConfigService/config.service';
import { PAGE_TITLE_LOG,PAGE_TITLE_NO_SOUND,PAGE_FILE_GENERATION_CSV   } from 'src/app/_models/common';
import { BaseReferenceComponent                                        } from 'src/app/_components/base-reference/base-reference.component';
//
@Component({
  selector: 'app-files-generation-csv',
  templateUrl: './files-generation-csv.component.html',
  styleUrls: ['./files-generation-csv.component.css'],
  providers : [
          { 
            provide : PAGE_TITLE_LOG, 
            useValue: PAGE_FILE_GENERATION_CSV 
          },
  ]
})
//
export class FilesGenerationCSVComponent extends BaseReferenceComponent implements OnInit, AfterViewInit {
    //
    public _loading                                     = new BehaviorSubject<boolean>(false);
    //
    public __languajeList                              : any;
    protected tituloListadoLenguajes                   : string = "[Backend] :";
    /*
      // Specify the `disabled` property at control creation time:
      form = new FormGroup({
        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
        last: new FormControl('Drew', Validators.required)
      });
    */
    //
    rf_searchForm   = this.formBuilder.group({
      _P_ROW_NUM          : [{value : '999'        ,  disabled : true }  , Validators.required],
      _P_FECHA_INICIO     : [{value : '2023-01-01' ,  disabled : true }  , Validators.required],
      _P_FECHA_FIN        : [{value : '2022-12-31' ,  disabled : true }  , Validators.required],
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
    // PROPIEADES - REACTIVE FORMS
    //--------------------------------------------------------------------------
    public csv_dataSource                          = new MatTableDataSource<PersonEntity>();
    // 
    public csv_displayedColumns                    : string[] = ['id_Column', 'ciudad','nombreCompleto'];
    //
    public downloadLink                            : string   = "";
    //
    public downloadCaption                         : string   = "[DOWNLOAD CSV]";
    //
    rf_buttonCaption                   : string = "[Search]";
    //
    rf_formSubmit                      : boolean = false;
    //
    rf_buttonCaption_csv               : string  = "";
    // 
    rf_displayedColumns                : string[] = ['id_Column', 'ciudad', 'nombreCompleto'];
    //
    @ViewChild("csv_paginator" ,{read:MatPaginator}) csv_paginator!:  MatPaginator;
    //--------------------------------------------------------------------------
    // EVENT HANDLERS FORMIULARIO 
    //--------------------------------------------------------------------------
    //
    constructor(
                public          formBuilder          : FormBuilder, 
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
                PAGE_TITLE_NO_SOUND,
          )
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
    SetCSVData():void
    {
        //
        this.status_message.set("Generating please wait...");
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
                    this.status_message.set("[" + recordNumber  + "] records found");
                    //
                    this.csv_dataSource           = new MatTableDataSource<PersonEntity>(jsondata);
                    this.csv_dataSource.paginator = this.csv_paginator;
                  },
                  error           : (err: Error)      => {
                    //
                    this.status_message.set("[An error ocurred]");
                    //
                    this.rf_buttonCaption = "[Search]";
                  },
                  complete        : ()                => {
                    //
                    this.rf_buttonCaption = "[Search]";
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
                    this.status_message.set("[" + recordNumber  + "] records found");
                    //
                    this.csv_dataSource           = new MatTableDataSource<PersonEntity>(csv_data_node_js_json);
                    this.csv_dataSource.paginator = this.csv_paginator;
                  },
                  error           : (err: Error)      => {
                    //
                    this.status_message.set("[An error ocurred]");
                    //
                    this.rf_buttonCaption = "[Search]";
                    //
                  },
                  complete        : ()                => {
                    //
                    this.rf_buttonCaption = "[Search]";
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
                    this.status_message.set("[" + td_persons_springboot_java_json.length + "] records found ");
                    this.rf_formSubmit            = false;
                    //
                    this.csv_dataSource           = new MatTableDataSource<PersonEntity>(td_persons_springboot_java_json);
                    this.csv_dataSource.paginator = this.csv_paginator;
                  },
                  error           : (err: Error)      => {
                    //
                    console.error('TEMPLATE DRIVEN - sprigboot/Java - (ERROR) : ' + JSON.stringify(err.message));
                    //
                    this.status_message.set("[An error ocurred]");
                    this.rf_formSubmit           = false;
                    this.rf_buttonCaption        = "[Search]";
                  },
                  complete        : ()                => {
                    //
                    this.rf_formSubmit           = false;
                    this.rf_buttonCaption        = "[Search]";
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
                    this.status_message.set("[" + td_persons_django_pytnon_json.length + "] records found ");
                    this.rf_formSubmit            = false;
                    //
                    this.csv_dataSource           = new MatTableDataSource<PersonEntity>(td_persons_django_pytnon_json);
                    this.csv_dataSource.paginator = this.csv_paginator;
                  },
                  error           : (err: Error)      => {
                    //
                    console.error('TEMPLATE DRIVEN - python/django - (ERROR) : ' + JSON.stringify(err.message));
                    //
                    this.status_message.set("[An error ocurred]");
                    this.rf_formSubmit           = false;
                    this.rf_buttonCaption        = "[Search]";
                  },
                  complete        : ()                => {
                    //
                    this.rf_formSubmit           = false;
                    this.rf_buttonCaption        = "[Search]";
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
        this.status_message.set("Generating please wait ...");
        //
        let csv_link!                 : Observable<string>;
        csv_link                      = this.backendService.getCSVLink();
        //
        const csv_link_observer = {
          next: (p_csv_link: string)          => { 
            //
            let fileUrl        = `${this.configService.getConfigValue('baseUrlNetCore')}${p_csv_link}`;
            //
            let downloadLink_1 = fileUrl;
            //
            while (downloadLink_1.indexOf("\"") > -1) 
                downloadLink_1 = downloadLink_1.replace("\"", "");
            //
            this.downloadLink = downloadLink_1;
            //
            this.status_message.set("CSV file genetated correctly");
          },
          error           : (err: Error)      => {
            //
            this.downloadCaption = "";
            //
            this.status_message.set("An error occured generating CSV file. Please try again");
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
          _P_ROW_NUM          : [{value : '999'        ,  disabled : true }  , Validators.required],
          _P_FECHA_INICIO     : [{value : '2023-01-01' ,  disabled : true }  , Validators.required],
          _P_FECHA_FIN        : [{value : '2022-12-31' ,  disabled : true }  , Validators.required],
        });
        //
        this.rf_buttonCaption       = "[Search]";
        //
        this.rf_formSubmit          = false;
        //
        this.status_message.set("");
        //
        this.rf_buttonCaption_csv   = "[Generate CSV]";
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
        let _P_DATA_SOURCE_ID  : string = "";
        let _P_ID_TIPO_LOG     : string = "";
        let _P_ROW_NUM         : string = this.rf_searchForm.value["_P_ROW_NUM"]        || "";
        let _P_FECHA_INICIO    : string = this.rf_searchForm.value["_P_FECHA_INICIO"]   || "";      
        let _P_FECHA_FIN       : string = this.rf_searchForm.value["_P_FECHA_FIN"]      || "";

        //
        this._model  = new SearchCriteria( 
                                _P_DATA_SOURCE_ID
                              , _P_ID_TIPO_LOG
                              , _P_ROW_NUM
                              , _P_FECHA_INICIO
                              , _P_FECHA_FIN
                              , "","");
        //
        this.rf_formSubmit        = true;
        //
        this.status_message.set("");
        //
        console.log('SEARCHING. VALID FORM: ' + this.rf_searchForm.valid);
        //
        //if ((this.rf_searchForm.valid == true))
            this.rf_update(this._model);
    }
    //
    rf_update(_searchCriteria : SearchCriteria):void {
      //
      this.rf_buttonCaption     = "[Searching please wait...]";
      //
      this.rf_formSubmit        = true;
      //
      this.SetCSVData();
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

