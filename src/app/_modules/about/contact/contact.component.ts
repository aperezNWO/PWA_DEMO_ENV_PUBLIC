import { Component          } from '@angular/core';
import { CustomErrorHandler } from '../../../app.module';
import { MCSDService        } from '../../../_services/mcsd.service';

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
  constructor(private mcsdServiCe: MCSDService, private customErrorHandler: CustomErrorHandler)
  {
      //
      console.log(this.pageTitle + "- [INGRESO]");
      //
      mcsdServiCe.SetLog(this.pageTitle,"PAGE_CONTACT");
  }
}
