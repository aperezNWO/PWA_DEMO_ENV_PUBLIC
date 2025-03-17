import { Component          } from '@angular/core';
import { CustomErrorHandler } from 'src/app/app.module';
//
@Component({
  selector: 'app-algorithm-web',
  templateUrl: './algorithm-web.component.html',
  styleUrls: ['./algorithm-web.component.css']
})
//
export class AlgorithmWebComponent {
  //
  public static get PageTitle(): string
  {
     return '[ALGORITMOS]'; 
  }
  //
  readonly pageTitle : string =  AlgorithmWebComponent.PageTitle;
  //
  constructor(private customErrorHandler : CustomErrorHandler)
  {
      //
      //console.log(AlgorithmWebComponent.PageTitle + " - [INGRESO]");
  }
}