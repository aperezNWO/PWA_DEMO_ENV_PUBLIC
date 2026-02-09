import { HttpClient                     } from '@angular/common/http';
import { Component, ViewChild           } from '@angular/core';
import { ActivatedRoute                 } from '@angular/router';
import { PAGE_MISCELANEOUS_FRACTAL_DEMO, PAGE_TITLE_LOG, PAGE_TITLE_NO_SOUND } from 'src/app/_models/common';
import { BackendService                 } from 'src/app/_services/BackendService/backend.service';
import { ConfigService                  } from 'src/app/_services/__Utils/ConfigService/config.service';
import { ComputerVisionService          } from 'src/app/_services/__AI/ComputerVisionService/Computer-Vision.service';
import { SpeechService                  } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { PdfService                     } from 'src/app/_services/__FileGeneration/pdf.service';
import { BaseReferenceComponent         } from 'src/app/_components/base-reference/base-reference.component';



@Component({
  selector    : 'app-juliaform',
  templateUrl : './juliaform.component.html',
  styleUrl    : './juliaform.component.css',
  providers   : [
    { 
      provide : PAGE_TITLE_LOG, 
      useValue: PAGE_MISCELANEOUS_FRACTAL_DEMO 
    },
  ]
})
export class FractalDemoComponent  extends BaseReferenceComponent {
  //
  // Add as class properties
  private defaultValues = {
    maxIterations: 500,
    realPart: -0.4,
    imagPart: 0.6
  };
  //
  maxIterations    : number        = 500;
  realPart         : number        = -0.4;
  imagPart         : number        = 0.6;
  imageUrl         : string | null = null;
  submitTitle      : string        = "[Generate Fractal]";
  pdfButtonCaption : string        = "[Generate PDF]"

  //
  @ViewChild('_fractal_image')  _fractal_image  : any;
  //
  constructor(public          computervisionService   : ComputerVisionService,
              public override configService           : ConfigService,
              public override backendService          : BackendService,
              public override route                   : ActivatedRoute,
              public override speechService           : SpeechService,
              public http                             : HttpClient,
              public pdfEngine                        : PdfService,
  )
  {
      //
      super(configService,
            backendService,
            route,
            speechService,
            PAGE_TITLE_NO_SOUND);
  }
  // 
  onSubmit() {
    //
    this.status_message.set("[Generating please wait...]");
    //
    // Fetch the image as a blob
    this.computervisionService._OpenCv_GetFractal(this.maxIterations,this.realPart,this.imagPart).subscribe(
      (response: Blob) => {
        // Convert the blob into an object URL
        this.imageUrl = URL.createObjectURL(response);
        //
        this.status_message.set("[Image generated correctly]");
      },
      (error) => {
        //
        console.error('Error fetching the image:', error);
        //
        this.imageUrl = null;
        //
        this.status_message.set("[An error occurrued, plase try again]");
      }
    );
  }
  //
  GeneratePDF() {
    //
    let fileName_input  : string     = `FRACTAL_IMAGE`;
    let fileName_output : string     = '';
    //
    this.pdfEngine._GetPDF
      (
        this.pageTitle,
        this._fractal_image,
        this._fractal_image,
        fileName_input,
      )
      .subscribe(
      {
        next: (fileName: string) =>{
          //
          this.status_message.set('[...Generating PDF...]');
          this.pdfButtonCaption = '[...Generating PDF...]'
          //
          fileName_output = fileName;
        },
        error: (error: { message: string; }) => {
            //
            this.status_message.set('An error occured : ' + error.message);
            this.pdfButtonCaption  = "[Generate PDF]";
        },
        complete: () => {
            //
            this.status_message.set(`[PDF File generated correctly]`);
            this.pdfButtonCaption  = "[Generate PDF]";
        }
      }
    );      
  }
  //
  // Add this method to reset to defaults
  resetToDefaults(): void {
    this.maxIterations = this.defaultValues.maxIterations;
    this.realPart = this.defaultValues.realPart;
    this.imagPart = this.defaultValues.imagPart;
    
    // Optional: Clear any generated image
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
      this.imageUrl = null;
    }
  
    // Clear status message
    this.status_message.set("");
    
    // You can also trigger auto-generation after reset:
    // this.onSubmit();  
  }

  // Add this method to disable reset when already at defaults
  isAtDefaultValues(): boolean {
    return this.maxIterations === this.defaultValues.maxIterations &&
          Math.abs(this.realPart - this.defaultValues.realPart) < 0.001 &&
          Math.abs(this.imagPart - this.defaultValues.imagPart) < 0.001;
  }
}
