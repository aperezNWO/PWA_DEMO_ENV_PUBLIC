import { Component, OnInit, signal, effect } from '@angular/core';
import { ViewChild, AfterViewInit          } from '@angular/core';
import { FormBuilder, NgForm,              } from '@angular/forms';
import { HttpEventType, HttpResponse       } from '@angular/common/http';
import { ActivatedRoute                    } from '@angular/router';
import { Observable                        } from 'rxjs';
import { BackendService                    } from 'src/app/_services/BackendService/backend.service';
import { PdfService                        } from 'src/app/_engines/pdf.engine';
import { _languageName, ListItem           } from 'src/app/_models/entity.model';
import { SpeechService                     } from 'src/app/_services/speechService/speech.service';
import { BaseComponent } from 'src/app/_components/base/base.component';
//
@Component({
  selector: 'app-sudoku',
  templateUrl: './game-sudoku.component.html',
  styleUrl: './game-sudoku.component.css',
})
//
export class SudokuComponent extends BaseComponent implements OnInit, AfterViewInit {
  //
  board: number[][] = [];
  //
  protected tituloListadoLenguajes : string = 'Seleccione Backend';
  protected btnGenerateCaption     : string = '[GENERAR]';
  protected btnSolveCaption        : string = '[RESOLVER]';
  //
  protected tituloGenerarDesde    : string = 'Generar Desde';
  //
  @ViewChild('_languajeList') _languajeList   : any;
  @ViewChild('_SourceList')   _sourceList     : any;
  @ViewChild('_fileUpload')   _fileUpload     : any;
  @ViewChild('_sudoku_board')  _sudoku_board  : any;
    //
  public __languajeList: any;  
  //
  public __generateSourceList : any;
  //
  public _fileUploadDivHidden:boolean = true;
  //
  public sudokuSolved: boolean = true;
  //
  public _sudokuGenerated: string = '';
  //-------------------------------------------------
  // file upload
  //-------------------------------------------------
  selectedFiles?   : FileList;
  currentFile?     : File;
  progress         : number = 0;
  downloadLink     : string = '';
  //
  rf_searchForm   = this.formBuilder.group({
    //_fileUpload   : ["", Validators.required],
  });
  //
  constructor(
                  private algorithmService : BackendService,
                  private formBuilder      : FormBuilder, 
                  public  pdfEngine        : PdfService,
                  public  override route            : ActivatedRoute,
                  public  override speechService    : SpeechService,
                  public  override backendService   : BackendService) 
  { 
      //
      super(backendService,
            route,
            speechService,
            "[GAMES - SUDOKU]",
            "PAGE_GAMES_SUDOKU",
      )
  }
  //
  ngAfterViewInit(): void {
    //
  }
  //
  ngOnInit(): void {
    //
    this.queryParams();
    //
    this.__generateSourceList = new Array();
    this.__generateSourceList.push(new ListItem(0, '(SELECCIONE OPCION..)', false));
    this.__generateSourceList.push(new ListItem(1, '[Archivo]'      , false));
    this.__generateSourceList.push(new ListItem(2, '[Backend]'      , true));
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
      //-----------------------------------------------------------------------------
      // LENGUAJES DE PROGRAMACION
      //-----------------------------------------------------------------------------
      this.__languajeList = new Array();
      this.__languajeList.push(new _languageName(0, '(SELECCIONE OPCION..)', false,""    ));
      this.__languajeList.push(new _languageName(1, '(.NET Core/C++)'      , true ,"CPP" ));
      this.__languajeList.push(new _languageName(2, '(Node.js)'            , false,"JS"  ));
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
  public _fileUploadDivHiddenChanged(): void {
    //
    let _selectedIndex: number =
      this._sourceList.nativeElement.options.selectedIndex;
    this._fileUploadDivHidden = _selectedIndex != 1; // item 1 = "Desde Archivo"
    //
    this.status_message.set("");
  }
  //
  public GenerateFromBackend():void {
        //
        this.status_message.set("Generando");
        //
        let generatedSudoku: Observable<string>;
        let selectedIndex  : number = this._languajeList.nativeElement.options.selectedIndex; // c++ by default
        //
        switch (selectedIndex) {
          case 1: // c++
            generatedSudoku = this.algorithmService._GetSudoku();
            break;
          case 2: // Typescript
            generatedSudoku = this.algorithmService._GetSudoku_NodeJS();
            break;
          default:
            return;
        }
        //
        this.sudokuSolved = false;
        //
        this.btnGenerateCaption = '[...generando...]';
        //
        const generatedSudokuObserver = {
          next: (jsondata: string) => {
            //
            this._sudokuGenerated = jsondata;
            //
            jsondata = jsondata.replaceAll('[', '');
            jsondata = jsondata.replaceAll(']', '');
            jsondata = jsondata.replaceAll('},', '|');
            jsondata = jsondata.replaceAll('{', '');
            jsondata = jsondata.replaceAll('}', '');
            let jsonDataArray: string[] = jsondata.split('|');
            //
            this.board = [];
            //
            for (let i = 0; i < 9; i++) {
              const row: number[] = [];
              //console.log(jsonDataArray[i]);
              const rowString: string[] = jsonDataArray[i].split(',');
              for (let j = 0; j < 9; j++) {
                row.push(parseInt(rowString[j]));
              }
              this.board.push(row);
            }
            //
            this.status_message.set("Se generó correctamente");
          },
          error: (err: Error) => {
            //
            console.error(
              '[SUDOKU - GENERATE] - (ERROR) : ' + JSON.stringify(err.message),
            );
            //
            this.btnGenerateCaption = '[GENERAR]';            
            //
            this.status_message.set("Ha ocurrido un error");
          },
          complete: () => {
            //
            this.btnGenerateCaption = '[GENERAR]';
          },
        };
        //
        generatedSudoku.subscribe(generatedSudokuObserver);
  };
  //------------------------------------------------------
  // FILE UPLOAD METHODS / EVEND HANDLERS
  //------------------------------------------------------
  //
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  //
  upload(): void {
    //
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      //
      if (file) {
        //
        this.progress = 0;
        //
        this.status_message.set('...cargando...');
        //
        this.sudokuSolved = false;
        //
        this.btnGenerateCaption = '[...generando...]';       
        //
        this.currentFile = file;
        //
        this.algorithmService.uploadSudoku(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              //
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              //
              this.status_message.set("Se generó correctamente");
              //
              let  jsondata  = event.body;
              //
              jsondata = jsondata.replaceAll('\"', '');
              jsondata = jsondata.replace(/\\r/g, '');
              jsondata = jsondata.replace(/\\n/g, '');
              //
              this._sudokuGenerated = jsondata;
              //  
              jsondata = jsondata.replaceAll('[', '');
              jsondata = jsondata.replaceAll(']', '');
              jsondata = jsondata.replaceAll('},', '|');
              jsondata = jsondata.replaceAll('{', '');
              jsondata = jsondata.replaceAll('}', '');
              let jsonDataArray: string[] = jsondata.split('|');
              //
              this.board = [];
              //
              for (let i = 0; i < 9; i++) {
                const row: number[] = [];
                const rowString: string[] = jsonDataArray[i].split(',');
                for (let j = 0; j < 9; j++) {
                  row.push(parseInt(rowString[j]));
                }
                this.board.push(row);
              }
            }
          },
          error: (err: any) => {
            //
            console.error('[SUDOKU - GENERATE  FROM FILE] -  (ERROR)');
            //
            console.error(err);
            //
            this.progress = 0;
            //
            if (err.error && err.error.message) {
              //
              this.status_message = err.error.message;
            } else {
              //
              this.status_message.set('no se puede cargar el archivo');
            }
            //
            this.currentFile = undefined;
            //
            this.btnGenerateCaption = '[GENERAR]';
          },
          complete: () => {
            //
            this.btnGenerateCaption = '[GENERAR]';
            //
            this.selectedFiles = undefined;
            //
            this.currentFile   = undefined;
          },
        });
      }
    }
    else 
    {
        //
        this.status_message.set("Favor seleccione archivo");
    }
  }
  //
  public _GetSudoku(): void {
      //
      let selectedIndex  : number = this._sourceList.nativeElement.options.selectedIndex; // "FROM ARCHIVE" by default
      //
      switch (selectedIndex) {
        case 1: // FROM ARCHIVE
          this.upload();
          break;
        case 2: // FROM BACKEND
          this.GenerateFromBackend();
          break;
        default:
          return;
      }
      
  }
  //
  public _SolveSudoku(): void {
    //
    this.sudokuSolved = true;
    //
    this.btnSolveCaption = '[...resolviendo...]';
    //
    this.status_message.set('resolviendo');
    //
    let solveSudoku: Observable<string>;
    //
    let selectedIndex: number =
      this._languajeList.nativeElement.options.selectedIndex; // c++ by default
    //
    switch (selectedIndex) {
      case 1: // c++
        solveSudoku = this.algorithmService._SolveSudoku(this._sudokuGenerated);
        break;
      case 2: // Typescript
        solveSudoku = this.algorithmService._SolveSudoku_NodeJS(this._sudokuGenerated);
        break;
      default:
        return;
    }
    //
    const solveSudokuObserver = {
      next: (jsondata: string) => {
        //
        this.status_message.set("Se resolvió correctamente");
        //
        this._sudokuGenerated = jsondata;
        //
        jsondata = jsondata.replaceAll('[', '');
        jsondata = jsondata.replaceAll(']', '');
        jsondata = jsondata.replaceAll('},', '|');
        jsondata = jsondata.replaceAll('{', '');
        jsondata = jsondata.replaceAll('}', '');
        let jsonDataArray: string[] = jsondata.split('|');
        //
        this.board = [];
        //
        for (let i = 0; i < 9; i++) {
          const row: number[] = [];
          const rowString: string[] = jsonDataArray[i].split(',');
          for (let j = 0; j < 9; j++) {
            row.push(parseInt(rowString[j]));
          }
          this.board.push(row);
        }
      },
      error: (err: Error) => {
        //
        console.error(
          '[SUDOKU - SOLVE] - (ERROR) : ' + JSON.stringify(err.message),
        );
        //
        this.status_message.set("Ha ocurrido un error");
      },
      complete: () => {
        //
        this.btnSolveCaption = '[RESOLVER]';
        //
        this.selectedFiles = undefined;
        //
        this.currentFile   = undefined;
        //
        this.rf_searchForm.reset();
      },
    };
    //
    solveSudoku.subscribe(solveSudokuObserver);
  }
  //
  _GetPdf() {
    //
    let suffix          : string     =  (this.sudokuSolved)? 'SOLVED' : 'STARTED';
    //
    let fileName_input  : string     = `SUDOKU_BOARD_${suffix}`;
    let fileName_output : string     = '';
    //
    this.status_message.set('Generando PDF');
    //
    this.pdfEngine._GetPDF
      (
        this.pageTitle,
        this._sudoku_board,
        this._sudoku_board,
        fileName_input,
      )
      .subscribe(
      {
        next: (fileName) =>{
          //
          fileName_output = fileName;
        },
        error: (error: { message: string; }) => {
            //
            this.status_message.set('ha ocurrido un error : ' + error.message);
        },
        complete: () => {
            //
            //this.message = `Se ha generado el archivo PDF :[ ${fileName_output} ]`;
            this.status_message.set(`Se ha generado el archivo PDF `);
        }
      }
    );
  }
  //
  submitForm(form: NgForm) {
    if (form.valid) {
      //
      let name    = form.value['txtName'];
      let message = form.value['txtMessage'];
    }
  }
}