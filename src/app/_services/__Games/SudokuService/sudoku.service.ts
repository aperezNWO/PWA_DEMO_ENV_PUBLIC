import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable                         } from '@angular/core';
import { Observable                         } from 'rxjs';
import { BaseService                        } from '../../__baseService/base.service';
import { ConfigService                      } from '../../__Utils/ConfigService/config.service';

@Injectable({
  providedIn: 'root'
})
export class SudokuService extends BaseService {
  
  ////////////////////////////////////////////////////////////////  
  // FIELDS
  ////////////////////////////////////////////////////////////////  
  
  constructor(public http : HttpClient, public _configService : ConfigService) { 
      //
      super();
  }

  ////////////////////////////////////////////////////////////////  
  // METHODS
  //////////////////////////////////////////////////////////////// 
  //
  _GetSudoku_NodeJS(): Observable<string> {
    //
    let p_url: string = `${this._configService.getConfigValue('baseUrlNodeJs')}Sudoku_Generate_NodeJS`;
    //
    let sudokuGenerated: Observable<string> = this.http.get<string>(
      p_url,
      this.HTTPOptions_JSON,
    );
    //
    return sudokuGenerated;
  } 
  //
  _GetSudoku_CPP(): Observable<string>
  {
    // 
    let p_url              : string  =  `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}Sudoku_Generate_CPP`;
    //
    let sudokuGenerated    : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
    //
    return sudokuGenerated;
  };
  //
  _SolveSudoku_CPP(p_matrix : string): Observable<string>
  {
    // 
    let p_url               : string  = `${this._configService.getConfigValue('baseUrlNetCoreCPPEntry')}Sudoku_Solve_CPP?p_matrix=${p_matrix}`
    //
    let sudokuSolved        : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
    //
    return sudokuSolved;
  };
  //
  _SolveSudoku_NodeJS(p_matrix: string): Observable<string> {
    //
    let p_url: string = `${this._configService.getConfigValue('baseUrlNodeJs')}Sudoku_Solve_NodeJS?p_matrix=${p_matrix}`;
    //
    let sudokuSolved: Observable<string> = this.http.get<string>(
      p_url,
      this.HTTPOptions_Text,
    );
    //
    return sudokuSolved;
  }
  //-------------------------------------------------------------
  // FILE UPLODAD METHODS
  //-------------------------------------------------------------
  uploadSudoku(file: File): Observable<HttpEvent<any>> {
    //
    const formData: FormData = new FormData();
    //
    formData.append('file', file);
    //
    let url = `${this._configService.getConfigValue('baseUrlNetCore')}demos/Sudoku_Upload_File`;
    //
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'text',
    });
    //
    return this.http.request<HttpEvent<any>>(req);
  }    
  ///////////////////////////////////////////////////////////////
}
