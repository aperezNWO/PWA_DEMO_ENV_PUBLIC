import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable                                  } from 'rxjs';
import { _languageName                               } from 'src/app/_models/entityInfo.model';
import { UtilManager                                 } from 'src/app/_engines/util.engine';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { CustomErrorHandler } from 'src/app/app.component';

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
    protected lblStatus              : string = "";
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
    constructor(private backendService:BackendService, private customErrorHandler : CustomErrorHandler)
    {
        //
        backendService.SetLog(this.pageTitle,"PAGE_REGEX_DEMO");
    }
    //
    ngOnInit(): void {
        //
        console.log(AlgorithmRegExComponent.PageTitle + " - [INGRESANDO]");
        //
        //-----------------------------------------------------------------------------
        // LENGUAJES DE PROGRAMACION
        //-----------------------------------------------------------------------------
        this.__languajeList = new Array();
        //
        this.__languajeList.push( new _languageName(0,"(SELECCIONE OPCION..)",false));        
        this.__languajeList.push( new _languageName(1,"(.NET CORE/C#)",false));        
        this.__languajeList.push( new _languageName(2,"(.NET CORE/C++)",true));  
    }
    //
    ngAfterViewInit(): void {
      //
      console.log(AlgorithmRegExComponent.PageTitle + " - [INICIO VISUAL]");
      //
      this._GetXMLData();
    }
    ////////////////////////////////////////////////////////////////
    // METODOS    //////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    _GetXMLData():void {
        //
        console.log(AlgorithmRegExComponent.PageTitle + " - [GET XML DATA]");
        //
        let xmlInfo!  : Observable<string>;
        //
        xmlInfo       = this.backendService._GetXmlData();
        //
        this.lblStatus = "[..CARGANDO POR FAVOR ESPERERE...]"
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
                this.lblStatus = "[REINICIO EXITOSO]"
                //
                const utterance = new SpeechSynthesisUtterance( this.lblStatus );
                speechSynthesis.speak(utterance); 
                //
                this.pattern   = "";
            },
            error: (err: Error) => {
                //
                this.lblStatus = "[HA OCURRIDO UN ERROR]";
                //
                const utterance = new SpeechSynthesisUtterance( this.lblStatus );
                speechSynthesis.speak(utterance); 
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
        console.log(AlgorithmRegExComponent.PageTitle + " - [EVAL REGEX]");   
        //
        let selectedIndex   : number = this.tagSearch.nativeElement.options.selectedIndex;
        let tagSearchIndex  : number = this.tagSearch.nativeElement.options[selectedIndex].value;
        let tagSearchValue  : string = "";
        let textSearchValue : string = this.textSearch.nativeElement.value;
        //
        if (tagSearchIndex == 0) {
            //
            this.lblStatus = "FAVOR SELECCIONE UN [ELEMENTO A BUSCAR]";
            //
            return;
        }
        //
        if (textSearchValue == "") {
            //
            this.lblStatus = "FAVOR INGRESE UN VALOR EN EL CAMPO [CONTENIDO]";
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
                    //
                    console.log("REGEX. AMT OF MATCHES   : " + matchAmt);
                    //
                    console.log("REGEX. PATTERN          : " + this.pattern);
                    //----------------------------------------------------------------------
                    // CONFIGURA CONTROLES
                    //----------------------------------------------------------------------
                    //
                    this.mensajes.nativeElement.innerHTML = xmlHighlighted;
                    //
                    //$("#GetRegex").prop('disabled', true);
                    //
                    //$("#newSearch").prop('disabled', false);
                    //
                    //this.regExSearch.nativeElement.text   = pattern;
                    //
                    this.lblStatus = 'SE ENCONTRARON (' + matchAmt + ') COINCIDENCIAS';
                    //
                    const utterance = new SpeechSynthesisUtterance( this.lblStatus );
                    speechSynthesis.speak(utterance); 
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