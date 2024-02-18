import { Component, OnInit, ViewChild     } from '@angular/core';
import { NgxSignaturePadComponent } from '@eve-sama/ngx-signature-pad/lib/ngx-signature-pad.component';
import { NgxSignatureOptions      } from '@eve-sama/ngx-signature-pad/lib/types/ngx-signature-pad';
import { MCSDService              } from 'src/app/_services/mcsd.service';
import { NavComponent } from '../../home/nav/nav.component';
//
@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css']
})
//
export class OcrComponent implements OnInit {
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
     //NavComponent.navbarCollapsed = true;
     this.statusButton = this.defaultStatusBotton;
     this.status       = this.defaultStatus;
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
     // data:image/png;base64,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
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
        this.status = error;
        //
        this.statusButton = this.defaultStatusBotton;
        //
        this.status       = this.defaultStatus;
      }
    );
  }
}

