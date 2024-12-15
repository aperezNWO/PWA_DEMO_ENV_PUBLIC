import { Component          } from '@angular/core';
import { BackendService        } from '../../../_services/backend.service';
import { CustomErrorHandler } from '../../../app.module';
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
