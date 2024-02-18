import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import html2canvas    from 'html2canvas';
import jsPDF          from 'jspdf';
//
@Injectable({
  providedIn: 'root'
})
export class PdfService {
  //
  constructor() { 
      //
  }
  //
  getPdf(pageTitle: string, c_canvas : any, divCanvas_Pdf : any, fileName: string, observer : any):void
  {
      //
      console.log(pageTitle + ": [GENERANDO PDF]" );
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
}
