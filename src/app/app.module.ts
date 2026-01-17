
import { MatTableModule                               } from '@angular/material/table';
import { MatInputModule                               } from '@angular/material/input';
import { Injectable, NgModule                         } from '@angular/core';
import { APP_INITIALIZER,ErrorHandler, isDevMode      } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe          } from '@angular/common';
import { ServiceWorkerModule             } from '@angular/service-worker';
import { FormsModule                     } from '@angular/forms';
import { MatListModule                   } from '@angular/material/list';
import { MatPaginatorModule              } from '@angular/material/paginator';
import { MatTabsModule                   } from '@angular/material/tabs';
import { MatFormFieldModule              } from '@angular/material/form-field';
import { BrowserModule                   } from '@angular/platform-browser';
import { BrowserAnimationsModule         } from '@angular/platform-browser/animations';
import { ReactiveFormsModule             } from '@angular/forms';
import { HttpClient, HttpClientModule    } from '@angular/common/http';
import { HttpHandler, HttpInterceptor    } from '@angular/common/http';
import { HttpRequest, HttpResponse       } from '@angular/common/http';
import { HTTP_INTERCEPTORS               } from '@angular/common/http';
import { RouterModule                    } from '@angular/router';
import { HashLocationStrategy            } from '@angular/common';
import { LocationStrategy                } from '@angular/common';
import { AppComponent                    } from './app.component';
import { HomeWebComponent                } from './_modules/home/home-web/home-web.component';
import { PageNotFoundComponent           } from './_modules/home/page-not-found/page-not-found.component';
import { NavComponent                    } from './_modules/home/nav/nav.component';
import { LandingComponent                } from './_components/landing/landing.component';
import { LogType                         } from './_models/entity.model';
import { BackendService                  } from './_services/BackendService/backend.service';
import { ConfigService                   } from './_services/__Utils/ConfigService/config.service';
import { AppRoutingModule                } from './app-routing.module';
import { IndexComponent                         } from './_modules/about/index/index.component';
import { SCMComponent                           } from './_modules/about/scm/scm.component';
import { CurriculumAngularComponent             } from './_modules/_Demos/_DemosCurriculum/curriculumAngular/curriculumAngular.component';
import { AlgorithmCollisionComponent            } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-collision/algorithm-collision.component';
import { AlgorithmDijkstraComponent             } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-dijkstra/algorithm-dijkstra.component';
import { AlgorithmRegExComponent                } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-reg-ex/algorithm-reg-ex.component';
import { AlgorithmSortComponent                 } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-sort/algorithm-sort.component';
import { ChartComponent                         } from './_modules/_Demos/_DemosFeatures/files-generation/chart/chart.component';
import { FilesGenerationBaseComponent           } from './_modules/_Demos/_DemosFeatures/files-generation/files-generation-base/files-generation-base/files-generation-base.component';
import { FilesGenerationCSVComponent } from './_modules/_Demos/_DemosFeatures/files-generation/files-generation-csv/files-generation-csv.component';
import { FilesGenerationPDFComponent } from './_modules/_Demos/_DemosFeatures/files-generation/files-generation-pdf/files-generation-pdf.component';
import { FilesGenerationXLSComponent } from './_modules/_Demos/_DemosFeatures/files-generation/files-generation-xls/files-generation-xls.component';
import { GameHanoiAutoComponent      } from './_modules/_Demos/_DemosFeatures/games/game-hanoi-auto/game-hanoi-auto.component';
import { GameHanoi3dComponent        } from './_modules/_Demos/_DemosFeatures/games/game-hanoi3d/game-hanoi3d.component';
import { SudokuComponent             } from './_modules/_Demos/_DemosFeatures/games/game-sudoku/game-sudoku.component';
import { GameTetrisComponent         } from './_modules/_Demos/_DemosFeatures/games/game-tetris/game-tetris.component';
import { GameTetrisAIComponent       } from './_modules/_Demos/_DemosFeatures/games/game-tetris-ai/game-tetris-ai.component';
import { BoardComponent              } from './_modules/_Demos/_DemosFeatures/games/game-tictactoe/board/board.component';
import { GameTictactoeComponent      } from './_modules/_Demos/_DemosFeatures/games/game-tictactoe/game-tictactoe.component';
import { TicTacToeBoardAiComponent   } from './_modules/_Demos/_DemosFeatures/games/tic-tac-toe-board-ai/tic-tac-toe-board-ai.component';
import { SquareComponent             } from './_modules/_Demos/_DemosFeatures/games/game-tictactoe/square/square.component';
import { ChatComponent               } from './_modules/_Demos/_DemosFeatures/miscelaneous/chat/chat/chat.component';
import { ComputerVisionComponent     } from './_modules/_Demos/_DemosFeatures/miscelaneous/computer-vision/computer-vision.component';
import { MathParsingComponent        } from './_modules/_Demos/_DemosFeatures/miscelaneous/math-parsing/math-parsing.component';
import { OcrPhotoCaptureComponent    } from './_modules/_Demos/_DemosFeatures/miscelaneous/ocr-photo-capture/ocr-photo-capture.component';
import { LinearRegressionComponent   } from './_modules/_Demos/_DemosFeatures/_machineLearning/LinearRegression/linear-regression/linear-regression.component';
import { ContactformComponent        } from './_modules/about/contactform/contactform.component';
import { TechnicalSpecsComponent     } from './_modules/about/technicalspecs/technical-specs/technical-specs.component';
import { FractalDemoComponent        } from './_modules/_Demos/_DemosFeatures/miscelaneous/fractalDemo/juliaform.component';
import { BaseSortableHeader          } from './_directives/sortable.directive';
import { SpeechPanelComponent        } from './_components/speech-panel/speech-panel.component';
import { BaseComponent               } from './_components/base/base.component';
import { BaseReferenceComponent      } from './_components/base-reference/base-reference.component';
import { _BaseComponent              } from './_components/base/_base.component';
import { _SearchComponent            } from './_components/search/_search.component ';
import { GridParamComponent          } from './_components/grid-param/grid-param.component';
import { PageUrlListComponent        } from './_components/page-url-list/page-url-list.component';
import { NgxSignaturePadModule                        } from '@eve-sama/ngx-signature-pad';
import { NgbHighlight, NgbModule                      } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule          } from '@ng-bootstrap/ng-bootstrap';
import { finalize, tap                                } from 'rxjs';
import { NgChartsModule                               } from 'ng2-charts'; 


//
export function initialize(_configService: ConfigService) 
// 
{
      //  
      return () => _configService.loadConfig();
}
//
@Injectable({
  providedIn: 'root'
})
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap({
          // Succeeds when there is a response; ignore other events
          next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
          // Operation failed; error is an HttpErrorResponse
          error: (error) => (ok = 'failed')
        }),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
          console.warn(' [REQUESTING URL (INTERCEPT)] : ' + msg);
        })
      );
  }
}
//  
@Injectable({
  providedIn: 'root'
})
//
export class CustomErrorHandler implements ErrorHandler {
    //
    constructor(public backendService : BackendService) { } 
    //
    handleError(_error: Error): void 
    { 
      // 
      console.error("[CUSTOM ERROR HANDLING]:\n" + _error); 
      //
      let logType : LogType = LogType.Error
      //
      this.backendService.SetLog("[CUSTOM ERROR HANDLING]",_error.message,logType);
    } 
}
//
@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        HomeWebComponent,
        SCMComponent,
        AlgorithmRegExComponent,
        AlgorithmSortComponent,
        AlgorithmDijkstraComponent,
        AlgorithmCollisionComponent,
        FilesGenerationBaseComponent,
        FilesGenerationXLSComponent,
        FilesGenerationCSVComponent,
        FilesGenerationPDFComponent,
        TechnicalSpecsComponent,
        SudokuComponent,
        GameTictactoeComponent,
        TicTacToeBoardAiComponent,
        GameHanoiAutoComponent,
        OcrPhotoCaptureComponent,
        ChatComponent,
        ChartComponent,
        FractalDemoComponent,
        NavComponent,
        PageNotFoundComponent,
        IndexComponent,
        ComputerVisionComponent,
        GameHanoi3dComponent,
        MathParsingComponent,
        GameTetrisComponent,
        GameTetrisAIComponent,
        CurriculumAngularComponent,
        LinearRegressionComponent,
        ContactformComponent,
        SpeechPanelComponent,
        BaseSortableHeader,
        BaseReferenceComponent,
        BaseComponent,
        _BaseComponent,
        _SearchComponent,
        GridParamComponent,
        PageUrlListComponent
    ],
    exports: [RouterModule],
    providers: [
           DatePipe,
           DecimalPipe,
           ConfigService,  
           BackendService,
        {  provide: HTTP_INTERCEPTORS , useClass: LoggingInterceptor, multi: true },
        {  provide: LocationStrategy  , useClass: HashLocationStrategy            },
        {  provide: ErrorHandler      , useClass: CustomErrorHandler              },
        [
          {
            provide   : APP_INITIALIZER,
            useFactory: initialize,
            deps      : [ConfigService,BackendService,HttpClient],
            multi     : true
          }
        ],

    ],
    bootstrap: [AppComponent],
    imports: [
        NgChartsModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatInputModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatTabsModule,
        MatFormFieldModule,
        NgbModule,
        NgbHighlight,
        NgbPaginationModule, 
        NgbAlertModule,     
        NgxSignaturePadModule,
        BoardComponent,
        SquareComponent,
        AppRoutingModule,
        //RouterModule,
        //RouterModule.forRoot(routes, { useHash: true }),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
   ]
})
//
export class AppModule { 
    //-----------------------------------------------------------------------------------------------------
    constructor(public customErrorHandler : CustomErrorHandler, 
                public loggingInterceptor : LoggingInterceptor,
                public backendService     : BackendService,
               ) 
    {

    }
}



