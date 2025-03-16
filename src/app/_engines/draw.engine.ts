import { SortInfo } from "../_models/entity.model";

export class DrawEngine
{
    ////////////////////////////////
    // PROPIEDADES
    ////////////////////////////////
    //
    constructor(public _context : any, public c_canvas: any, public rectSize : number, public screenSize : number,)
    {
        // 
    }
    ////////////////////////////////
    // METODOS
    ////////////////////////////////
    DrawGrid():void
    {
        //
        this._context.clearRect(0, 0, this.c_canvas.nativeElement.width, this.c_canvas.nativeElement.height);
        //
        for (let x = 0.5; x < 501; x += this.rectSize) {
            this._context.moveTo(x, 0);
            this._context.lineTo(x, 381);
        }
        //
        for (let y = 0.5; y < 381; y += this.rectSize) {
            this._context.moveTo(0, y);
            this._context.lineTo(500, y);
        }
        //
        this._context.strokeStyle = "#cccccc";
        this._context.stroke();
        //
    }
    //
    DrawRectangles(stringArray : SortInfo[]):void
    {
        //
        let defaultFillStyle : string = "#ccc";
        //
        let swapFillStyle    : string = "#FFA500";
        //
        for (let index = 0; index < 25; index++)
        {
            //
            let x      : number = 0 + (this.rectSize * index);
            let y      : number = this.screenSize - (Number.parseInt(stringArray[index].value) * this.rectSize);
            let length : number = (this.rectSize);
            let height : number = Number.parseInt(stringArray[index].value) * this.rectSize;
            //
            this._context.fillStyle = (stringArray[index].swap == true)? swapFillStyle : defaultFillStyle;
            //
            this._context.fillRect(x, y, length, height);
        }
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
        //console.log("coordinate [" + index + "] : " + points[index] + " ");
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
    DrawLines(pointArray : string[], matrixArray : string[], strokeStyle : string, drawingSubSet : Boolean, PointListHidden : string) : void {
    //
    //console.log("DRAWING_LINES");
    //--------------------------------------------------------------------------
    // CREAR MATRIZ
    //--------------------------------------------------------------------------
    //
    // MATRIX : {0,16,0,0,0,0,0,0,0}|{16,0,21,0,0,12,0,18,0}|{0,21,0,0,18,0,10,0,19}|{0,0,0,0,20,2,5,0,0}|{0,0,18,20,0,19,0,4,0}|{0,12,0,2,19,0,5,17,0}|{0,0,10,5,0,5,0,0,0}|{0,18,0,0,4,17,0,0,2}|{0,0,19,0,0,0,0,2,0}
    //
    let pointArrayMaster : string [] = PointListHidden.split("|");
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
        //console.log("MATRIX ROW " + matrixLine);
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
            //console.log("_MATRIX (" + index_x + "," + index_y + ") = " + pointValue);
            //
            // POINTS  : [11,7]|[3,21]|[22,11]|[13,19]|[8,0]|[15,18]|[12,14]|[6,3]|[4,4]
            //
            if (pointValue != "0") {
                //
                var pointSource = pointArray[index_x].replace("[", "").replace("]", "").split(",");
                var pointDest   = pointArray[index_y].replace("[", "").replace("]", "").split(",");;
                //
                //console.log("_DRAWING LINE FOR (" + pointValue + " )");
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
}