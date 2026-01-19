import { NgModule                        } from '@angular/core';
import { Route, RouterModule             } from '@angular/router';
import { HomeWebComponent                } from './_modules/home/home-web/home-web.component';
import { PageNotFoundComponent           } from './_modules/home/page-not-found/page-not-found.component';
import { SCMComponent                    } from './_modules/about/scm/scm.component';
import { TechnicalSpecsComponent         } from './_modules/about/technicalspecs/technical-specs/technical-specs.component';
import { CurriculumAngularComponent      } from './_modules/_Demos/_DemosCurriculum/curriculumAngular/curriculumAngular.component';
import { AlgorithmCollisionComponent     } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-collision/algorithm-collision.component';
import { AlgorithmDijkstraComponent      } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-dijkstra/algorithm-dijkstra.component';
import { AlgorithmRegExComponent         } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-reg-ex/algorithm-reg-ex.component';
import { AlgorithmSortComponent          } from './_modules/_Demos/_DemosFeatures/algorithm/algorithm-sort/algorithm-sort.component';
import { ChartComponent                  } from './_modules/_Demos/_DemosFeatures/files-generation/chart/chart.component';
import { FilesGenerationCSVComponent } from './_modules/_Demos/_DemosFeatures/files-generation/files-generation-csv/files-generation-csv.component';
import { FilesGenerationPDFComponent } from './_modules/_Demos/_DemosFeatures/files-generation/files-generation-pdf/files-generation-pdf.component';
import { FilesGenerationXLSComponent } from './_modules/_Demos/_DemosFeatures/files-generation/files-generation-xls/files-generation-xls.component';
import { GameHanoiAutoComponent      } from './_modules/_Demos/_DemosFeatures/games/game-hanoi-auto/game-hanoi-auto.component';
import { GameHanoi3dComponent        } from './_modules/_Demos/_DemosFeatures/games/game-hanoi3d/game-hanoi3d.component';
import { SudokuComponent             } from './_modules/_Demos/_DemosFeatures/games/game-sudoku/game-sudoku.component';
import { GameTetrisComponent         } from './_modules/_Demos/_DemosFeatures/games/game-tetris/game-tetris.component';
import { GameTetrisAIComponent       } from './_modules/_Demos/_DemosFeatures/games/game-tetris-ai/game-tetris-ai.component';
import { GameTictactoeComponent      } from './_modules/_Demos/_DemosFeatures/games/game-tictactoe/game-tictactoe.component';
import { TicTacToeBoardAiComponent   } from './_modules/_Demos/_DemosFeatures/games/tic-tac-toe-board-ai/tic-tac-toe-board-ai.component';
import { ChatComponent               } from './_modules/_Demos/_DemosFeatures/miscelaneous/chat/chat/chat.component';
import { ComputerVisionComponent     } from './_modules/_Demos/_DemosFeatures/miscelaneous/computer-vision/computer-vision.component';
import { MathParsingComponent        } from './_modules/_Demos/_DemosFeatures/miscelaneous/math-parsing/math-parsing.component';
import { OcrPhotoCaptureComponent    } from './_modules/_Demos/_DemosFeatures/miscelaneous/ocr-photo-capture/ocr-photo-capture.component';
import { LinearRegressionComponent   } from './_modules/_Demos/_DemosFeatures/_machineLearning/LinearRegression/linear-regression/linear-regression.component';
import { ContactformComponent        } from './_modules/about/contactform/contactform.component';
import { IndexComponent              } from './_modules/about/index/index.component';
import { FractalDemoComponent        } from './_modules/_Demos/_DemosFeatures/miscelaneous/fractalDemo/juliaform.component';
import { PageUrlListComponent        } from './_components/page-url-list/page-url-list.component';
import { GridParamComponent          } from './_components/grid-param/grid-param.component';
import { LandingComponent            } from './_components/landing/landing.component';

export interface _Route extends Route
{  
    id      : number;
    caption : string;
    queryParams : string;
}

//
export const routes: _Route[] = [
  {  id: 0,  path: 'Home'                  , component: HomeWebComponent                    , caption: ' Home'                                        , queryParams : 'PAGE_ANGULAR_DEMO_INDEX' },
  {  id: 0,  path: 'Index'                 , component: IndexComponent                      , caption: ' Index'                                       , queryParams : 'PAGE_HOME_INDEX'         },
  {  id: 0,  path:  ''                     , component: HomeWebComponent                    , caption: ''                                             , queryParams : '' },
  {  id: 0,  path: 'SCM'                   , component: SCMComponent                        , caption: ' About  - SCM'                                , queryParams : '' },
  {  id: 0,  path: 'PageUrlList'           , component: PageUrlListComponent                , caption: ' About  - LLM List'                           , queryParams : 'PAGE_ABOUT_LLM_LIST'     },
  {  id: 0,  path: 'PageUrlList'           , component: PageUrlListComponent                , caption: ' About  - Educational Resources'              , queryParams : 'PAGE_ABOUT_EDU_RESC'     },
  {  id: 0,  path: 'TechnicalSpecs'        , component: TechnicalSpecsComponent             , caption: ' About  - Technical Specifications'           , queryParams : '' },
  {  id: 0,  path: 'ContactForm'           , component: ContactformComponent                , caption: ' About  - Contact Form'                       , queryParams : '' },
  {  id: 0,  path: 'AlgorithmRegEx'        , component: AlgorithmRegExComponent             , caption: ' Algorithms - Regular Expression'             , queryParams : '' },
  {  id: 0,  path: 'AlgorithmSort'         , component: AlgorithmSortComponent              , caption: ' Algorithms - Sort'                           , queryParams : '' },
  {  id: 0,  path: 'AlgorithmDijkstra'     , component: AlgorithmDijkstraComponent          , caption: ' Algorithms - Dijkstra  - Shortest Path'      , queryParams : '' },
  {  id: 0,  path: 'AlgorithmCollision'    , component: AlgorithmCollisionComponent         , caption: ' Algorithms - Collision - Demo'               , queryParams : '' },
  {  id: 0,  path: 'FilesGenerationXLS'    , component: FilesGenerationXLSComponent         , caption: ' File Generation - XLS'                       , queryParams : '' },
  {  id: 0,  path: 'FilesGenerationCSV'    , component: FilesGenerationCSVComponent         , caption: ' File Generation - CSV'                       , queryParams : '' },
  {  id: 0,  path: 'FilesGenerationPDF'    , component: FilesGenerationPDFComponent         , caption: ' File Generation - PDF'                       , queryParams : '' },
  {  id: 0,  path: 'Chart'                 , component: ChartComponent                      , caption: ' File Generation - Chart Demo'                , queryParams : '' },
  {  id: 0,  path: 'GamesSudoku'           , component: SudokuComponent                     , caption: ' Games  - Sudoku'                             , queryParams : '' },
  {  id: 0,  path: 'GamesTicTacToe'        , component: GameTictactoeComponent              , caption: ' Games  - Tic-Tac-Toe'                        , queryParams : '' },
  {  id: 0,  path: 'GamesTicTacToeAI'      , component: TicTacToeBoardAiComponent           , caption: ' Games  - Tic-Tac-Toe - A.I.'                 , queryParams : '' },
  {  id: 0,  path: 'GamesHanoiAuto'        , component: GameHanoiAutoComponent              , caption: ' Games  - Hanoi 2d'                           , queryParams : '' },
  {  id: 0,  path: 'GamesHanoi3d'          , component: GameHanoi3dComponent                , caption: ' Games  - Hanoi 3d'                           , queryParams : '' },
  {  id: 0,  path: 'GamesTetris'           , component: GameTetrisComponent                 , caption: ' Games  - Tetris'                             , queryParams : '' },
  {  id: 0,  path: 'GamesTetrisAI'         , component: GameTetrisAIComponent               , caption: ' Games  - Tetris - A.I.'                      , queryParams : '' },
  {  id: 0,  path: 'Chat'                  , component: ChatComponent                       , caption: ' MISCELLANEOUS - Chat Demo'                    , queryParams : '' },
  {  id: 0,  path: 'OcrPhotoCapture'       , component: OcrPhotoCaptureComponent            , caption: ' MISCELLANEOUS - Ocr Photo Capture'            , queryParams : '' },
  {  id: 0,  path: 'ComputerVision'        , component: ComputerVisionComponent             , caption: ' MISCELLANEOUS - Computer Vision'              , queryParams : '' },
  {  id: 0,  path: 'MathParsing'           , component: MathParsingComponent                , caption: ' MISCELLANEOUS - Math Parsing'                 , queryParams : '' },
  {  id: 0,  path: 'FractalDemo'           , component: FractalDemoComponent                , caption: ' MISCELLANEOUS - Fractal Demo'                 , queryParams : '' },
  {  id: 0,  path: 'LinearRegression'      , component: LinearRegressionComponent           , caption: ' Machine Learning  - Linear Regression'       , queryParams : '' },
  {  id: 0,  path: 'GridParam'             , component: GridParamComponent                  , caption: ' Curriculum - Artificial Intelligence'        , queryParams : 'PAGE_CURRICULUM_AI'              },
  {  id: 0,  path: 'GridParam'             , component: GridParamComponent                  , caption: ' Curriculum - C++'                            , queryParams : 'PAGE_CURRICULUM_CPP'             },
  {  id: 0,  path: 'CurriculumAngular'     , component: CurriculumAngularComponent          , caption: ' Curriculum - Angular    / Typescript'        , queryParams : 'PAGE_CURRICULUM_ANGULAR'         },
  {  id: 0,  path: 'GridParam'             , component: GridParamComponent                  , caption: ' Curriculum - Node.js    / Javascript'        , queryParams : 'PAGE_CURRICULUM_NODE_JS'         },
  {  id: 0,  path: 'GridParam'             , component: GridParamComponent                  , caption: ' Curriculum - SpringBoot / Java'              , queryParams : 'PAGE_CURRICULUM_SPRING_BOOT_JAVA'},
  {  id: 0,  path: 'GridParam'             , component: GridParamComponent                  , caption: ' Curriculum - Django     / Python'            , queryParams : 'PAGE_CURRICULUM_DJANGO_PYTHON'   },
  {  id: 0,  path: 'GridParam'             , component: GridParamComponent                  , caption: ' Curriculum - .Net core  / C#'                , queryParams : 'PAGE_CURRICULUM_NET_CORE'        },
  {  id: 0,  path: 'GridParam'             , component: GridParamComponent                  , caption: ' Demos / Language - Angular'                  , queryParams : 'PAGE_DEMOS_ANGULAR_JAVASCRIPT'   },
  {  id: 0,  path: 'GridParam'             , component: GridParamComponent                  , caption: ' Demos / Language - C++'                      , queryParams : 'PAGE_DEMOS_NETCORE_CPP'          },
  {  id: 0,  path: 'GridParam'             , component: GridParamComponent                  , caption: ' Demos / Language - .NET CORE / C#'           , queryParams : 'PAGE_DEMOS_NETCORE_CSHARP'       },
  {  id: 0,  path: 'GridParam'             , component: GridParamComponent                  , caption: ' Demos / Language - Node.js / Javascript'     , queryParams : 'PAGE_DEMOS_NODEJS_JAVASCRIPT'    },
  {  id: 0,  path: 'GridParam'             , component: GridParamComponent                  , caption: ' Demos / Language - SpringBoot / Java'        , queryParams : 'PAGE_DEMOS_SPRING_BOOT_JAVA'     },
  {  id: 0,  path: 'GridParam'             , component: GridParamComponent                  , caption: ' Demos / Language - Django / Python'          , queryParams : 'PAGE_DEMOS_DJANGO_PYTHON'        },
  {  id: 0,  path: 'PageUrlList'           , component: PageUrlListComponent                , caption: ''                                             , queryParams : '' },
  {  id: 0,  path: 'Landing'               , component: LandingComponent                    , caption: ''                                             , queryParams : '' }, 
  {  id: 0,  path: '**'                    , component: PageNotFoundComponent               , caption: ''                                             , queryParams : '' },
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
