import { Component, OnInit, ViewChild             } from '@angular/core';
import { ActivatedRoute                           } from '@angular/router';
import { ChartData, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective                       } from 'ng2-charts';
import { BaseReferenceComponent                   } from 'src/app/_components/base-reference/base-reference.component';
import { PAGE_MACHINE_LEARNING_LINEAR_REGRESSION, PAGE_TITLE_LOG, PAGE_TITLE_NO_SOUND  } from 'src/app/_models/common';
import { _languageName                            } from 'src/app/_models/entity.model';
import { BackendService                           } from 'src/app/_services/BackendService/backend.service';
import { ConfigService                            } from 'src/app/_services/__Utils/ConfigService/config.service';
import { TensorFlowService, PredictionResponse    } from 'src/app/_services/__AI/TensorflowService/tensor-flow.service';
import { SpeechService                            } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { DecimalPipe                              } from '@angular/common';


@Component({
  selector    : 'app-linear-regression',
  templateUrl : './linear-regression.component.html',
  styleUrl    : './linear-regression.component.css',
  providers   : [
    { 
      provide : PAGE_TITLE_LOG, 
      useValue: PAGE_MACHINE_LEARNING_LINEAR_REGRESSION 
    },
  ]
})
export class LinearRegressionComponent  extends BaseReferenceComponent implements OnInit {
     //
     title              : string                    = 'Apollo Mission Time Predictor';
     inputMissionNumber : number             | null = 18; // Default value
     predictionResult   : PredictionResponse | null = null;
     errorMessage       : string             | null = null;
     isLoading          : boolean                   = false;
     //
     // Historical data for chart initialization and reference
     private historicalData       = [
        { mission: 8,  time: 147.0 },
        { mission: 10, time: 193.0 },
        { mission: 11, time: 195.0 },
        { mission: 12, time: 244.0 },
        { mission: 13, time: 142.0 },
        { mission: 14, time: 217.0 },
        { mission: 15, time: 295.0 },
        { mission: 16, time: 265.0 },
        { mission: 17, time: 301.0 }
      ]
     // Chart properties
     @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
     //
     public chartType    : ChartType = 'line';
     // 
     public chartOptions: ChartConfiguration['options'] = {
        responsive          : true,
        maintainAspectRatio : false, // Allows chart to fill container
        scales              : {
          x: {
            title: {
              display: true,
              text: 'Mission Number'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Total Mission Time (Hours)'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Apollo Mission Duration Prediction'
          }
        }
    };
    //
    public chartData: ChartData<'line'> = {
      labels: [],
      datasets: [
        {
          data            : [], // <-- Add the 'data' property explicitly
          label           : 'Actual Mission Times (Hours)',
          borderColor     : '#3e95cd',
          backgroundColor : 'rgba(62, 149, 205, 0.2)',
          fill            : false,
          pointRadius     : 6,
          pointHoverRadius: 8,
          tension         : 0.1
        },
        {
          data            : [], // <-- Add the 'data' property explicitly
          label           : 'Predicted Mission Time (Hours)',
          borderColor     : '#ff6384',
          backgroundColor : 'rgba(255, 99, 132, 0.2)',
          fill            : false,
          pointRadius     : 8,
          pointHoverRadius: 10,
          pointStyle      : 'triangle',
          showLine        : false // Only show the predicted point
        }
      ]
    };
    //
    public linearRegressionEngine         : number = 3; 
    //
    public __languajeList : any; 
    //
    constructor(      public  override configService    : ConfigService,
                      public  override route            : ActivatedRoute,
                      public  override speechService    : SpeechService,
                      public  override backendService   : BackendService,
                      public  predictService            : TensorFlowService,
                      public  decimalPipe               : DecimalPipe
               ) 
    { 
          //
          super(configService,
                backendService,
                route,
                speechService,
                PAGE_TITLE_NO_SOUND
          )
    }

    //
    ngOnInit(): void {
      //
      this.queryParams();
    }
    //
    queryParams():void{
        //
        this.route.queryParams.subscribe({ next: (params) => {
            //-----------------------------------------------------------------------------
            // LENGUAJES DE PROGRAMACION
            //-----------------------------------------------------------------------------
            this.__languajeList      = new Array();
            this.__languajeList.push(new _languageName(0, '(C++ Engine              : "Exact Solution (Least Squares Method))         '  , true ,  "CPP"  ));
            this.__languajeList.push(new _languageName(1, '(Python/TensorFlow Engine: "Approximate Solution (Iterative Optimization)) '  , false,  "PY"   ));
            //
            let langName = params['langName'] ? params['langName'] : "" ;
            //
            if (langName !== '')
            {
                //
                console.log(` LangName : ${langName}`);  
                //
                for (var index = 0; index < this.__languajeList.length; index++) {
                  //
                  if (this.__languajeList[index]._shortName  == langName)
                    {
                      this.__languajeList[index]._selected = true;     
                      this.linearRegressionEngine                          = this.__languajeList[index]._index;
                      
                      break;
              
                    }
                }
            } 
            else 
            {
                this.linearRegressionEngine = 0; // (C++ Engine              : "Exact Solution (Least Squares Method)) 
            }
            //
            this.initializeChart();
        }
        ,complete        : ()                => {
            //
         },
       });
    }
    //
    initializeChart(): void {
      // Prepare initial chart data from historical data
      const labels      = this.historicalData.map(item => `Apollo ${item.mission}`);
      const actualTimes = this.historicalData.map(item => item.time);

      this.chartData.labels = labels;
      this.chartData.datasets[0].data = actualTimes; // Actual times dataset
      this.chartData.datasets[1].data = [];          // Prediction dataset (empty initially)

      // Update chart if it's already rendered
      if (this.chart) {
       this.chart.update();
      }
  }
  //
  predict(): void {
    //
    if (this.inputMissionNumber === null || this.inputMissionNumber < 1) {
      this.errorMessage     = 'Please enter a valid mission number (1 or higher).';
      this.predictionResult = null;
      return;
    }
    //
    this.errorMessage = null;
    this.isLoading    = true;

    // C++
    if (this.linearRegressionEngine == 0)
    {
        this.predictService.predictTime_netcore_cpp(this.inputMissionNumber).subscribe({
            next: (response) => {
              //
              this.predictionResult            = response;
              let predicted_total_time_hours   = this.decimalPipe.transform(response.predicted_total_time_hours, '1.2-2' );
              let predicted_duration_days      = this.decimalPipe.transform(response.predicted_duration_days   , '1.2-2' );
              this.status_message.set(`Input Mission Number : ${response.input_mission_number}, Predicted Total Time : ${predicted_total_time_hours} Hours,  Predicted Duration :${predicted_duration_days} Days `);
              //
              this.updateChart(response.input_mission_number, response.predicted_total_time_hours);
            },
            error: (error) => {
              console.error('API Error:', error);
              this.errorMessage = `Error calling API: ${error.message || 'Unknown error'}`;
               this.status_message.set(this.errorMessage);
              this.predictionResult = null;
            },
            complete: () => {
              this.isLoading = false;
            }
        });
    }
    
    // PYTHON
    if (this.linearRegressionEngine == 1)
    {
        this.predictService.predictTime_tensorflow_python(this.inputMissionNumber).subscribe({
            next: (response) => {
              //
              this.predictionResult = response;
              let predicted_total_time_hours   = this.decimalPipe.transform(response.predicted_total_time_hours, '1.2-2' );
              let predicted_duration_days      = this.decimalPipe.transform(response.predicted_duration_days   , '1.2-2' );
              this.status_message.set(`Input Mission Number : ${response.input_mission_number}, Predicted Total Time : ${predicted_total_time_hours} Hours,  Predicted Duration :${predicted_duration_days} Days `);
              //  
              this.updateChart(response.input_mission_number, response.predicted_total_time_hours);
            },
            error: (error) => {
              console.error('API Error:', error);
              this.errorMessage     = `Error calling API: ${error.message || 'Unknown error'}`;
              this.status_message.set(this.errorMessage);
              this.predictionResult = null;
              this.isLoading        = false;
            },
            complete: () => {
              this.isLoading = false;
            }
        });
    }
  }
  //
  updateChart(predictedMission: number, predictedTime: number): void {
    const labels      = [...this.historicalData.map(item => `Apollo ${item.mission}`)];
    const actualTimes = [...this.historicalData.map(item => item.time)];

    // Ensure the labels array includes the predicted mission if it's not already there
    const predictedMissionLabel = `Apollo ${predictedMission}`;
    if (!labels.includes(predictedMissionLabel)) {
        labels.push(predictedMissionLabel);
        actualTimes.push(NaN); // No actual time for the predicted mission number
    }

    // Update chart data
    this.chartData.labels           = labels;
    this.chartData.datasets[0].data = actualTimes; // Actual times (with NaN for prediction point)

    // Prepare prediction data array aligned with the labels
    const predictionDataArray = new Array(labels.length).fill(NaN);
    const predictionIndex     = labels.indexOf(predictedMissionLabel);
    if (predictionIndex !== -1) {
        predictionDataArray[predictionIndex] = predictedTime;
    }
    this.chartData.datasets[1].data = predictionDataArray; // Prediction times

    // Update the chart
    if (this.chart) {
      this.chart.update();
    }
  }

  //
  onLinearRegressionEngineChange(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      this.linearRegressionEngine = Number(target.value);
    }
  }

}
