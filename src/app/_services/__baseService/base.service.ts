import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable              } from '@angular/core';
import { ConfigService           } from '../__Utils/ConfigService/config.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  ////////////////////////////////////////////////////////////////  
  // CAMPOS
  ////////////////////////////////////////////////////////////////  
  //
  public HTTPOptions_Text_Plain = {
    headers: new HttpHeaders(),
    'responseType'  : 'text' as 'json'
  };
    //
  public HTTPOptions_Text = {
    headers: new HttpHeaders({
      'Accept':'application/text'
    }),
    'responseType'  : 'text' as 'json'
  };
  //    
  public HTTPOptions_JSON = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
    ,'responseType' : 'text' as 'json'
  }; 
  //
  constructor() { 

  }
}
