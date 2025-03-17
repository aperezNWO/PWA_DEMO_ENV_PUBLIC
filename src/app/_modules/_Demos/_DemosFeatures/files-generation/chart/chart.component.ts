import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder                  } from '@angular/forms';
import { Chart, registerables         } from 'chart.js';
import { Observable                   } from 'rxjs';
import { PdfService                   } from 'src/app/_engines/pdf.engine';
import { BackendService               } from 'src/app/_services/BackendService/backend.service';
import { CustomErrorHandler           } from 'src/app/app.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit  {
    //--------------------------------------------------------------------------
    // PROPIEDADES COMUNES
    //--------------------------------------------------------------------------
    //
    pdf_message_csv                                    : string = '';  
    pdf_message_xls                                    : string = '';  
    //--------------------------------------------------------------------------
    // PROPIEDADES - ESTADISTICA
    //--------------------------------------------------------------------------
    //
    @ViewChild('canvas_csv') canvas_csv             : any;
    //
    @ViewChild('divPieChart_CSV') divPieChart_CSV   : any;
    //
    public pieChartVar_csv                          : any;
    //
    //--------------------------------------------------------------------------
    // PROPIEDADES - ESTADISTICA
    //--------------------------------------------------------------------------
    //
    @ViewChild('canvas_xls')      canvas_xls     : any;
    //
    @ViewChild('divPieChart_XLS') divPieChart_xls : any;
    //
    public pieChartVar_xls                        : any;
    //--------------------------------------------------------------------------
    // EVENT HANDLERS FORMIULARIO 
    //--------------------------------------------------------------------------
    constructor(private backendService: BackendService, private formBuilder: FormBuilder, private customErrorHandler : CustomErrorHandler, public pdfService: PdfService) {
      //
      Chart.register(...registerables);
    }
    //
    ngOnInit(): void {
      //
      this.SetPieChart();
      //}+
      this.SetBarChart();
    }
    //--------------------------------------------------------------------------
    // METODOS
    //--------------------------------------------------------------------------
    //
    SetPieChart():void
    {
        //
        console.log('[SET CHART]');
        //
        const statLabels          : string[]          = [];
        const statData            : Number[]          = [];
        const statBackgroundColor : string[]          = [];
        //
        let csv_informeLogRemoto!                 : Observable<string>;
        csv_informeLogRemoto                      = this.backendService.getInformeRemotoCSV_STAT();
        //
        const csv_observer = {
          next: (csv_data: string)     => { 
            //
            //console.log(FilesGenerationCSVComponent.PageTitle + " - [SET CSV DATA] - Return Values : [" + csv_data + "]");
            //
            let jsondata     = JSON.parse(csv_data);
            //
            let recordNumber = jsondata.length;
            //
            //console.log('ESTADISTICA - (return): ' + recordNumber);
            //
            jsondata.forEach((element: JSON, index : number) => {
              //
              //console.log(index + " " + JSON.stringify(element));
              //
              //console.log("[CSV DEMO] - SET CHART - RESULT : index [" + index + "] value={"
              //      + jsondata[index]["id_Column"]
              //+ "-" + jsondata[index]["ciudad"] + "}");
              //
              statLabels.push(jsondata[index]["ciudad"]);
              statData.push(Number(jsondata[index]["id_Column"]));
              //
              let randomNumber_1 = Math.floor(Math.random() * 100);
              let randomNumber_2 = Math.floor(Math.random() * 100);
              let randomNumber_3 = Math.floor(Math.random() * 100);
              //
              //console.log('RANDOM NUMBERS : [' + randomNumber_1 + ',' + randomNumber_2 + ',' + randomNumber_3 + ']')
              //
              let rgbStr = 'rgb('
                  + (Number(jsondata[index]["id_Column"]) + randomNumber_1) + ','
                  + (Number(jsondata[index]["id_Column"]) + randomNumber_2) + ','
                  + (Number(jsondata[index]["id_Column"]) + randomNumber_3) + ')';
              //
              console.log('RGB : ' + rgbStr);
              //
              statBackgroundColor.push(rgbStr);
            });      
          },
          error           : (err: Error)      => {
            //
            //console.log(FilesGenerationCSVComponent.PageTitle + " - [SET CSV DATA] - Error : [" + err.message + "]");
          },
          complete        : ()                => {
            //
            //console.log(FilesGenerationCSVComponent.PageTitle + " - [SET CSV DATA] - [Search end]");
            //
            const data = {
              labels: statLabels,
              datasets: [{
                  label: 'CIUDADES',
                  data: statData,
                  backgroundColor: statBackgroundColor,
                  hoverOffset: 4
              }]
            };
            //
            let context = this.canvas_csv.nativeElement.getContext('2d');
            //
            this.pieChartVar_csv = new Chart(context, {
                  type: 'pie',
                  data: data,
                  options: {
                      responsive: true,
                      plugins: {
                          legend: {
                              position: 'bottom',
                          },
                          title: {
                              display: true,
                              text: 'CIUDADES'
                          }
                      }
                  }
              });
            },
      };
      //
      csv_informeLogRemoto.subscribe(csv_observer);
    }   
    //--------------------------------------------------------------------------
    // METODOS - ESTADISTICAS
    //--------------------------------------------------------------------------
    //
    SetBarChart():void {
      //
      console.log("[SET BAR CHART]");
      //
      const statLabels          : string[]          = [];
      const statData            : Number[]          = [];
      const statBackgroundColor : string[]          = [];
      // 
      let td_informeLogStat!                 : Observable<string>;
      td_informeLogStat                      = this.backendService.getLogStatPOST();
      //
      const td_observer = {
        next: (td_logEntry: string)     => { 
          //
          let jsondata     = JSON.parse(JSON.stringify(td_logEntry));
          //
          let recordNumber = jsondata.length;
          //
          //console.log('ESTADISTICA - (return): ' + recordNumber);
          //
          jsondata.forEach((element: JSON, index : number) => {
                //
                //console.log(index + " " + JSON.stringify(element));
                //
                //console.log("[SI-SPAE-WEB] - GET STAT - RESULT : index [" + index + "] value={"
                //+ jsondata[index]["pageName"]
                //+ "," + jsondata[index]["ipValue"] + "}");
                //
                statLabels.push(jsondata[index]["pageName"] + " - " + jsondata[index]["ipValue"]);
                statData.push(Number(jsondata[index]["ipValue"]));
                statBackgroundColor.push('rgb('
                    + (Number(jsondata[index]["ipValue"]) / 4) + ','
                    + (Number(jsondata[index]["ipValue"]) / 3) + ','
                    + (Number(jsondata[index]["ipValue"]) / 2) + ')');
          });
        },
        error           : (err: Error)      => {
          //
          console.error('ESTADISTICA- (ERROR) : ' + JSON.stringify(err.message));
          //
        },
        complete        : ()                => {
          //
          //console.log('ESTADISTICA -  (SEARCH END)');
          //
          const data = {
            labels              : statLabels,
            datasets            : [{
                label           : 'CONTEO DE SESIONES',
                data            : statData,
                backgroundColor : statBackgroundColor,
                hoverOffset     : 4
            }]
          };
          //
          let context = this.canvas_xls.nativeElement.getContext('2d');
          //
          this.pieChartVar_xls = new Chart(context, 
          {
                type    : 'bar',
                data    : data,
                options : {
                    responsive: true,
                    plugins   : {
                            legend      : {
                                position: 'top',
                            },
                            title       : {
                                display : true,
                                text    : 'CONTEO DE SESIONES'
                              }
                          }
                }
          });
        },
      };
      //
      td_informeLogStat.subscribe(td_observer);
    }   
    //--------------------------------------------------------------------------
    // METODOS - PDF
    //--------------------------------------------------------------------------
    //
    GetPDF(P_fileName : string):void
    {
        //
        (P_fileName == '[PIE CHART]')? this.pdf_message_csv = '[...Generando PDF...]' : this.pdf_message_xls = '[...Generando PDF...]'
        //
        let fileName_output  : string     = '';
        //
        this.pdfService._GetPDF(
          P_fileName,
          (P_fileName == '[PIE CHART]')? this.canvas_csv      : this.canvas_xls,
          (P_fileName == '[PIE CHART]')? this.divPieChart_CSV : this.divPieChart_xls,
          P_fileName,
        ).subscribe(
        {
            next: (fileName: string) =>{
                //
                fileName_output = fileName;
            },
            error: (error: Error) => {
                //
                let msg = 'ha ocurrido un error : ' + error.message;
                (P_fileName == '[PIE CHART]')? this.pdf_message_csv   = msg : this.pdf_message_xls   = msg;
            },
            complete: () => {
                //
                let msg = `Se ha generado el archivo [${fileName_output}]`;
                (P_fileName == '[PIE CHART]')? this.pdf_message_csv  = msg : this.pdf_message_xls    = msg;
            }
          }
        );
    }
}
