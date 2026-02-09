import { ActivatedRoute                       } from '@angular/router';
import { Component, ViewChild, effect, signal } from '@angular/core';
import { HttpEventType, HttpResponse          } from '@angular/common/http';
import { UtilManager                          } from 'src/app/_engines/util.engine';
import { BackendService                       } from 'src/app/_services/BackendService/backend.service';
import { SpeechService                        } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { BaseReferenceComponent               } from 'src/app/_components/base-reference/base-reference.component';
import { ConfigService                        } from 'src/app/_services/__Utils/ConfigService/config.service';
import { PdfService                           } from 'src/app/_services/__FileGeneration/pdf.service';
import { PAGE_FILE_GENERATION_PDF, PAGE_TITLE_NO_SOUND,PAGE_TITLE_LOG  } from 'src/app/_models/common';

@Component({
  selector: 'app-files-generation-pdf',
  templateUrl: './files-generation-pdf.component.html',
  styleUrls: ['./files-generation-pdf.component.css'],
  providers   : [
    { 
      provide : PAGE_TITLE_LOG, 
      useValue: PAGE_FILE_GENERATION_PDF 
    },
  ]
})
export class FilesGenerationPDFComponent extends BaseReferenceComponent {
  ////////////////////////////////////////////////////////////////
  // PROPERTIES
  ////////////////////////////////////////////////////////////////
  protected progress               : number  = 0;
  public    downloadCaption        : string  = '';
  public    values                 : string  = '';
  public    DownloadLink           : string  = '';
  protected pdfFileName            : string  = '';
  protected GetPDFUrl!            : any;
  //
  @ViewChild('subjectName') subjectName             : any;
  ////////////////////////////////////////////////////////////////
  // EVENT HANDLERS
  ////////////////////////////////////////////////////////////////
  constructor(
              public override configService  : ConfigService,
              public override backendService : BackendService, 
              public override route          : ActivatedRoute,
              public override speechService  : SpeechService,
              public          pdfService     : PdfService)
  {
    //
    super(configService,
          backendService,
          route,
          speechService,
          PAGE_TITLE_NO_SOUND
    )
  }  
  //--------------------------------------------------------------------------
  // METODOS COMUNES 
  //--------------------------------------------------------------------------
  //
  public onNewPdf()
  {
    //
    this.progress     = 0;
    this.status_message.set('[Restart sucessful]');
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
        this.status_message.set('Please enter [FULL NAME]');
        return;
      }
      //
      this.progress             = 0;
      this.status_message.set('...loading...');
      this.downloadCaption      = '...loading...';
      //
      let _subjectName : string = this.subjectName.nativeElement.value;
      //
      this.GetPDFUrl            = this.pdfService.GetPDF(_subjectName);
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
                  var fileUrl        = `${this.configService.getConfigValue('baseUrlNetCore')}/wwwroot/output/uploadedfiles/pdf/${this.pdfFileName}`;
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
                  this.status_message.set('File loaded correctly');
                  //
                  this.downloadCaption = '[DOWNLOAD PDF]'
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
          this.status_message.set('An error occurred');
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
