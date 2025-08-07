import { MatTableModule                               } from '@angular/material/table';
import { MatInputModule                               } from '@angular/material/input';
import { Injectable, NgModule                         } from '@angular/core';
import { APP_INITIALIZER,ErrorHandler, isDevMode      } from '@angular/core';
import { DatePipe, DecimalPipe                        } from '@angular/common';
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
import { AAboutWebComponent              } from './_modules/about/_a-about-web/a-about-web.component';
import { UnitTestingComponent            } from './_modules/_unitttesting/unit-testing.component';
import { LogType                         } from './_models/entity.model';
import { BackendService                  } from './_services/BackendService/backend.service';
import { ConfigService                   } from './_services/ConfigService/config.service';
import { AppRoutingModule                } from './app-routing.module';
import { finalize, tap                   } from 'rxjs';
import { NgxSignaturePadModule           } from '@eve-sama/ngx-signature-pad';
import { NgbHighlight, NgbModule                } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule    } from '@ng-bootstrap/ng-bootstrap';
import { IndexComponent                         } from './_modules/about/index/index.component';
import { SCMComponent                           } from './_modules/about/scm/scm.component';
import { LLMListComponent                       } from './_modules/about/llmlist/llmlist.component';
import { DemosWebComponent                      } from './_modules/_Demos/DemosWeb/demos-web/demos-web.component';
import { CurriculunmCppComponent                } from './_modules/_Demos/_DemosCurriculum/curriculunm-cpp/curriculunm-cpp.component';
import { CurriculumAngularComponent             } from './_modules/_Demos/_DemosCurriculum/curriculumAngular/curriculumAngular.component';
import { CurriculumDjangoPythonComponent        } from './_modules/_Demos/_DemosCurriculum/curriculum-django-python/curriculum-django-python.component';
import { CurriculumNodeJsComponent              } from './_modules/_Demos/_DemosCurriculum/curriculum-node-js/curriculum-node-js.component';
import { CurriculumSpringBootCompont            } from './_modules/_Demos/_DemosCurriculum/curriculum-spring-boot/curriculum-spring-boot.component';
import { CurriculumNetcoreComponent             } from './_modules/_Demos/_DemosCurriculum/curriculum-netcore/curriculum-netcore.component';
import { DemosFeaturesWebComponent              } from './_modules/_Demos/_DemosFeatures/_demos-features-web/demos-features-web.component';
import { AlgorithmCollisionComponent            } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-collision/algorithm-collision.component';
import { AlgorithmDijkstraComponent             } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-dijkstra/algorithm-dijkstra.component';
import { AlgorithmRegExComponent                } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-reg-ex/algorithm-reg-ex.component';
import { AlgorithmSortComponent                 } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-sort/algorithm-sort.component';
import { AlgorithmWebComponent                  } from './_modules/_Demos/_DemosFeatures/algorithm/_algorithm-web/algorithm-web.component';
import { FeaturePagesComponent                  } from './_modules/_Demos/_DemosLang/angular-demo/feature-pages.component';
import { DemosLangWebComponent                  } from './_modules/_Demos/_DemosLang/_demos-lang-web/demos-lang-web.component';
import { ChartComponent                         } from './_modules/_Demos/_DemosFeatures/files-generation/chart/chart.component';
import { FilesGenerationCSVComponent } from './_modules/_Demos/_DemosFeatures/files-generation/files-generation-csv/files-generation-csv.component';
import { FilesGenerationPDFComponent } from './_modules/_Demos/_DemosFeatures/files-generation/files-generation-pdf/files-generation-pdf.component';
import { FilesGenerationWebComponent } from './_modules/_Demos/_DemosFeatures/files-generation/_files-generation-web/files-generation-web.component';
import { FilesGenerationXLSComponent } from './_modules/_Demos/_DemosFeatures/files-generation/files-generation-xls/files-generation-xls.component';
import { GameHanoiAutoComponent } from './_modules/_Demos/_DemosFeatures/games/game-hanoi-auto/game-hanoi-auto.component';
import { GameHanoi3dComponent   } from './_modules/_Demos/_DemosFeatures/games/game-hanoi3d/game-hanoi3d.component';
import { SudokuComponent        } from './_modules/_Demos/_DemosFeatures/games/game-sudoku/game-sudoku.component';
import { GameTetrisComponent    } from './_modules/_Demos/_DemosFeatures/games/game-tetris/game-tetris.component';
import { BoardComponent         } from './_modules/_Demos/_DemosFeatures/games/game-tictactoe/board/board.component';
import { GameTictactoeComponent } from './_modules/_Demos/_DemosFeatures/games/game-tictactoe/game-tictactoe.component';
import { SquareComponent        } from './_modules/_Demos/_DemosFeatures/games/game-tictactoe/square/square.component';
import { GameWebComponent       } from './_modules/_Demos/_DemosFeatures/games/_game-web/game-web.component';
import { ChatComponent          } from './_modules/_Demos/_DemosFeatures/miscelaneous/chat/chat/chat.component';
import { ComputerVisionComponent     } from './_modules/_Demos/_DemosFeatures/miscelaneous/computer-vision/computer-vision.component';
import { MathParsingComponent        } from './_modules/_Demos/_DemosFeatures/miscelaneous/math-parsing/math-parsing.component';
import { MiscelaneousComponent       } from './_modules/_Demos/_DemosFeatures/miscelaneous/_miscelaneous/miscelaneous.component';
import { OcrPhotoCaptureComponent    } from './_modules/_Demos/_DemosFeatures/miscelaneous/ocr-photo-capture/ocr-photo-capture.component';
import { ContactformComponent        } from './_modules/about/contactform/contactform.component';
import { TechnicalSpecsComponent     } from './_modules/about/technicalspecs/technical-specs/technical-specs.component';
import { EduResourcesComponent       } from './_modules/about/edu-resources/edu-resources.component';
import { CppDemoComponent        } from './_modules/_Demos/_DemosLang/cpp-demo/cpp-demo.component';
import { FractalDemoComponent    } from './_modules/_Demos/_DemosFeatures/miscelaneous/fractalDemo/juliaform.component';
import { NetcoredemoComponent    } from './_modules/_Demos/_DemosLang/netcoredemo/netcoredemo.component';
import { NodejsDemoComponent     } from './_modules/_Demos/_DemosLang/nodejs-demo/nodejs-demo.component';
import { SpringBootDemoComponent } from './_modules/_Demos/_DemosLang/spring-boot-demo/spring-boot-demo.component';
import { DjangoDemoComponent     } from './_modules/_Demos/_DemosLang/django-demo/django-demo.component';
import { BaseSortableHeader      } from './_directives/sortable.directive';
import { SpeechPanelComponent    } from './_components/speech-panel/speech-panel.component';
import { BaseComponent           } from './_components/base/base.component';
import { _BaseComponent          } from './_components/base/_base.component';
import { _SearchComponent        } from './_components/search/_search.component ';
import { GridParamComponent      } from './_components/grid-param/grid-param.component';
import { PageUrlListComponent    } from './_components/page-url-list/page-url-list.component';

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
      console.warn("[CUSTOM ERROR HANDLING]:\n" + _error); 
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
        HomeWebComponent,
        SCMComponent,
        LLMListComponent,
        AAboutWebComponent,
        AlgorithmWebComponent,
        AlgorithmRegExComponent,
        AlgorithmSortComponent,
        AlgorithmDijkstraComponent,
        AlgorithmCollisionComponent,
        FilesGenerationWebComponent,
        FilesGenerationXLSComponent,
        FilesGenerationCSVComponent,
        FilesGenerationPDFComponent,
        TechnicalSpecsComponent,
        UnitTestingComponent,
        SudokuComponent,
        GameTictactoeComponent,
        GameHanoiAutoComponent,
        GameWebComponent,
        OcrPhotoCaptureComponent,
        ChatComponent,
        ChartComponent,
        FractalDemoComponent,
        MiscelaneousComponent,
        NavComponent,
        PageNotFoundComponent,
        IndexComponent,
        ComputerVisionComponent,
        GameHanoi3dComponent,
        MathParsingComponent,
        GameTetrisComponent,
        CurriculumAngularComponent,
        CurriculumNodeJsComponent,
        CurriculumDjangoPythonComponent,
        CurriculunmCppComponent,
        CurriculumSpringBootCompont,
        CurriculumNetcoreComponent,
        FeaturePagesComponent,
        ContactformComponent,
        DemosFeaturesWebComponent,
        DemosWebComponent,
        DemosLangWebComponent,
        CppDemoComponent,
        NetcoredemoComponent,
        NodejsDemoComponent,
        SpringBootDemoComponent,
        DjangoDemoComponent,
        SpeechPanelComponent,
        BaseSortableHeader,
        BaseComponent,
        _BaseComponent,
        EduResourcesComponent,
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



