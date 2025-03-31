import { Component                           } from '@angular/core';
import { HttpEventType, HttpResponse         } from '@angular/common/http';
import { ActivatedRoute                      } from '@angular/router';
import { Observable                          } from 'rxjs';
import { UtilManager                         } from 'src/app/_engines/util.engine';
import { BackendService                      } from 'src/app/_services/BackendService/backend.service';
import { BaseComponent                       } from 'src/app/_components/base/base.component';
import { SpeechService                       } from 'src/app/_services/speechService/speech.service';
//
@Component({
  selector: 'app-files-generation-zip',
  templateUrl: './files-generation-zip.component.html',
  styleUrls: ['./files-generation-zip.component.css']
})
//
export class FilesGenerationZIPComponent extends BaseComponent {
  //--------------------------------------------------------------------------
  // PROPIEDADES - FILE UPLOAD  - BYTESTREAM
  //--------------------------------------------------------------------------
  selectedFiles?         : FileList;
  currentFile?           : File;
  progress               : number  = 0;
  message                : string  = '';
  downloadLink           : string  = '';
  //--------------------------------------------------------------------------
  // EVENT HANDLERS / CONSTRUCTORS  
  //--------------------------------------------------------------------------
  constructor(public override backendService        : BackendService,
              public override route                 : ActivatedRoute,
              public override speechService         : SpeechService,

  ) 
  {
       super(backendService,
            route,
            speechService,
            "[FILE GENERATION - ZIP]",
            "PAGE_DEMOS_FILE_GENERATION_ZIP"
       )
  }
  //--------------------------------------------------------------------------
  // METODOS COMUNES
  //--------------------------------------------------------------------------
  //
  //--------------------------------------------------------------------------
  // METODOS - FILE UPLOAD COMPONENT
  //--------------------------------------------------------------------------
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  //
  upload(): void {
    //  
    this.progress = 0;
    //
    this.message  = "...cargando...";
    //
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      //
      if (file) {
        //
        this.currentFile = file;
        //
        this.backendService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) 
            {
              //
              this.progress = Math.round(100 * event.loaded / event.total);
            } 
            else if (event instanceof HttpResponse) 
            {
              //
              //console.log("RESPONSE : " + event.body);
              //
              this.message = "[SE CARGO CORRECTAMENTE EL ARCHIVO]";
            }
          },
          error: (err: any) => {
            //
            //console.log(err);
            //
            this.progress = 0;
            //  
            if (err.error && err.error.message) 
            {
              //
              this.message = err.error.message;
            } 
            else 
            {
              //
              this.message = 'Could not upload the file!';
            }
            //
            const utterance = new SpeechSynthesisUtterance( this.message  );
            speechSynthesis.speak(utterance);  
            //
            this.currentFile = undefined;
          }
        });
      }
      //
      this.selectedFiles = undefined;
    }
  }
  //--------------------------------------------------------------------------
  // METODOS - FILE UPLOAD COMPONENT
  //--------------------------------------------------------------------------
  SetZip():void{
      //
      let uploadedFileName  : string | undefined = this.currentFile?.name; 
      //
      let fileName!         : Observable<string>; 
      //
      fileName              = this.backendService.SetZip(uploadedFileName);
      //
      const setZipObserver  = {
           //
           next: (p_zipFile: string) => { 
            //
            let downloadLink_1 = (this.backendService._baseUrlNetCore + p_zipFile);
            //
            while (downloadLink_1.indexOf("\"") > -1) 
                downloadLink_1 = downloadLink_1.replace("\"", "");
            //
            this.downloadLink  = UtilManager.DebugHostingContent(downloadLink_1);
            //
            //console.log('[Download link] : ' + this.downloadLink);
            //
            this.message = "[SE GENERO CORRECTAMENTE ARCHIVO ZIP]";
            //
            const utterance = new SpeechSynthesisUtterance( this.message  );
            speechSynthesis.speak(utterance);  
          },
          error: (err: Error) => {
            //
            console.error('Observer got an error: ' + err);
            //
            this.downloadLink = "";
            //
          },       
          complete: ()        => {
            //
            //console.log('Observer got a complete notification');
            //
          },
      }
      //
      fileName.subscribe(setZipObserver);
  }
  //--------------------------------------------------------------------------
  NewZip():void{
      //
      //console.log(this.pageTitle + ' - [NEW PDF] ');  
      //
      this.selectedFiles = undefined;
      //
      this.currentFile   = undefined;
      //
      this.progress      = 0;
      //
      this.message       = "";
      //
      this.downloadLink  = "";
  }  
  //--------------------------------------------------------------------------  
}
