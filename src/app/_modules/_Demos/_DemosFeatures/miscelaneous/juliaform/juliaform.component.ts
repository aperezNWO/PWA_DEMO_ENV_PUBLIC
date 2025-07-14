import { HttpClient                  } from '@angular/common/http';
import { Component                   } from '@angular/core';
import { ActivatedRoute              } from '@angular/router';
import { BaseComponent               } from 'src/app/_components/base/base.component';
import { PAGE_MISCELANEOUS_FRACTAL_DEMO } from 'src/app/_models/common';
import { BackendService              } from 'src/app/_services/BackendService/backend.service';
import { ConfigService               } from 'src/app/_services/ConfigService/config.service';
import { ShapeDetectionService       } from 'src/app/_services/ShapeDetection/shape-detection.service';
import { SpeechService               } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-juliaform',
  templateUrl: './juliaform.component.html',
  styleUrl: './juliaform.component.css'
})
export class JuliaformComponent  extends BaseComponent {
  //
  maxIterations: number = 500;
  realPart: number = -0.4;
  imagPart: number = 0.6;
  imageUrl: string | null = null;
  //
  constructor(public          shapeDetectionService   : ShapeDetectionService,
              public override configService           : ConfigService,
              public override backendService          : BackendService,
              public override route                   : ActivatedRoute,
              public override speechService           : SpeechService,
              public http                             : HttpClient,
  )
  {
      //
      super(configService,
            backendService,
            route,
            speechService,
            PAGE_MISCELANEOUS_FRACTAL_DEMO);
  }
   
  onSubmit() {
    const url = `https://tensorflownetcore64.tryasp.net/generatejuliaparams/?maxIterations=${this.maxIterations}&realPart=${this.realPart}&imagPart=${this.imagPart}`;

    // Fetch the image as a blob
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        // Convert the blob into an object URL
        this.imageUrl = URL.createObjectURL(response);
      },
      (error) => {
        console.error('Error fetching the image:', error);
        this.imageUrl = null;
      }
    );
  }
}
