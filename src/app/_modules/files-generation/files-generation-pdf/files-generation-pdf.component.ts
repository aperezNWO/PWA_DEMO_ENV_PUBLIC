import { Component, ViewChild        } from '@angular/core';
import { MCSDService                 } from '../../../_services/mcsd.service';
import { CustomErrorHandler          } from '../../../app.module';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UtilManager                 } from 'src/app/_engines/util.engine';


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
  protected message                : string  = '';
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
  ////////////////////////////////////////////////////////////////
  // EVENT HANDLERS
  ////////////////////////////////////////////////////////////////
  constructor(private mcsdService: MCSDService, customErrorHandler : CustomErrorHandler)
  {
    //
    console.log(FilesGenerationPDFComponent.PageTitle + "- [INGRESO]");
    //
    mcsdService.SetLog(this.pageTitle,"PAGE_PDF_DEMO");
  }  
  //
  public onNewPdf()
  {
    //
    this.progress     = 0;
    this.message      = '';
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
        this.message            = 'Favor ingrese [NOMBRE COMPLETO]';
        return;
      }
      //
      this.progress             = 0;
      this.message              = '...cargando...';
      this.downloadCaption      = '...cargando...';
      //
      let _subjectName : string = this.subjectName.nativeElement.value;
      //
      this.GetPDFUrl            = this.mcsdService.GetPDF(_subjectName);
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
                  var fileUrl        = this.mcsdService._baseUrlNetCore + '/wwwroot/output/uploadedfiles/pdf/' + this.pdfFileName;
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
                  this.message         = '[Se cargó correctamente el archivo]';
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
          this.message  = '[Ha ocurrido un error]';
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
