import { NgModule                        } from '@angular/core';
import { Route, RouterModule             } from '@angular/router';
import { HomeWebComponent                } from './_modules/home/home-web/home-web.component';
import { PageNotFoundComponent           } from './_modules/home/page-not-found/page-not-found.component';
import { AAboutWebComponent              } from './_modules/about/_a-about-web/a-about-web.component';
import { SCMComponent                    } from './_modules/about/scm/scm.component';
import { LLMListComponent                } from './_modules/about/llmlist/llmlist.component';
import { TechnicalSpecsComponent         } from './_modules/about/technicalspecs/technical-specs/technical-specs.component';
import { CurriculumComponent             } from './_modules/_Demos/_DemosCurriculum/curriculumAngular/curriculum.component';
import { DemosFeaturesWebComponent       } from './_modules/_Demos/_DemosFeatures/_demos-features-web/demos-features-web.component';
import { AlgorithmCollisionComponent     } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-collision/algorithm-collision.component';
import { AlgorithmDijkstraComponent      } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-dijkstra/algorithm-dijkstra.component';
import { AlgorithmRegExComponent         } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-reg-ex/algorithm-reg-ex.component';
import { AlgorithmSortComponent          } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-sort/algorithm-sort.component';
import { AlgorithmWebComponent           } from './_modules/_Demos/_DemosFeatures/algorithm/_algorithm-web/algorithm-web.component';
import { FeaturePagesComponent           } from './_modules/_Demos/_DemosLang/angular-demo/feature-pages.component';
import { ChartComponent                  } from './_modules/_Demos/_DemosFeatures/files-generation/chart/chart.component';
import { FilesGenerationCSVComponent } from './_modules/_Demos/_DemosFeatures/files-generation/files-generation-csv/files-generation-csv.component';
import { FilesGenerationPDFComponent } from './_modules/_Demos/_DemosFeatures/files-generation/files-generation-pdf/files-generation-pdf.component';
import { FilesGenerationWebComponent } from './_modules/_Demos/_DemosFeatures/files-generation/_files-generation-web/files-generation-web.component';
import { FilesGenerationXLSComponent } from './_modules/_Demos/_DemosFeatures/files-generation/files-generation-xls/files-generation-xls.component';
import { FilesGenerationZIPComponent } from './_modules/_Demos/_DemosFeatures/files-generation/files-generation-zip/files-generation-zip.component';
import { GameHanoiAutoComponent      } from './_modules/_Demos/_DemosFeatures/games/game-hanoi-auto/game-hanoi-auto.component';
import { GameHanoi3dComponent        } from './_modules/_Demos/_DemosFeatures/games/game-hanoi3d/game-hanoi3d.component';
import { SudokuComponent             } from './_modules/_Demos/_DemosFeatures/games/game-sudoku/game-sudoku.component';
import { GameTetrisComponent         } from './_modules/_Demos/_DemosFeatures/games/game-tetris/game-tetris.component';
import { GameTictactoeComponent      } from './_modules/_Demos/_DemosFeatures/games/game-tictactoe/game-tictactoe.component';
import { GameWebComponent            } from './_modules/_Demos/_DemosFeatures/games/_game-web/game-web.component';
import { ChatComponent               } from './_modules/_Demos/_DemosFeatures/miscelaneous/chat/chat/chat.component';
import { ComputerVisionComponent     } from './_modules/_Demos/_DemosFeatures/miscelaneous/computer-vision/computer-vision.component';
import { MathParsingComponent        } from './_modules/_Demos/_DemosFeatures/miscelaneous/math-parsing/math-parsing.component';
import { MiscelaneousComponent       } from './_modules/_Demos/_DemosFeatures/miscelaneous/_miscelaneous/miscelaneous.component';
import { OcrPhotoCaptureComponent    } from './_modules/_Demos/_DemosFeatures/miscelaneous/ocr-photo-capture/ocr-photo-capture.component';
import { DemosWebComponent           } from './_modules/_Demos/DemosWeb/demos-web/demos-web.component';
import { ContactformComponent        } from './_modules/about/contactform/contactform.component';
import { IndexComponent              } from './_modules/about/index/index.component';
import { DemosCurriculumWebComponent } from './_modules/_Demos/_DemosCurriculum/_demos-curriculum-web/demos-curriculum-web.component';
import { DemosLangWebComponent       } from './_modules/_Demos/_DemosLang/_demos-lang-web/demos-lang-web.component';
import { CppDemoComponent            } from './_modules/_Demos/_DemosLang/cpp-demo/cpp-demo.component';
import { NetcoredemoComponent        } from './_modules/_Demos/_DemosLang/netcoredemo/netcoredemo.component';
import { NodejsDemoComponent         } from './_modules/_Demos/_DemosLang/nodejs-demo/nodejs-demo.component';
import { SpringBootDemoComponent     } from './_modules/_Demos/_DemosLang/spring-boot-demo/spring-boot-demo.component';
import { DjangoDemoComponent         } from './_modules/_Demos/_DemosLang/django-demo/django-demo.component';
import { EduResourcesComponent       } from './_modules/about/edu-resources/edu-resources.component';
import { JuliaformComponent          } from './_modules/_Demos/_DemosFeatures/miscelaneous/juliaform/juliaform.component';

export interface _Route extends Route
{
    id      : number;
    caption : string;
}

//
export const routes: _Route[] = [
  {  id: 0,  path: 'Home'                  , component: HomeWebComponent                    , caption: ' Home'                                        },
  {  id: 0,  path: 'Index'                 , component: IndexComponent                      , caption: ' Index'                                       },
  {  id: 0,  path:  ''                     , component: HomeWebComponent                    , caption: ''                                             },
  {  id: 0,  path: 'AAboutWeb'             , component: AAboutWebComponent                  , caption: ' About  - Main Page'                          },
  {  id: 0,  path: 'SCM'                   , component: SCMComponent                        , caption: ' About  - SCM'                                },
  {  id: 0,  path: 'LLMList'               , component: LLMListComponent                    , caption: ' About  - LLM List'                           },
  {  id: 0,  path: 'EduResources'          , component: EduResourcesComponent               , caption: ' About  - Educational Resources'              },
  {  id: 0,  path: 'TechnicalSpecs'        , component: TechnicalSpecsComponent             , caption: ' About  - Technical Specifications'           },
  {  id: 0,  path: 'Features'              , component: FeaturePagesComponent               , caption: ' About  - Features'                           },
  {  id: 0,  path: 'ContactForm'           , component: ContactformComponent                , caption: ' About  - Contact Form'                       },
  {  id: 0,  path: 'AlgorithmWeb'          , component: AlgorithmWebComponent               , caption: ' Algoritmos - Main Page'                      },
  {  id: 0,  path: 'AlgorithmRegEx'        , component: AlgorithmRegExComponent             , caption: ' Algoritmos - Regular Expression'             },
  {  id: 0,  path: 'AlgorithmSort'         , component: AlgorithmSortComponent              , caption: ' Algoritmos - Sort'                           },
  {  id: 0,  path: 'AlgorithmDijkstra'     , component: AlgorithmDijkstraComponent          , caption: ' Algoritmos - Dijkstra  - distancia más corta'},
  {  id: 0,  path: 'AlgorithmCollision'    , component: AlgorithmCollisionComponent         , caption: ' Algoritmos - Collision - Demo'               },
  {  id: 0,  path: 'FilesGenerationWeb'    , component: FilesGenerationWebComponent         , caption: ' File Generatin  - Main Page'                 },
  {  id: 0,  path: 'FilesGenerationXLS'    , component: FilesGenerationXLSComponent         , caption: ' File Generation - XLS'                       },
  {  id: 0,  path: 'FilesGenerationCSV'    , component: FilesGenerationCSVComponent         , caption: ' File Generation - CSV'                       },
  {  id: 0,  path: 'FilesGenerationPDF'    , component: FilesGenerationPDFComponent         , caption: ' File Generation - PDF'                       },
  {  id: 0,  path: 'FilesGenerationZIP'    , component: FilesGenerationZIPComponent         , caption: ' File Generation - ZIP    '                   },
  {  id: 0,  path: 'Chart'                 , component: ChartComponent                      , caption: ' File Generation - Chart Demo'                },
  {  id: 0,  path: 'GamesSudoku'           , component: SudokuComponent                     , caption: ' Games  - Sudoku'                             },
  {  id: 0,  path: 'GamesTicTacToe'        , component: GameTictactoeComponent              , caption: ' Games  - TicTacToe'                          },
  {  id: 0,  path: 'GamesHanoiAuto'        , component: GameHanoiAutoComponent              , caption: ' Games  - Hanoi 2d'                           },
  {  id: 0,  path: 'GamesHanoi3d'          , component: GameHanoi3dComponent                , caption: ' Games  - Hanoi 3d'                           },
  {  id: 0,  path: 'GamesTetris'           , component: GameTetrisComponent                 , caption: ' Games  - Tetris'                             },
  {  id: 0,  path: 'GamesWeb'              , component: GameWebComponent                    , caption: ' Games  - Main Page'                          },
  {  id: 0,  path: 'Chat'                  , component: ChatComponent                       , caption: ' Miscelaneous - Chat Demo'                    },
  {  id: 0,  path: 'OcrPhotoCapture'       , component: OcrPhotoCaptureComponent            , caption: ' Miscelaneous - Ocr Photo Capture'            },
  {  id: 0,  path: 'ComputerVision'        , component: ComputerVisionComponent             , caption: ' Miscelaneous - Computer Vision'              },
  {  id: 0,  path: 'MathParsing'           , component: MathParsingComponent                , caption: ' Miscelaneous - Math Parsing'                 },
  {  id: 0,  path: 'FractalDemo'           , component: JuliaformComponent                  , caption: ' Miscelaneous - Fractal Demo'                 },
  {  id: 0,  path: 'Miscelaneous'          , component: MiscelaneousComponent               , caption: ' Miscelaneous - Main Page'                    },
  {  id: 0,  path: 'DemosFeaturesWeb'      , component: DemosFeaturesWebComponent           , caption: ' Demos / Features - Main Page'                },
  {  id: 0,  path: 'DemosWeb'              , component: DemosWebComponent                   , caption: ' Demos            - Main Page'                },
  {  id: 0,  path: 'Curriculum'            , component: CurriculumComponent                 , caption: ' Curriculum - Angular'                        },
  {  id: 0,  path: 'DemosCurriculumWeb'    , component: DemosCurriculumWebComponent         , caption: ' Curriculum - Main Page'                      },
  {  id: 0,  path: 'DemosLanguageWeb'      , component: DemosLangWebComponent               , caption: ' Demos / Language - Main Page'                },
  {  id: 0,  path: 'AngularDemo'           , component: FeaturePagesComponent               , caption: ' Demos / Language - Angular'                  },
  {  id: 0,  path: 'CppDemo'               , component: CppDemoComponent                    , caption: ' Demos / Language - C++'                      },
  {  id: 0,  path: 'NetCoreDemo'           , component: NetcoredemoComponent                , caption: ' Demos / Language - .NET CORE / C#'           },
  {  id: 0,  path: 'NodeJsDemo'            , component: NodejsDemoComponent                 , caption: ' Demos / Language - Node.js / Javascript'     },
  {  id: 0,  path: 'SpringBootDemo'        , component: SpringBootDemoComponent             , caption: ' Demos / Language - SpringBoot / Java'        },
  {  id: 0,  path: 'DjangoDemo'            , component: DjangoDemoComponent                 , caption: ' Demos / Language - Django / Python'          },
  {  id: 0,  path: '**'                    , component: PageNotFoundComponent               , caption: ''                                             },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule {

    constructor()
    {
        //
        let index : number = 0;
        //
        routes.forEach(element => {
            if (((element.path == '') && (element.caption == ''))==false)
            {
              element.id = ++index;
            }
        });    
    }
}
