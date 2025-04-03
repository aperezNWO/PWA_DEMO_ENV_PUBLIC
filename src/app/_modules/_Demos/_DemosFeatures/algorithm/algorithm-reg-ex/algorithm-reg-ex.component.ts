import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute                              } from '@angular/router';
import { Observable                                  } from 'rxjs';
import { _languageName                               } from 'src/app/_models/entity.model';
import { UtilManager                                 } from 'src/app/_engines/util.engine';
import { BackendService                              } from 'src/app/_services/BackendService/backend.service';
import { SpeechService                               } from 'src/app/_services/speechService/speech.service';
import { BaseComponent                               } from 'src/app/_components/base/base.component';
import { ConfigService                               } from 'src/app/_services/ConfigService/config.service';
import { PAGE_ALGORITMOS_REGEX                       } from 'src/app/_models/common';

//
@Component({
  selector: 'app-algorithm-reg-ex',
  templateUrl: './algorithm-reg-ex.component.html',
  styleUrls: ['./algorithm-reg-ex.component.css']
})
//
export class AlgorithmRegExComponent extends BaseComponent implements OnInit, AfterViewInit {
    ////////////////////////////////////////////////////////////////
    // PROPERTIES //////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    protected xmlData                : string = "";
    protected pattern                : string = "";
    public    __languajeList         : any;
    public    tituloListadoLenguajes : string = "BACKEND";
    //
    @ViewChild('mensajes')        mensajes       : any;
    @ViewChild('tagSearch')       tagSearch      : any;
    @ViewChild('textSearch')      textSearch     : any;
    @ViewChild('regExSearch')     regExSearch    : any;
    @ViewChild('_languajeList')   _languajeList  : any;
    //
    constructor(public override configService : ConfigService,
                public override backendService: BackendService, 
                public override speechService : SpeechService,
                public override route         : ActivatedRoute)
    {
        //
        super(
                configService,
                backendService,
                route,
                speechService,
                PAGE_ALGORITMOS_REGEX
        );
    }
    //
    ngOnInit(): void {
        //
        this.queryParams();
    }
    //
    ngAfterViewInit(): void {
      //
      this._GetXMLData();
    }
    ////////////////////////////////////////////////////////////////
    // METODOS    //////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    //
    queryParams():void {
        //
        this.route.queryParams.subscribe(params => {
            //-----------------------------------------------------------------------------
            // LENGUAJES DE PROGRAMACION
            //-----------------------------------------------------------------------------
            this.__languajeList = new Array();
            //
            this.__languajeList.push( new _languageName(0,"(SELECCIONE OPCION..)",false ,""   ));        
            this.__languajeList.push( new _languageName(1,"(.NET CORE/C#)"       ,true  ,"CS" ));        
            this.__languajeList.push( new _languageName(2,"(.NET CORE/C++)"      ,false ,"CPP"));  
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
    _GetXMLData():void {
        //
        let xmlInfo!  : Observable<string>;
        //
        xmlInfo       = this.backendService._GetXmlData();
        //
        this.status_message.set("[..CARGANDO POR FAVOR ESPERERE...]");
        //
        const xmlInfoObserver   = {
            //
            next: (_xmlData: string)     => { 
                //------------------------------------------------------------
                // OBTENER DATA
                //------------------------------------------------------------
                //
                console.warn(this.pageTitle + ' - [GET XML DATA] - [RETURN VALUE] : ' + _xmlData.length);
                //
                this.xmlData = _xmlData;
                //-------------------------------------------------------------
                // CONFIGURAR CONTROLES
                //-------------------------------------------------------------
                //
                this.mensajes.nativeElement.innerHTML = this.xmlData;
                //
                this.status_message.set("[REINICIO EXITOSO]")                 
                //
                this.pattern   = "";
            },
            error: (err: Error) => {
                //
                this.status_message.set("[HA OCURRIDO UN ERROR]");
                //
                this.pattern   = "";
                //
                console.error(this.pageTitle + ' - [GET XML DATA]- [error] : ' + err.message);
            },       
            complete: ()        => {
                //
                console.info(this.pageTitle  + ' - [GET XML DATA]- [Observer got a complete notification]');
                //
            },
        };
        //
        xmlInfo.subscribe(xmlInfoObserver);
    }
    //
    GetRegex():void{
        //
        let selectedIndex   : number = this.tagSearch.nativeElement.options.selectedIndex;
        let tagSearchIndex  : number = this.tagSearch.nativeElement.options[selectedIndex].value;
        let textSearchValue : string = this.textSearch.nativeElement.value;
        //
        if (tagSearchIndex == 0) {
            //
            this.status_message.set("FAVOR SELECCIONE UN [ELEMENTO A BUSCAR]") ;
            //
            return;
        }
        //
        if (textSearchValue == "") {
            //
            this.status_message.set("FAVOR INGRESE UN VALOR EN EL CAMPO [CONTENIDO]");
            //
            return;
        }
        //
        let regExInfo!         : Observable<string>;
        //
        let _progLangId        : number = Number.parseInt(this._languajeList.nativeElement.value);
        //
        switch(_progLangId)    
        {
            case 0:  // (seleccione lenguaje...)
                  return;
            break;
            case 1 : // C#
                //
                regExInfo       = this.backendService._RegExEval(tagSearchIndex,textSearchValue);
            break;
            case 2: // C++
                //
                regExInfo       = this.backendService._RegExEval_CPP(tagSearchIndex,textSearchValue);
            break;
        }
        //
        let data      : any;
        //
        const regExInfoObserver   = {
            //
            next: (data: string)     => { 
                //------------------------------------------------------------
                // OBTENER DATA
                //------------------------------------------------------------
                //
                console.warn(this.pageTitle + ' - [EVAL REGEX] - [RETURN VALUE] : ' + data.length);
                //    
                let resultArray : string[] = data.split("|");
                //
                //
                if (resultArray.length > 0)
                {
                    //
                    let matchAmt       : string = resultArray[0];
                    //
                    let xmlHighlighted : string = resultArray[1];
                    //
                    this.pattern       = UtilManager.DebugHostingContent(resultArray[2]);
                    //----------------------------------------------------------------------
                    // CONFIGURA CONTROLES
                    //----------------------------------------------------------------------
                    //
                    this.mensajes.nativeElement.innerHTML = xmlHighlighted;
                    //
                    this.status_message.set('SE ENCONTRARON (' + matchAmt + ') COINCIDENCIAS');
                }
            },
            error: (err: Error) => {
                //
                console.error(this.pageTitle + ' - [EVAL REGEX] - [error] : ' + err.message);
            },       
            complete: ()        => {
                //
                console.info(this.pageTitle  + ' - [EVAL REGEX] - [Observer got a complete notification]');
                //
            },
        };
        //
        regExInfo.subscribe(regExInfoObserver);
    }
}