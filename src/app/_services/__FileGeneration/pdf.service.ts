import { Injectable                         } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import html2canvas    from 'html2canvas';
import jsPDF          from 'jspdf';
import { Observable } from 'rxjs';
import { BaseService                        } from '../__baseService/base.service';
import { ConfigService                      } from '../__Utils/ConfigService/config.service';

//
@Injectable({
  providedIn: 'root'
})
export class PdfService extends BaseService {
  //
  constructor(public http : HttpClient, public _configService : ConfigService) { 
      //
      super();
  }
  //
  getPdf(pageTitle: string, c_canvas : any, divCanvas_Pdf : any, fileName: string, observer : any):void
  {
      //
      const timestamp = new Date().toISOString();
      //
      fileName        = `${fileName}_${timestamp}.pdf`;
      //
      const areaToPrint   = c_canvas.nativeElement;
      const borderToPrint = divCanvas_Pdf.nativeElement;
      //
      html2canvas(areaToPrint).then((_canvas) => {
          //
          let w       : number  = borderToPrint.offsetWidth;
          let h       : number  = borderToPrint.offsetHeight;
          //
          let imgData : string  = _canvas.toDataURL('image/jpeg');
          //
          let pdfDoc  : jsPDF   = new jsPDF("landscape", "px", [w, h]);
          //
          pdfDoc.addImage(imgData, 0, 0, w, h);
          //
          pdfDoc.save(fileName);
      });
      //
      observer.next(fileName);
      observer.complete();
  }
  //
  public _GetPDF(pageTitle: string, c_canvas : any, divCanvas_Pdf : any, fileName: string): Observable<string> {
      //
      let pdfObservable = new Observable<string>((observer) => this.getPdf(pageTitle,c_canvas,divCanvas_Pdf,fileName,observer));
      //            
      return pdfObservable;
  };
  ////////////////////////////////////////////////////////////////  
  // METODOS - [GENERAR ARCHIVOS  - PDF]
  ////////////////////////////////////////////////////////////////
  public GetPDF(subjectName: string | undefined): Observable<HttpEvent<any>> {
      //
      let p_url   = `${this._configService.getConfigValue('baseUrlNetCore')}demos/_GetPdf?subjectName=${subjectName}`;
      //
      // USAR REQUEST PARA OBTENER PORCENTAJE DE STATUS
      const req = new HttpRequest('GET', p_url, {
        reportProgress: true,
        responseType  : 'text',
      });
      //
      return this.http.request<HttpEvent<any>>(req);
  }
}
