import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { effect, signal                              } from '@angular/core';
import { ActivatedRoute                              } from '@angular/router';
import { Observable                                  } from 'rxjs';
import { _languageName                               } from 'src/app/_models/entity.model';
import { UtilManager                                 } from 'src/app/_engines/util.engine';
import { BackendService                              } from 'src/app/_services/BackendService/backend.service';
import { SpeechService                               } from 'src/app/_services/speechService/speech.service';

//
@Component({
  selector: 'app-algorithm-reg-ex',
  templateUrl: './algorithm-reg-ex.component.html',
  styleUrls: ['./algorithm-reg-ex.component.css']
})
//
export class AlgorithmRegExComponent implements OnInit, AfterViewInit {
    ////////////////////////////////////////////////////////////////
    // PROPERTIES //////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    //
    public static get PageTitle()      : string {
      return '[ALGORITMOS - EXPRESIONES REGULARES]';
    }
    //
    readonly  pageTitle              : string = AlgorithmRegExComponent.PageTitle;
    protected xmlData                : string = "";
    protected lblStatus              = signal<string>("");
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
    public isListVisible            = false; // Initially hidden
    public toogleLisCaption: string = "[Ver Referencias]";
    //
    constructor(private backendService: BackendService, 
                public  speechService : SpeechService,
                public  route         : ActivatedRoute)
    {
        //
        backendService.SetLog(this.pageTitle,"PAGE_REGEX_DEMO");
        //
        effect(() => {
        if (this.lblStatus())
            this.speechService.speakTextCustom(this.lblStatus());
        });
        //
        this.speechService.speakTextCustom(this.pageTitle);
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
    toggleList() {
        this.isListVisible     = !this.isListVisible; // Toggle visibility
        this.toogleLisCaption  = !(this.isListVisible)? "[Ver Referencias]" : "[Ocultar Referencias]";
        //
        (this.isListVisible)? this.speechService.speakTextCustom("[Ver Referencias]") : null;
    }
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
        this.lblStatus.set("[..CARGANDO POR FAVOR ESPERERE...]");
        //
        const xmlInfoObserver   = {
            //
            next: (_xmlData: string)     => { 
                //------------------------------------------------------------
                // OBTENER DATA
                //------------------------------------------------------------
                //
                console.warn(AlgorithmRegExComponent.PageTitle + ' - [GET XML DATA] - [RETURN VALUE] : ' + _xmlData.length);
                //
                this.xmlData = _xmlData;
                //-------------------------------------------------------------
                // CONFIGURAR CONTROLES
                //-------------------------------------------------------------
                //
                this.mensajes.nativeElement.innerHTML = this.xmlData;
                //
                this.lblStatus.set("[REINICIO EXITOSO]")                 
                //
                this.pattern   = "";
            },
            error: (err: Error) => {
                //
                this.lblStatus.set("[HA OCURRIDO UN ERROR]");
                //
                this.pattern   = "";
                //
                console.error(AlgorithmRegExComponent.PageTitle + ' - [GET XML DATA]- [error] : ' + err.message);
            },       
            complete: ()        => {
                //
                console.info(AlgorithmRegExComponent.PageTitle  + ' - [GET XML DATA]- [Observer got a complete notification]');
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
            this.lblStatus.set("FAVOR SELECCIONE UN [ELEMENTO A BUSCAR]") ;
            //
            return;
        }
        //
        if (textSearchValue == "") {
            //
            this.lblStatus.set("FAVOR INGRESE UN VALOR EN EL CAMPO [CONTENIDO]");
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
                console.warn(AlgorithmRegExComponent.PageTitle + ' - [EVAL REGEX] - [RETURN VALUE] : ' + data.length);
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
                    this.lblStatus.set('SE ENCONTRARON (' + matchAmt + ') COINCIDENCIAS');
                }
            },
            error: (err: Error) => {
                //
                console.error(AlgorithmRegExComponent.PageTitle + ' - [EVAL REGEX] - [error] : ' + err.message);
            },       
            complete: ()        => {
                //
                console.info(AlgorithmRegExComponent.PageTitle  + ' - [EVAL REGEX] - [Observer got a complete notification]');
                //
            },
        };
        //
        regExInfo.subscribe(regExInfoObserver);
    }
}