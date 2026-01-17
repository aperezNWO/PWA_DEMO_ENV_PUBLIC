import { AfterViewInit, Component, OnInit, ViewChild, effect, signal } from '@angular/core';
import { ActivatedRoute                                              } from '@angular/router';
import { Observable                                                  } from 'rxjs';
import { PAGE_ALGORITMOS_SORT, PAGE_TITLE_NO_SOUND,PAGE_TITLE_LOG    } from 'src/app/_models/common';
import { SortInfo, _languageName                                     } from 'src/app/_models/entity.model';
import { DrawEngine                                                  } from 'src/app/_engines/draw.engine';
import { BackendService                                              } from 'src/app/_services/BackendService/backend.service';
import { AlgorithmService                                            } from 'src/app/_services/AlgorithmService/algorithm.service';
import { SpeechService                                               } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { ConfigService                                               } from 'src/app/_services/__Utils/ConfigService/config.service';
import { BaseReferenceComponent                                      } from 'src/app/_components/base-reference/base-reference.component';

//
@Component({
  selector: 'app-algorithm-sort',
  templateUrl: './algorithm-sort.component.html',
  styleUrls: ['./algorithm-sort.component.css'],
  providers   : [
      { 
        provide : PAGE_TITLE_LOG, 
        useValue: PAGE_ALGORITMOS_SORT 
      },
  ]
})
//
export class AlgorithmSortComponent extends BaseReferenceComponent implements OnInit, AfterViewInit {
    ////////////////////////////////////////////////////////////////////////
    // VARIABLES
    ////////////////////////////////////////////////////////////////////////
    private   rectSize                                    : number = 10;
    public    lblStatus                                   = signal<string>("");
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
    public    GetSortLabel        : string   = "[SORT]"; 
    public    stringArray_        : string[] = [];
    public    __languajeList      : any;
    protected   drawEngine        : DrawEngine | undefined;
    //
    public override isListVisible            = false; // Initially hidden
    public override toogleLisCaption: string = "[See references]";
    //
    constructor(public  override  configService     : ConfigService,
                public  override  backendService    : BackendService, 
                public  override  route             : ActivatedRoute,
                public  override  speechService     : SpeechService,
                public  algorithmService            : AlgorithmService)
    {
        //
        super(configService,
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
        this.context = this.c_canvas.nativeElement.getContext("2d");
        //
        this.drawEngine = new DrawEngine(this.context,this.c_canvas,this.rectSize, this.screenSize)
        //
        this.drawEngine.DrawGrid();
        //
        this.GetNewSort();
    }
    //--------------------------------------------------------------------------
    // METODOS COMUNES 
    //--------------------------------------------------------------------------
    //
    queryParams():void {
        //
        this.route.queryParams.subscribe(params => {
            //-----------------------------------------------------------------------------
            // LENGUAJES DE PROGRAMACION
            //-----------------------------------------------------------------------------
            this.__languajeList = new Array();
            //
            this.__languajeList.push( new _languageName(0,"(CHOOSE OPTION OPCION...)",false ,""));        
            this.__languajeList.push( new _languageName(1,"(.NET Core/C#)"        ,true  ,"CS"));        
            this.__languajeList.push( new _languageName(2,"(.NET Core/C++)"       ,false ,"CPP")); 
            //
            let langName = params['langName'] ? params['langName'] : "" ;
            //
            //console.log("query param : " + langName);
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
    public GetSort()
    {
        //
        let selectedIndex   : number = this.SortAlgorithmList.nativeElement.options.selectedIndex;
        let p_sortAlgorith  : number = this.SortAlgorithmList.nativeElement.options[selectedIndex].value;
        //
        if (p_sortAlgorith == 0)
        {
            //
            this.status_message.set('PLEASE SELECT AN ALGORITHM');
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
                GetSortInfo           = this.algorithmService.getSort(p_sortAlgorith, p_unsortedList);            
            break;
            case 2: // C++
                //
                GetSortInfo           = this.algorithmService.getSort_CPP(p_sortAlgorith, p_unsortedList);            
            break;
        }
        //
        const GetSortInfoObserver   = {
            //
            next: (data: string)     => { 
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
                console.error(this.pageTitle + ' - [GETTING SORT] - [error] : ' + err.message);
                //
                this.status_message.set("An error occurred");
                //
                return false;
            },       
            complete: ()        => {
                //
                console.warn(this.pageTitle  + ' - [GETTING SORT] - [Observer got a complete notification]');
            },
        };
        //
        GetSortInfo.subscribe(GetSortInfoObserver);
    }    
    //
    public GetNewSort():void
    {
        //
        this.lblStatus.set("");
        //
        this.SortAlgorithmList.nativeElement.options.selectedIndex = 0;
        //
        this.stringMatrix              = [];
        //
        this.mensajes_1.nativeElement.innerHTML   = "...getting list...";
        //
        this.mensajes_2.nativeElement.innerHTML   = "...getting list...";
        //
        this.status_message.set("...getting list...");                                    
        //
        let randomVertexInfo!          : Observable<string>;
        //
        randomVertexInfo               = this.algorithmService.getNewSort();
        //
        const randomVertexObserver     = {
            //
            next: (sortInfo: string)     => { 
                //
                console.info(this.pageTitle + ' - [GETTING NEW SORT]  - RETURN VALUE : ' + sortInfo);
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
                console.error(this.pageTitle + ' - [GETTING NEW SORT] - [error] : ' + err.message);
                //
                this.status_message.set("An error occurred");
            },       
            complete: ()        => {
                //
                console.warn(this.pageTitle  + ' - [GETTING NEW SORT] - [Observer got a complete notification]');
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
        this.stringArray_            = this.mensajes.nativeElement.innerHTML.split("<br>");
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
        this.status_message.set("RESTART SUCCESSFUL");
        //
        this.GetSortLabel    = "[SORT]";
        //
        this.lblStatus.set("");
    }
    //
    DrawStep():void
    {
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
            this.status_message.set("LIST HAS BEEN SORTED CORRECTLY");
            //
            this.GetSortLabel     = "[SORT]";
            //
            return;
        }
        //
        if ((this.stringMatrix[this.indexDraw] == null) || (this.stringMatrix[this.indexDraw] != ''))
        {
            //
            this.lblStatus.set(`Step ${this.indexDraw} of ${this.stringMatrix.length-1}`);
            //
            let stringArray_past    : string[]   = (this.indexDraw == 1) ? this.stringArray_ : this.stringMatrix[this.indexDraw - 1].split(",") ;
            //
            let stringArray_current : string[]   = this.stringMatrix[this.indexDraw].split(",");
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
        this.GetSortLabel  = "[...sorting...]";
        //
        this.status_message.set("");
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