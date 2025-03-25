import { Component, ViewChild, effect, signal } from '@angular/core';
import { HttpEventType, HttpResponse          } from '@angular/common/http';
import { UtilManager                          } from 'src/app/_engines/util.engine';
import { BackendService                       } from 'src/app/_services/BackendService/backend.service';
import { SpeechService                        } from 'src/app/_services/speechService/speech.service';


@Component({
  selector: 'app-files-generation-pdf',
  templateUrl: './files-generation-pdf.component.html',
  styleUrls: ['./files-generation-pdf.component.css']
})
export class FilesGenerationPDFComponent {
  ////////////////////////////////////////////////////////////////
  // PROPERTIES
  ////////////////////////////////////////////////////////////////
  protected progress               : number  = 0;
  protected message                = signal<string>('');
  public    downloadCaption        : string  = '';
  public    values                 : string  = '';
  public    DownloadLink           : string  = '';
  protected pdfFileName            : string  = '';
  //
  public static get PageTitle()  : string {
    return '[GENERAR ARCHIVOS PDF]';
  }
  protected GetPDFUrl!            : any;
  readonly  pageTitle             : string = FilesGenerationPDFComponent.PageTitle;
  //
  @ViewChild('subjectName') subjectName             : any;
  public isListVisible            = false; // Initially hidden
  public toogleLisCaption: string = "[Ver Referencias]";
  ////////////////////////////////////////////////////////////////
  // EVENT HANDLERS
  ////////////////////////////////////////////////////////////////
  constructor(private backendService : BackendService, 
              public  speechService  : SpeechService)
  {
    //
    backendService.SetLog(this.pageTitle,"PAGE_PDF_DEMO");
    // Define an effect to react to changes in the signal
    effect(() => {
      if (this.message())
          this.speechService.speakTextCustom(this.message());
    });
    //
    this.speechService.speakTextCustom(this.pageTitle);
  }  
  //--------------------------------------------------------------------------
  // METODOS COMUNES 
  //--------------------------------------------------------------------------
  //
  toggleList() {
    this.isListVisible     = !this.isListVisible; // Toggle visibility
    this.toogleLisCaption  = !(this.isListVisible)? "[Ver Referencias]" : "[Ocultar Referencias]";
    if (this.isListVisible)
      this.speechService.speakTextCustom("Ver Referncias");
  }
  //
  public onNewPdf()
  {
    //
    this.progress     = 0;
    this.message.set('Reinicio exitoso');
    this.DownloadLink = '';
    this.pdfFileName  = "";
    this.subjectName.nativeElement.value = '';
  }  
  //
  public onSubmit()
  {
      //
      if (this.subjectName.nativeElement.value == '')
      {
        this.message.set('Favor ingrese [NOMBRE COMPLETO]');
        return;
      }
      //
      this.progress             = 0;
      this.message.set('...cargando...');
      this.downloadCaption      = '...cargando...';
      //
      let _subjectName : string = this.subjectName.nativeElement.value;
      //
      this.GetPDFUrl            = this.backendService.GetPDF(_subjectName);
      //
      const pdf_observer = {
        next: (event : any)     => 
        { 
            //
            if (event instanceof HttpResponse)
            {
              //
              this.progress   = 100;
              //
              var resultArray = event.body.split("|");
              //
              if (resultArray.length > 0) {
                  //
                  this.pdfFileName   = resultArray[1];
                  var fileUrl        = this.backendService._baseUrlNetCore + '/wwwroot/output/uploadedfiles/pdf/' + this.pdfFileName;
                  var fileLocalPath  = resultArray[2];
                  var imagePath      = resultArray[3];
                  //
                  let downloadLink_1 = fileUrl;
                  //
                  while (downloadLink_1.indexOf("\"") > -1) 
                      downloadLink_1 = downloadLink_1.replace("\"", "");
                  //
                  this.DownloadLink = `${UtilManager.DebugHostingContent(downloadLink_1)}`; 
                  //
                  console.info("PDF FILENAME  : " + fileUrl);
                  //
                  console.info("PDF PATH      : " + fileLocalPath);
                  //
                  console.info("IMAGE PATH    : " + imagePath);
                  //
                  console.info('[GENERATE PDF FILE] - [Download link] : ' + this.DownloadLink);
                  //
                  this.message.set('Se cargó correctamente el archivo');
                  //
                  this.downloadCaption = '[DESCARGAR PDF]'
                }
            } 
            else 
            {
              //
              if (event.type === HttpEventType.Sent) 
                this.progress = 25;
              //
              //if (event.type === HttpEventType.ResponseHeader) 
              //  this.progress = 50;
              //
              if (event.type === HttpEventType.DownloadProgress) 
                this.progress = 50;
            }  // end if event instance 
          },
        error           : (err: Error)      => {
          //
          this.message.set('Ha ocurrido un error');
          //
          console.error('[GENERATE PDF FILE] - Error :' + err);
        },
        complete        : ()                => {
          //
          console.warn('[GENERATE PDF FILE] - COMPLETED ');
          //
        },
    }; 
    //
    this.GetPDFUrl.subscribe(pdf_observer);
  }
  ////////////////////////////////////////////////////////////////
  // METODOS COMUNES
  ////////////////////////////////////////////////////////////////
}
