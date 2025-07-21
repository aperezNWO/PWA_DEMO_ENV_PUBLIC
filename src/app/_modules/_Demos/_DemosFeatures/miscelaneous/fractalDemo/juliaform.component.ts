import { HttpClient                     } from '@angular/common/http';
import { Component, ViewChild                      } from '@angular/core';
import { ActivatedRoute                 } from '@angular/router';
import { BaseComponent                  } from 'src/app/_components/base/base.component';
import { PdfService } from 'src/app/_engines/pdf.engine';
import { PAGE_MISCELANEOUS_FRACTAL_DEMO } from 'src/app/_models/common';
import { BackendService                 } from 'src/app/_services/BackendService/backend.service';
import { ConfigService                  } from 'src/app/_services/ConfigService/config.service';
import { ShapeDetectionService          } from 'src/app/_services/ShapeDetection/shape-detection.service';
import { SpeechService                  } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-juliaform',
  templateUrl: './juliaform.component.html',
  styleUrl: './juliaform.component.css'
})
export class FractalDemoComponent  extends BaseComponent {
  //
  maxIterations: number = 500;
  realPart: number = -0.4;
  imagPart: number = 0.6;
  imageUrl: string | null = null;
  submitTitle : string = "Generate Fractal";
  //
  @ViewChild('_fractal_image')  _fractal_image  : any;
  //
  constructor(public          shapeDetectionService   : ShapeDetectionService,
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
            PAGE_MISCELANEOUS_FRACTAL_DEMO);
  }
  // 
  onSubmit() {
    //
    const url        = `${this.configService.getConfigValue('baseUrlNetCoreCPPEntry')}generatejuliaparams/?maxIterations=${this.maxIterations}&realPart=${this.realPart}&imagPart=${this.imagPart}`;
    //
    this.status_message.set("[generando por favor espere..]");
    //
    // Fetch the image as a blob
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        // Convert the blob into an object URL
        this.imageUrl = URL.createObjectURL(response);
        //
        this.status_message.set("[Se generó correctamente la imagen]");
      },
      (error) => {
        //
        console.error('Error fetching the image:', error);
        //
        this.imageUrl = null;
        //
        this.status_message.set("[Ha ocurrido un error, favor intente de nuevo]");
      }
    );
  }
  //
  GeneratePDF() {
    //
    let fileName_input  : string     = `FRACTAL_IMAGE`;
    let fileName_output : string     = '';
    //
    this.status_message.set('Generando PDF');
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
          fileName_output = fileName;
        },
        error: (error: { message: string; }) => {
            //
            this.status_message.set('ha ocurrido un error : ' + error.message);
        },
        complete: () => {
            //
            this.status_message.set(`[Se ha generado el archivo PDF]`);
        }
      }
    );      
  }
}
