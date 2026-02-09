import { AfterViewInit, Component, OnInit, ViewChild,signal,effect       } from '@angular/core';
import { ActivatedRoute                                                  } from '@angular/router';
import { Observable                                                      } from 'rxjs';
import { _languageName, _vertexSize                                      } from 'src/app/_models/entity.model';
import { PAGE_ALGORITHMS_DIJKSTRA, PAGE_TITLE_LOG, PAGE_TITLE_NO_SOUND   } from 'src/app/_models/common';
import { UtilManager                                                } from 'src/app/_engines/util.engine';
import { BackendService                                             } from 'src/app/_services/BackendService/backend.service';
import { SpeechService                                              } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { ConfigService                                              } from 'src/app/_services/__Utils/ConfigService/config.service';
import { PdfService                                                 } from 'src/app/_services/__FileGeneration/pdf.service';
import { AlgorithmService                                           } from 'src/app/_services/AlgorithmService/algorithm.service';
import { BaseReferenceComponent                                     } from 'src/app/_components/base-reference/base-reference.component';


@Component({
  selector       : 'app-algorithm-dijkstra',
  templateUrl    : './algorithm-dijkstra.component.html',
  styleUrls      : ['./algorithm-dijkstra.component.css'],
  providers   : [
    { 
      provide : PAGE_TITLE_LOG, 
      useValue: PAGE_ALGORITHMS_DIJKSTRA 
    },
    ]
})
//
export class AlgorithmDijkstraComponent extends BaseReferenceComponent implements OnInit, AfterViewInit  {
  ////////////////////////////////////////////////////////////////
  // PROPERTIES //////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  protected vertexMax        : number = 9;
  protected rectSize         : number = 10;
  protected screenSize       : number = 250;
  protected strokeStyleCafe  : string = "#654321";
  protected strokeStyleVerde : string = "#006400";
  protected strokeStyleRed   : string = "#ff0000";
  protected tituloListadoDistancias: string = "";
  protected tituloListadoLenguajes : string = "[BACKEND] :";
  //
  @ViewChild('c_canvas')      c_canvas      : any;
  @ViewChild('divCanvas_Pdf') divCanvas_Pdf : any;
  protected _context                        : any;
  @ViewChild('_vertexSizeList')  _vertexSizeList     : any;
  @ViewChild('_sourcePointList') _sourcePointList    : any;
  @ViewChild('_distanceList')    _distanceList       : any;
  @ViewChild('_languajeList')    _languajeList       : any;
  //
  protected PointListHidden   : string = "";
  protected MatrixListHidden  : string = "";
  //
  public __vertexSizeList  : any;
  public __sourcePointList : any;
  public __distanceList    : any;
  public __languajeList    : any;
  // 
  public selectedIndex          : number  = 0;
  public selectedIndexLanguage  : number  = 0;
  //
  public getGraphIdle           : boolean = false;
  //
  ////////////////////////////////////////////////////////////////
  // EVENT HANDLERS //////////////////////////////////////////////  
  ////////////////////////////////////////////////////////////////
  constructor(public override configService      : ConfigService,
              public override backendService     : BackendService, 
              public override route              : ActivatedRoute,
              public override speechService      : SpeechService,
              public pdfService                  : PdfService,
              public algorithmService            : AlgorithmService, 
            ) 
  {
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
    this.DrawListItems();
    //
    this.DrawDistanceList(true, "");
  }
  //
  ngAfterViewInit():void { 
    //
    this._context = this.c_canvas.nativeElement.getContext('2d');
    //    
    this._ResetControls();
  };
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
      this.__languajeList.push(
        new _languageName(0, '(CHOOSE OPTION...)', false,""),
      );
      //
      this.__languajeList.push(new _languageName(1, '(.Net Core   / C#)'             , false ,"CS" ));
      this.__languajeList.push(new _languageName(2, '(.Net Core   / C++)'            , false ,"CPP" ));
      this.__languajeList.push(new _languageName(3, '(SpringBoot  / Java)'           , false ,"JAVA" ));
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
  public _distanceListChange():void 
  {
    //
    this.selectedIndex           = this._distanceList.nativeElement.options.selectedIndex;
    let distanceListVal : string = this._distanceList.nativeElement.options[this.selectedIndex].text;
    //
    if (distanceListVal != "0")
    {
        //
        var pointList         = this.PointListHidden.split("|");
        var matrixList        = this.MatrixListHidden.split("|");
        //
        this.DrawGrid();
        //
        this.DrawPoints(pointList, this.strokeStyleCafe);
        //
        this.DrawLines(pointList, matrixList, this.strokeStyleVerde, false);
        //
        let distenceListItems = distanceListVal.split("-");
        let path              = distenceListItems[2];
        //
        if (path != "")
        { 
            //
            while (path.indexOf(";") != -1)
            {
                path = path.replace(";", ",");
            }
            //
            let selectedPoints  : string[]  = path.split("≡");
            let emptyPoints     : string[]  = new Array(pointList.length);
            //
            for (let index = 0; index < pointList.length; index++)
            {
                emptyPoints[index] = "[0,0]";
            }
            //
            for (let index_y = 0; index_y < selectedPoints.length; index_y++)
            { 
                if  (selectedPoints.length > 0)
                {
                    //
                    let selectedPointsVal : string[] = selectedPoints[index_y].replace("[", "").replace("]", "").split(",");
                    //
                    if  (selectedPointsVal.length > 0)
                    { 
                      //
                      let coordSource    : number   = Number.parseInt(selectedPointsVal[0]);
                      var coordDest      : number   = Number.parseInt(selectedPointsVal[1]);
                      //
                      emptyPoints[coordSource] = pointList[coordSource];
                      emptyPoints[coordDest]   = pointList[coordDest];
                    }
                }
            }
            // DRAW SHORTEST PATH
            this.DrawLines(emptyPoints, matrixList, this.strokeStyleRed   , true);
        }
    }
  };
  ////////////////////////////////////////////////////////////////
  // METODOS BOTONES /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  //
  public _ResetControls():void
  {
      //
      this.getGraphIdle            = false;
      //
      this.tituloListadoDistancias = "";
      //[x]
      this.DrawListItems();
      //[x]
      this.DrawDistanceList(true, "");
      //[x]
      this.PointListHidden  = "";
      //[x]
      this.MatrixListHidden = "";
      //
      this.status_message.set("");
      //[X]
      this.DrawGrid();
      //
      this.status_message.set(`[Graph reseted correctly]`);
  };
  // 
  _GetGraph():void
  {
        //
        let _vertexSize         : number = Number.parseInt(this._vertexSizeList.nativeElement.value);
        let _sourcePoint        : number = Number.parseInt(this._sourcePointList.nativeElement.value);
        this.getGraphIdle                = true;
        //
        let randomVertexInfo!  : Observable<string>;
        //
        let _progLangId        : number = Number.parseInt(this._languajeList.nativeElement.value);
        //
        this.status_message.set('[Generating graph. Please wait...]');
        //
        switch(_progLangId)    
        {
            case 0:   // (SELECT LANGUAGE...)
                  return;
            break;
            case 1 :  // c#
              randomVertexInfo       = this.algorithmService.getRandomVertex(_vertexSize,_sourcePoint);
            break;
            case 2:   // c++
              randomVertexInfo       = this.algorithmService.getRandomVertexCpp(_vertexSize,_sourcePoint);
            break;
            case 3:   // springboot
              randomVertexInfo       = this.algorithmService.getRandomVertexSpringBoot(_vertexSize,_sourcePoint);
            break;
        }
        //
        const randomVertexObserver   = {
            //
            next: (randomVertexInfo: string)     => { 
                //
                const regex_1 = /&#x25A0;/g;
                //
                const regex_2 = /&#x2261;/g;
                //
                let data_1    = randomVertexInfo;
                //
                let data_2    = data_1.replace(regex_1, "■");
                //
                let data_3    = data_2.replace(regex_2, "≡");
                //
                console.warn(this.pageTitle + ' - [GETTING VERTEX VALUES]  - RETURN VALUE : ' + data_3);
                //------------------------------------------------------------
                // OBTENER PUNTOS
                //------------------------------------------------------------
                //
                let dataArray = data_3.split("■");
                //
                var pointsString = dataArray[0];
                //
                this.PointListHidden    = pointsString;
                //
                let pointArray      : string[] = pointsString.split('|');
                //
                this.DrawPoints(pointArray, this.strokeStyleCafe);
                //-------------------------------------------------------------
                // OBTENER MATRIZ - DIBUJAR LINEAS
                //-------------------------------------------------------------
                //
                let matrixString = dataArray[1];
                //
                ////console.log('MATRIX : ' + matrixString);
                //
                let matrixArray  = matrixString.split('|');
                //
                this.MatrixListHidden = matrixString;
                //
                this.DrawLines(pointArray, matrixArray, this.strokeStyleVerde, new Boolean(false));
                //-------------------------------------------------------------
                // OBTENER VERTICES DE DISTANCIAS
                //-------------------------------------------------------------
                var vertexString = dataArray[2];
                //-------------------------------------------------------------
                // CONFIGURA CONTROLES
                //-------------------------------------------------------------
                //
                let _sourcePoint        : number = Number.parseInt(this._sourcePointList.nativeElement.value);
                this.tituloListadoDistancias     = "DISTANCE FROM [" + _sourcePoint.toString() + "]:";
                //
                this.status_message.set("[Graph generated correctly]");
                //
                this.DrawDistanceList(false,vertexString);
            },
            error: (err: Error) => {
                //
                console.error(this.pageTitle + ' - [GETTING VERTEX VALUES] - [error] : ' + err.message);
                //
                this._ResetControls();
                //
                this.status_message.set('[An error occured. Please try again]');
            },       
            complete: ()        => {
                //
                console.warn(this.pageTitle + ' - [GETTING VERTEX VALUES] - [Observer got a complete notification]');
            },
        };
        //
        randomVertexInfo.subscribe(randomVertexObserver);
  }
  ////////////////////////////////////////////////////////////////
  // METODOS GRAFICOS/////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  DrawGrid():void
  {
      //
      //console.log(AlgorithmDijkstraComponent.PageTitle + ' - [DRAWING GRID]');
      //
      this._context.clearRect(0, 0, this.c_canvas.nativeElement.width, this.c_canvas.nativeElement.height);
      this._context.beginPath();
      //
      for (var x = 0.5; x < 501; x += this.rectSize) {
        this._context.moveTo(x, 0);
        this._context.lineTo(x, 381);
      }
      //
      for (var y = 0.5; y < 381; y += this.rectSize) {
        this._context.moveTo(0, y);
        this._context.lineTo(500, y);
      }
      //
      this._context.strokeStyle = "#cccccc";
      this._context.stroke();
      //
  }
  //
  DrawPoint(pointName : string, x : number, y : number, strokeStyle : string) : void {
    //--------------------------
    // Escalar coordenadas
    //--------------------------
    x = x * this.rectSize;
    y = y * this.rectSize;
    //-------------------
    // Linea vertical
    //-------------------
    this._context.setLineDash([]);//*linea continua*
    this._context.beginPath();
    this._context.moveTo(x, (this.screenSize - y) - (this.rectSize / 2));
    this._context.lineTo(x, (this.screenSize - y) + (this.rectSize / 2));
    this._context.strokeStyle = strokeStyle;
    this._context.stroke();
    //-------------------
    // Linea horizontal
    //-------------------
    this._context.setLineDash([]);//*linea continua*
    this._context.beginPath();
    this._context.moveTo(x - (this.rectSize / 2), (this.screenSize - y));
    this._context.lineTo(x + (this.rectSize / 2), (this.screenSize - y));
    this._context.strokeStyle = strokeStyle;
    this._context.stroke();
    //-------------------
    // Nombre del Punto
    //-------------------
    var fullPointName = pointName + "(" + (x / this.rectSize) + "," + (y / this.rectSize) + ")";
    this._context.font      = "x-small Arial";
    this._context.fillText(fullPointName, (x + (this.rectSize / 2)), (this.screenSize - y));
    //
  }
  //
  DrawPoints(points : string [], strokeStyle : string) : void {
    //
    let index  : number;
    //
    for (index = 0; index < points.length; index++) {
        //
        let coordinates    : string = "";
        coordinates        = points[index];
        coordinates        = coordinates.replace('[', '');
        coordinates        = coordinates.replace(']', '');
        //
        let coordinateArray = coordinates.split(',');
        let coordinate_x    : number = Number.parseInt(coordinateArray[0]);
        let coordinate_y    : number = Number.parseInt(coordinateArray[1]);
        //
        this.DrawPoint(index.toString(), coordinate_x, coordinate_y, strokeStyle);
    }
  }
  //
  DrawLine(x1 : number, y1 : number, x2 : number, y2 : number):void {
    //--------------------------
    // Escalar coordenadas
    //--------------------------
    x1 = x1 * this.rectSize;
    x2 = x2 * this.rectSize;
    y1 = y1 * this.rectSize;
    y2 = y2 * this.rectSize;
    //--------------------------
    // Ajustar coordenada y
    //--------------------------
    var _y1 = (this.screenSize - y1);
    var _y2 = (this.screenSize - y2);
    //--------------------------
    // Dibujar Linea
    //--------------------------
    this._context.moveTo(x1, _y1);
    this._context.lineTo(x2, _y2);
  }
  //
  DrawLines(pointArray : string[], matrixArray : string[], strokeStyle : string, drawingSubSet : Boolean) : void {
    //--------------------------------------------------------------------------
    // CREAR MATRIZ
    //--------------------------------------------------------------------------
    //
    // MATRIX : {0,16,0,0,0,0,0,0,0}|{16,0,21,0,0,12,0,18,0}|{0,21,0,0,18,0,10,0,19}|{0,0,0,0,20,2,5,0,0}|{0,0,18,20,0,19,0,4,0}|{0,12,0,2,19,0,5,17,0}|{0,0,10,5,0,5,0,0,0}|{0,18,0,0,4,17,0,0,2}|{0,0,19,0,0,0,0,2,0}
    //
    let pointArrayMaster : string [] = this.PointListHidden.split("|");
    let matrix           = new Array(matrixArray.length);
    let index            : number; 
    //
    for (index = 0; index < matrixArray.length; index++) {
        //
        matrix[index] = new Array(matrixArray.length);
    }
    //
    let _index_x : number;
    let _index_y : number;
    //
    for (_index_x = 0; _index_x < matrixArray.length; _index_x++) {
        //
        var matrixLine = matrixArray[_index_x].replace("{", "").replace("}", "").split(",");
        //
        for (_index_y = 0; _index_y < matrixLine.length; _index_y++) {
            //
            var pointValue = matrixLine[_index_y];
            //
            matrix[_index_x][_index_y] = pointValue;
            //
        }
    }
    //--------------------------------------------------------------------------
    // RECORRER MATRIZ
    //--------------------------------------------------------------------------
    //
    this._context.setLineDash([]);// *linea continua*
    this._context.beginPath();
    //
    let index_x : number;
    let index_y : number;
    //
    for (index_x = 0; index_x < matrixArray.length; index_x++) {
        //
        for (index_y = (index_x + 1); index_y < matrixArray.length; index_y++) {
            //
            let pointValue = matrix[index_x][index_y];
            //
            // POINTS  : [11,7]|[3,21]|[22,11]|[13,19]|[8,0]|[15,18]|[12,14]|[6,3]|[4,4]
            //
            if (pointValue != "0") {
                //
                var pointSource = pointArray[index_x].replace("[", "").replace("]", "").split(",");
                var pointDest   = pointArray[index_y].replace("[", "").replace("]", "").split(",");;
                //
                var x1 = parseInt(pointSource[0]);
                var y1 = parseInt(pointSource[1]);
                var x2 = parseInt(pointDest[0]);
                var y2 = parseInt(pointDest[1]);
                //-----------------------------------------------------------------
                // SI ES UN SUBCONJUNTO DE LINEAS, COMPARAR ARREGLO CON MAESTRO
                //-----------------------------------------------------------------
                //
                var drawLine = true;
                //
                if (drawingSubSet == true)
                {
                    if (pointArray[index_x] != pointArrayMaster[index_x])
                        drawLine = false;

                    if (pointArray[index_y] != pointArrayMaster[index_y])
                        drawLine = false;    
                }    

                //
                if (drawLine == true)
                    this.DrawLine(x1, y1, x2, y2);
            }
        }
    }
    //
    this._context.strokeStyle = strokeStyle;
    this._context.stroke();
  }
  //
  DrawDistanceList(clearItems : boolean, Items : string) : void {
    //
    this.__distanceList = new Array();
    //
    if (clearItems == false)
    {
        //
        let _vertexSizeInitial : _vertexSize = new _vertexSize(0,"(SELECT DISTANCE)");
        this.__distanceList.push(_vertexSizeInitial);
        //
        let stringItems : string[] = Items.split("<br/>");
        //
        for (var index = 0; index < stringItems.length; index++)
        {
            // EJEMPLO
            // 01&lt;[14;2]&gt;-26-(0; 7)(7; 6)(6; 1)
            // 01<[14;2]>;-26-(0; 7)(7; 6)(6; 1)
            //
            let stringItem : string = "";
            //
            stringItem              = stringItems[index].replace("&lt;", "<").replace("&gt;", ">");
            stringItem              = UtilManager.DebugHostingContent(stringItem);
            //
            let _vertexBody : _vertexSize = new _vertexSize((index + 1),stringItem);
            this.__distanceList.push(_vertexBody);
        }
    }
  }
  //
  DrawListItems():void
  {
    //-----------------------------------------------------------------------------
    // TAMAÑO DE VERTICE
    //-----------------------------------------------------------------------------
    var vertexMaxString = new String(this.vertexMax);
    //
    this.__vertexSizeList = new Array();
    //
    for (var index = this.vertexMax; index >= 1; index--) {
        //
        let vertexSize : _vertexSize = new _vertexSize(index,index.toString());
        //
        this.__vertexSizeList.push(vertexSize);
    }
    //-----------------------------------------------------------------------------
    // PUNTO DE ORIGEN
    //-----------------------------------------------------------------------------
    this.__sourcePointList = new Array();
    //
    for (var index = 0; index < this.vertexMax; index++) {
        //
        let vertexSize : _vertexSize = new _vertexSize(index,index.toString());
        //
        this.__sourcePointList.push(vertexSize);        
    }
    //-----------------------------------------------------------------------------
    // LENGUAJES DE PROGRAMACION
    //-----------------------------------------------------------------------------
    this.queryParams();      
  }
  // 
  ////////////////////////////////////////////////////////////////
  // METODOS COMUNES /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  //
  _GetPDF():void
  {
      //
      this.status_message.set('[...Generating PDF...]');
      //
      let fileName         : string     = "DIJKSTRA";
      let fileName_output  : string     = '';
      //
      this.pdfService._GetPDF(
        this.pageTitle,
        this.c_canvas,
        this.divCanvas_Pdf,
        fileName,
      ).subscribe(
      {
          next: (fileName: string) =>{
              //
              fileName_output = fileName;
          },
          error: (error: Error) => {
              //
              this.status_message.set('An error occurred : ' + error.message);
          },
          complete: () => {
              //
              this.status_message.set(`[PDF file generated correctly]`);
          }
        }
      );
  }
};