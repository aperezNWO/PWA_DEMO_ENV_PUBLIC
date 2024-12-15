import { Component          } from '@angular/core';
import { CustomErrorHandler } from '../../../app.module';
import { BackendService        } from '../../../_services/backend.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  //
  public static get PageTitle()   : string {
    //
    return '[CONTACT]';
  }
  //
  readonly pageTitle : string = ContactComponent.PageTitle;
  //
  constructor(private backendService: BackendService, private customErrorHandler: CustomErrorHandler)
  {
      //
      console.log(this.pageTitle + "- [INGRESO]");
      //
      backendService.SetLog(this.pageTitle,"PAGE_CONTACT");
  }
}
