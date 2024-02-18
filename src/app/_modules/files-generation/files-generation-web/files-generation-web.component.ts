import { Component          } from '@angular/core';
import { MCSDService        } from '../../../_services/mcsd.service';
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
  constructor(mcsdService : MCSDService, customErrorHandler : CustomErrorHandler)
  {
    //
    console.log(this.pageTitle + " - [INGRESO]");
    //
    mcsdService.SetLog(this.pageTitle,"PAGE_FILE_GENERATION_INDEX");
  }
}
