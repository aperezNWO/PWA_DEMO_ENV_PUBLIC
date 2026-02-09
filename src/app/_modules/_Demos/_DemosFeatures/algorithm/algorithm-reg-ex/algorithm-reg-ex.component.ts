import { AfterViewInit, Component, OnInit, ViewChild                 } from '@angular/core';
import { ActivatedRoute                                              } from '@angular/router';
import { Observable                                                  } from 'rxjs';
import { PAGE_ALGORITMOS_REGEX, PAGE_TITLE_LOG, PAGE_TITLE_NO_SOUND  } from 'src/app/_models/common';
import { _languageName                               } from 'src/app/_models/entity.model';
import { UtilManager                                 } from 'src/app/_engines/util.engine';
import { BackendService                              } from 'src/app/_services/BackendService/backend.service';
import { SpeechService                               } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { BaseComponent                               } from 'src/app/_components/base/base.component';
import { ConfigService                               } from 'src/app/_services/__Utils/ConfigService/config.service';
import { AlgorithmService                            } from 'src/app/_services/AlgorithmService/algorithm.service';

//
@Component({
  selector    : 'app-algorithm-reg-ex',
  templateUrl : './algorithm-reg-ex.component.html',
  styleUrls   : ['./algorithm-reg-ex.component.css'],
  providers   : [
      { 
        provide : PAGE_TITLE_LOG, 
        useValue: PAGE_ALGORITMOS_REGEX 
      },
  ]
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
    constructor(public override configService    : ConfigService,
                public override backendService   : BackendService, 
                public override speechService    : SpeechService,
                public override route            : ActivatedRoute,
                public          algorithmService : AlgorithmService)
    {
        //
        super(
                configService,
                backendService,
                route,
                speechService,
                PAGE_TITLE_NO_SOUND
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
            this.__languajeList.push( new _languageName(0,"(CHOOSE OPTION...)"   ,false ,""   ));        
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
        let xmlInfo!                        : Observable<string>;
        //
        xmlInfo                             = this.algorithmService._GetXmlData();
        //
        this.textSearch.nativeElement.value = "";
        //
        this.status_message.set("[...LOADING PLEASE WAIT...]");
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
                this.status_message.set("[RESTART SUCCESFUL]")                 
                //
                this.pattern   = "";
            },
            error: (err: Error) => {
                //
                this.status_message.set("[An error ocurred]");
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
        let _progLangId     : number = Number.parseInt(this._languajeList.nativeElement.value);
        //
        if (_progLangId == 0)
        {
            //
            this.status_message.set("PLEASE SELECT A LANGUAGE") ;
            //
            return;
        }
        //
        if (tagSearchIndex == 0) {
            //
            this.status_message.set("PLEASE SELECT AN ELEMENT TO SEARCH") ;
            //
            return;
        }
        //
        if (textSearchValue == "") {
            //
            this.status_message.set("PLEASE ENTER A VALUE IN THE FILED [CONTENT]");
            //
            return;
        }
        //
        let regExInfo!         : Observable<string>;
        //
        switch(_progLangId)    
        {
            case 0:  // (seleccione lenguaje...)
                  return;
            break;
            case 1 : // C#
                //
                regExInfo       = this.algorithmService._RegExEval(tagSearchIndex,textSearchValue);
            break;
            case 2: // C++
                //
                regExInfo       = this.algorithmService._RegExEval_CPP(tagSearchIndex,textSearchValue);
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
                    this.status_message.set('[' + matchAmt + '] MATCHES FOUND');
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