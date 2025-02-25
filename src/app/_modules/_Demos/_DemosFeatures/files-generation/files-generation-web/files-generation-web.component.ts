import { Component          } from '@angular/core';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { CustomErrorHandler } from 'src/app/app.component';
//
@Component({
  selector: 'app-files-generation-web',
  templateUrl: './files-generation-web.component.html',
  styleUrls: ['./files-generation-web.component.css']
})
//
export class FilesGenerationWebComponent {
  //
  static get PageTitle()   : string {
    return '[GENERAR ARCHIVOS]';
  }
  //
  readonly  pageTitle      : string = FilesGenerationWebComponent.PageTitle;
  //
  constructor(backendService : BackendService, customErrorHandler : CustomErrorHandler)
  {
    //
    console.log(this.pageTitle + " - [INGRESO]");
    //
    backendService.SetLog(this.pageTitle,"PAGE_FILE_GENERATION_INDEX");
  }
}
