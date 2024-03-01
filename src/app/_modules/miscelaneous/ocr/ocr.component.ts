import { Component, OnInit, ViewChild     } from '@angular/core';
import { NgxSignaturePadComponent         } from '@eve-sama/ngx-signature-pad/lib/ngx-signature-pad.component';
import { NgxSignatureOptions              } from '@eve-sama/ngx-signature-pad/lib/types/ngx-signature-pad';
import { MCSDService                      } from 'src/app/_services/mcsd.service';
import { NavComponent                     } from '../../home/nav/nav.component';

//
@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css']
})
//
export class OcrComponent implements OnInit {
  //
  //@ViewChild('nav') nav!           : NavComponent;
  /** Catch object, call functions via instance object */
  @ViewChild('signature') signature: NgxSignaturePadComponent | undefined;
  /** You can see more introduction in the below about NgxSignatureOptions */
  public options: NgxSignatureOptions = {
    backgroundColor: '#F4F5F5',
    width : 100,
    height: 100,
    css: {
      'border-radius': '16px'
    }
  };
  //
  public status              : string = '';
  //
  public statusButton        : string = '';
  //
  public defaultStatusBotton : string = '[Parse]'
  //
  public defaultStatus       : string = '[Draw a letter on the pad]'
  //
  constructor(public mcsdService : MCSDService)
  {
      //
  }
  ngOnInit(): void {
     //
     this.statusButton = this.defaultStatusBotton;
     this.status       = this.defaultStatus;
     //
     //this.nav._NavbarCollapsed = true;
  }
  /** The begin event of sign */
  onBeginSign(): void { }
 
  /** The end event of sign */
  onEndSign(): void { }
  //
  saveSignature():void {
     //
     console.log("Saving signature...");
     // PNG
          let base64ImageString : string  = this.signature?.toDataURL()!;
     //  console.log('Data URL:', base64ImageString);
     //
     this.uploadImage(base64ImageString);
  }
  // Trigger a click event on the anchor
  clearSignature():void{
     //
     console.log("clearing signature...");
     // PNG
     this.signature?.clear();
     //
     this.status       = this.defaultStatus;;
     //
     this.statusButton = this.defaultStatusBotton;
  }
  //
  uploadImage(base64ImageString : string):void {
    // Replace 'yourBase64ImageString' with the actual base64 image string
    //const base64ImageString = 'yourBase64ImageString';
    this.statusButton = '..parsing..';
    //
    this.mcsdService.uploadBase64Image(base64ImageString).subscribe(
      (response) => {
        console.log('Image uploaded successfully:', response);
        this.status       = JSON.parse(JSON.stringify(response))['message'];
        this.statusButton = this.defaultStatusBotton;
      },
      (error) => {
        //
        console.error('Error uploading image:', error);
        //
        this.status       = error;
        //
        this.statusButton = this.defaultStatusBotton;
        //
        this.status       = this.defaultStatus;
      }
    );
  }
}

