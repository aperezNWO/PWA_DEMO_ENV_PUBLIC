import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable                                  } from 'rxjs';
import { SortInfo, _languageName                     } from 'src/app/_models/common/entityInfo.model';
import { DrawEngine } from 'src/app/_engines/draw.engine';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { CustomErrorHandler } from 'src/app/app.component';
//
@Component({
  selector: 'app-algorithm-sort',
  templateUrl: './algorithm-sort.component.html',
  styleUrls: ['./algorithm-sort.component.css']
})
//
export class AlgorithmSortComponent implements OnInit, AfterViewInit {
    ////////////////////////////////////////////////////////////////////////
    // PROPIEDADES
    ////////////////////////////////////////////////////////////////////////
    public static get PageTitle()      : string {
      return '[ALGORITMOS - ORDENAMIENTO]';
    }
    ////////////////////////////////////////////////////////////////////////
    // VARIABLES
    ////////////////////////////////////////////////////////////////////////
    private   rectSize                                    : number = 10;
    readonly  pageTitle                                   : string = AlgorithmSortComponent.PageTitle;
    public    lblStatus                                   : string = "[STATUS]";
    public    tituloListadoLenguajes                      : string = "[BACKEND] : ";
    public    context                                     : any;
    @ViewChild('c_canvas') c_canvas                       : any;
    @ViewChild('mensajes') mensajes                       : any;
    @ViewChild('mensajes_1') mensajes_1                   : any;
    @ViewChild('mensajes_2') mensajes_2                   : any;
    @ViewChild('SortAlgorithmList') SortAlgorithmList     : any;
    @ViewChild('_languajeList')    _languajeList          : any;
    //
    private   screenSize          : number   = 250;
    private   delayInMilliseconds : number   = 500;
    public    stringMatrix        : string[] = [];
    private   indexDraw           : number   = 0;
    public    sortedArrayDecoded  : string   = "";
    private   arraySeparator      : string   = "|";
    public    GetSortLabel        : string   = "[ORDENAR]"; 
    public    stringArray_        : string[] = [];
    public    __languajeList      : any;
    protected   drawEngine        : DrawEngine | undefined;
    //
    constructor(private backendService: BackendService, private customErrorHandler: CustomErrorHandler)
    {
        //
        backendService.SetLog(this.pageTitle,"PAGE_SORT_BENCHAMRK_DEMO");
    }
    //
    ngOnInit(): void {
        //
        console.info(AlgorithmSortComponent.PageTitle + " - [INGRESO]");

        //-----------------------------------------------------------------------------
        // LENGUAJES DE PROGRAMACION
        //-----------------------------------------------------------------------------
        this.__languajeList = new Array();
        //
        this.__languajeList.push( new _languageName(0,"(SELECCIONE OPCION..)",false));        
        this.__languajeList.push( new _languageName(1,"(.NET Core/C#)"       ,false));        
        this.__languajeList.push( new _languageName(2,"(.NET Core/C++)"      ,true));    
    }
    //
    ngAfterViewInit(): void {
        //
        this.context = this.c_canvas.nativeElement.getContext("2d");
        //
        this.drawEngine = new DrawEngine(this.context,this.c_canvas,this.rectSize, this.screenSize)
        //
        this.drawEngine.DrawGrid();
        //
        this.GetNewSort();
    }
    //
    public GetSort()
    {
        //
        console.log(AlgorithmSortComponent.PageTitle + " - [GET SORT]" );
        //
        let selectedIndex   : number = this.SortAlgorithmList.nativeElement.options.selectedIndex;
        let p_sortAlgorith  : number = this.SortAlgorithmList.nativeElement.options[selectedIndex].value;
        //
        if (p_sortAlgorith == 0)
        {
            //
            this.lblStatus = ('FAVOR SELECCIONE UN ALGORITMO');
            //
            return;
        }
        //
        let _p_unsortedList   : string = this.mensajes.nativeElement.innerHTML;
        //
        while (_p_unsortedList.indexOf("<br>") != -1)
        {
            _p_unsortedList = _p_unsortedList.replace("<br>","|");
        }
        let p_unsortedList    : string = _p_unsortedList;
        //
        let GetSortInfo!      : Observable<string>;
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
                GetSortInfo           = this.backendService.getSort(p_sortAlgorith, p_unsortedList);            
            break;
            case 2: // C++
                //
                GetSortInfo           = this.backendService.getSort_CPP(p_sortAlgorith, p_unsortedList);            
            break;
        }
        //
        const GetSortInfoObserver   = {
            //
            next: (data: string)     => { 
                //
                console.info(AlgorithmSortComponent.PageTitle + ' - [GETTING SORT]  - RETURN VALUE : ' + data);
                //
                //-----------------------------------------------------------------------
                // CORREGIR DATOS DE MATRIZ PARA VISUALIZAR EN CANVAS
                //-----------------------------------------------------------------------
                //
                this.stringMatrix = data.split("■");
                //
                for (let index = 0; index < this.stringMatrix.length; index++)
                {
                    //
                    this.stringMatrix[index] = this.stringMatrix[index].replace("<br/>", "");
                    this.stringMatrix[index] = this.stringMatrix[index].replace("■"    , "");
                    //
                }
                //
                this.sortedArrayDecoded = this.stringMatrix[this.stringMatrix.length - 1]
                //
                for (let index = 0; index < this.stringMatrix.length; index++)
                {
                    //
                    while (this.stringMatrix[index].indexOf("<br/>") != -1)
                    {
                        //
                        this.stringMatrix[index] = this.stringMatrix[index].replace("<br/>", ",");
                    }
                    //
                    console.log('SORT_BENCHMARK . SORTED ARRAY : ' + index + ' : ' + this.stringMatrix[index]);
                }
                //-----------------------------------------------------------------------
                // DIBUJAR CUADRICULA
                //-----------------------------------------------------------------------
                //
                this.DrawStepMain();
                //
                return true;
            },
            error: (err: Error) => {
                //
                console.error(AlgorithmSortComponent.PageTitle + ' - [GETTING SORT] - [error] : ' + err.message);
                //
                this.lblStatus  = "[ha ocurrido un error]";
                //
                const utterance = new SpeechSynthesisUtterance( this.lblStatus );
                speechSynthesis.speak(utterance);  
                //
                return false;
            },       
            complete: ()        => {
                //
                console.warn(AlgorithmSortComponent.PageTitle  + ' - [GETTING SORT] - [Observer got a complete notification]');
            },
        };
        //
        GetSortInfo.subscribe(GetSortInfoObserver);
    }    
    //
    public GetNewSort():void
    {
        //
        console.log(AlgorithmSortComponent.PageTitle + " - [NEW SORT]" );  
        //
        this.SortAlgorithmList.nativeElement.options.selectedIndex = 0;
        //
        this.stringMatrix              = [];
        //
        this.mensajes_1.nativeElement.innerHTML   = "...obteniendo arreglo...";
        //
        this.mensajes_2.nativeElement.innerHTML   = "...obteniendo arreglo...";
        //
        this.lblStatus                            = "...obteniendo arreglo...";                                    
        //
        let randomVertexInfo!          : Observable<string>;
        //
        randomVertexInfo               = this.backendService.getNewSort();
        //
        const randomVertexObserver     = {
            //
            next: (sortInfo: string)     => { 
                //
                console.info(AlgorithmSortComponent.PageTitle + ' - [GETTING NEW SORT]  - RETURN VALUE : ' + sortInfo);
                //
                //-------------------------------------------------------------
                // CONFIGURA CONTROLES
                //-------------------------------------------------------------
                //
                this.mensajes.nativeElement.innerHTML   = sortInfo;
                //
                let sortInfo_1 : string = sortInfo;
                //
                while (sortInfo_1.indexOf("<br/>") != -1)
                {
                    //
                    sortInfo_1= sortInfo_1.replace("<br/>", this.arraySeparator);
                }
                //
                sortInfo_1 = sortInfo_1.trim();
                //
                this.mensajes_1.nativeElement.innerHTML = sortInfo_1;
                //
                this.mensajes_2.nativeElement.innerHTML = sortInfo_1;
                //
                this._ResetControls();
            },
            error: (err: Error) => {
                //
                console.error(AlgorithmSortComponent.PageTitle + ' - [GETTING NEW SORT] - [error] : ' + err.message);
                //
                this.lblStatus  = "[ha ocurrido un error]";
                //
                const utterance = new SpeechSynthesisUtterance( this.lblStatus );
                speechSynthesis.speak(utterance);  
            },       
            complete: ()        => {
                //
                console.warn(AlgorithmSortComponent.PageTitle  + ' - [GETTING NEW SORT] - [Observer got a complete notification]');
                //
            },
        };
        //
        randomVertexInfo.subscribe(randomVertexObserver);
    }
    //
    _ResetControls():void
    {
        //
        console.log(this.pageTitle   + ' [RESET CONTROLS] ');
        //
        this.stringArray_            = this.mensajes.nativeElement.innerHTML.split("<br>");
        //
        console.log('NUMBER ARRAY [CURRENT] : ' + this.stringArray_);
        //
        let numberArray  : SortInfo[] = []; 
        //
        this.stringArray_.forEach((element: string, index : number) => {    
            //
            let sortInfo  : SortInfo = new SortInfo(element, false);
            //
            numberArray.push(sortInfo);  
        });   
        //
        this.drawEngine?.DrawGrid();
        //
        this.drawEngine?.DrawRectangles(numberArray);
        //
        this.lblStatus       = "[REINICIO EXITOSO]";
        //
        this.GetSortLabel    = "[ORDENAR]";
    }
    //
    DrawStep():void
    {
        //
        console.log('SORT_BENCHMARK . DRAWING ARRAY : ' + this.indexDraw);
        //
        if (this.indexDraw >= this.stringMatrix.length)
        {
            //
            let _sortedArrayDecoded : string = this.sortedArrayDecoded;
            //
            while (_sortedArrayDecoded.indexOf("<br/>") != -1)
            {
                //
                _sortedArrayDecoded= _sortedArrayDecoded.replace("<br/>", this.arraySeparator);
            }
            //
            _sortedArrayDecoded                     = _sortedArrayDecoded.trim()
            //
            this.mensajes_2.nativeElement.innerHTML = _sortedArrayDecoded;
            //
            this.lblStatus        = "[SE ORDENO CORRECTAMENTE EL LISTADO]";
            //
            this.GetSortLabel     = "[...ordenado...]";
            //
            console.log('SORT_BENCHMARK . SORTED ARRAY : ' + _sortedArrayDecoded);
            //
            const utterance = new SpeechSynthesisUtterance( this.lblStatus );
            speechSynthesis.speak(utterance); 
            //
            return;
        }
        //
        if ((this.stringMatrix[this.indexDraw] == null) || (this.stringMatrix[this.indexDraw] != ''))
        {
            //
            this.lblStatus  = `Paso ${this.indexDraw} de ${this.stringMatrix.length-1}`;
            //
            let stringArray_past    : string[]   = (this.indexDraw == 1) ? this.stringArray_ : this.stringMatrix[this.indexDraw - 1].split(",") ;
            //
            console.log('NUMBER ARRAY [PAST]    : ' + stringArray_past);
            //
            let stringArray_current : string[]   = this.stringMatrix[this.indexDraw].split(",");
            //
            console.log('NUMBER ARRAY [CURRENT] : ' + stringArray_current);
            //
            let numberArray : SortInfo[] = []; 
            //
            stringArray_current.forEach((element: string, index : number) => {  
              //
              let swapStyle : boolean  = (stringArray_current[index] != stringArray_past[index]);  
              //
              let sortInfo  : SortInfo = new SortInfo(element, swapStyle);
              //
              numberArray.push(sortInfo);  
            });        
            //
            this.drawEngine?.DrawGrid();
            //
            this.drawEngine?.DrawRectangles(numberArray);
            //
            this.DrawArray();    
        }
        //
        this.indexDraw++;
        //
        setTimeout( () => {  this.DrawStep()   }, this.delayInMilliseconds);
    };
    //
    DrawStepMain():void
    {
        //
        this.indexDraw = 0;
        //
        this.GetSortLabel     = "[...ordenando...]";
        //
        console.log('SORT_BENCHMARK . DRAWING ARRAY INITIAL. index: ' + this.indexDraw + ',matrix length : : ' + this.stringMatrix.length);
        //
        this.DrawStep();
    }
    //
    DrawArray():void
    {
        let _sortedArrayDecoded : string = this.stringMatrix[this.indexDraw];
        //
        while (_sortedArrayDecoded.indexOf(",") != -1)
        {
            //
            _sortedArrayDecoded= _sortedArrayDecoded.replace(",", this.arraySeparator);
        }
        //
        this.mensajes_2.nativeElement.innerHTML = _sortedArrayDecoded.trim();
    }
}