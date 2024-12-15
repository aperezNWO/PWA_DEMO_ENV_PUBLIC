import { NgModule                        } from '@angular/core';
import { Route, RouterModule             } from '@angular/router';
import { HomeWebComponent                } from './_modules/home/home-web/home-web.component';
import { PageNotFoundComponent           } from './_modules/home/page-not-found/page-not-found.component';
import { ContactComponent                } from './_modules/about/contact/contact.component';
import { ContactFormComponent            } from './_modules/about/contact-form/contact-form.component';
import { AAboutWebComponent              } from './_modules/about/a-about-web/a-about-web.component';
import { TopicsComponent                 } from './_modules/about/topics/topics.component';
import { TechnicalSpecsComponent         } from './_modules/about/technicalspecs/technical-specs/technical-specs.component';
import { FilesGenerationWebComponent     } from './_modules/files-generation/files-generation-web/files-generation-web.component';
import { FilesGenerationXLSComponent     } from './_modules/files-generation/files-generation-xls/files-generation-xls.component';
import { FilesGenerationCSVComponent     } from './_modules/files-generation/files-generation-csv/files-generation-csv.component';
import { FilesGenerationPDFComponent     } from './_modules/files-generation/files-generation-pdf/files-generation-pdf.component';
import { FilesGenerationZIPComponent     } from './_modules/files-generation/files-generation-zip/files-generation-zip.component';
import { AlgorithmDijkstraComponent      } from './_modules/algorithm/algorithm-dijkstra/algorithm-dijkstra.component';
import { AlgorithmWebComponent           } from './_modules/algorithm/algorithm-web/algorithm-web.component';
import { AlgorithmRegExComponent         } from './_modules/algorithm/algorithm-reg-ex/algorithm-reg-ex.component';
import { AlgorithmSortComponent          } from './_modules/algorithm/algorithm-sort/algorithm-sort.component';
import { SudokuComponent                 } from './_modules/games/game-sudoku/game-sudoku.component';
import { GameTictactoeComponent          } from './_modules/games/game-tictactoe/game-tictactoe.component';
import { GameWebComponent                } from './_modules/games/game-web/game-web.component';
import { GameHanoiAutoComponent          } from './_modules/games/game-hanoi-auto/game-hanoi-auto.component';
import { ChatComponent                   } from './_modules/miscelaneous/chat/chat/chat.component';
import { ChartComponent                  } from './_modules/miscelaneous/chart/chart.component';
import { OcrPhotoCaptureComponent        } from './_modules/miscelaneous/ocr-photo-capture/ocr-photo-capture.component';
import { MiscelaneousComponent           } from './_modules/miscelaneous/miscelaneous/miscelaneous.component';
import { IndexComponent                  } from './_modules/home/index/index.component';
export interface _Route extends Route
{
    caption : string;
}

//
export const routes: _Route[] = [
  {  path: 'Home'                  , component: HomeWebComponent                    , caption: ' Home'                                        },
  {  path: 'Index'                 , component: IndexComponent                      , caption: ' Index'                                       },
  {  path: ''                      , component: HomeWebComponent                    , caption: ''                                             },
  {  path: 'AAboutWeb'             , component: AAboutWebComponent                  , caption: ' About- Main Page'                            },
  {  path: 'Contact'               , component: ContactComponent                    , caption: ' Contact - Main Page'                         },
  {  path: 'ContactForm'           , component: ContactFormComponent                , caption: ' Contact Form'                                },
  {  path: 'TechnicalSpecs'        , component: TechnicalSpecsComponent             , caption: ' Technical Specifications'                    },
  {  path: 'Topics'                , component: TopicsComponent                     , caption: ' Topics - Main Page'                          },
  {  path: 'AlgorithmWeb'          , component: AlgorithmWebComponent               , caption: ' Algoritmos - Main Page'                      },
  {  path: 'AlgorithmRegEx'        , component: AlgorithmRegExComponent             , caption: ' Algoritmos - Regular Expression'             },
  {  path: 'AlgorithmSort'         , component: AlgorithmSortComponent              , caption: ' Algoritmos - Sort'                           },
  {  path: 'AlgorithmDijkstra'     , component: AlgorithmDijkstraComponent          , caption: ' Algoritmos - Dijkstra - distancia más corta' },
  {  path: 'FilesGenerationWeb'    , component: FilesGenerationWebComponent         , caption: ' File Generatin  - Main Page'                 },
  {  path: 'FilesGenerationXLS'    , component: FilesGenerationXLSComponent         , caption: ' File Generation - XLS'                       },
  {  path: 'FilesGenerationCSV'    , component: FilesGenerationCSVComponent         , caption: ' File Generation - CSV'                       },
  {  path: 'FilesGenerationPDF'    , component: FilesGenerationPDFComponent         , caption: ' File Generation - PDF'                       },
  {  path: 'FilesGenerationZIP'    , component: FilesGenerationZIPComponent         , caption: ' File Generation - ZIP    '                   },
  {  path: 'GamesSudoku'           , component: SudokuComponent                     , caption: ' Games  - Sudoku'                             },
  {  path: 'GamesTicTacToe'        , component: GameTictactoeComponent              , caption: ' Games  - TicTacToe'                          },
  {  path: 'GamesHanoiAuto'        , component: GameHanoiAutoComponent              , caption: ' Games  - Hanoi'                              },
  {  path: 'GamesWeb'              , component: GameWebComponent                    , caption: ' Games  - Main Page'                          },
  {  path: 'Chat'                  , component: ChatComponent                       , caption: ' Chat Demo'                                   },
  {  path: 'Chart'                 , component: ChartComponent                      , caption: ' Chart Demo'                                  },
  {  path: 'OcrPhotoCapture'       , component: OcrPhotoCaptureComponent            , caption: ' Ocr Photo Capture'                           },
  {  path: 'Miscelaneous'          , component: MiscelaneousComponent               , caption: ' Miscelaneous - Main Page'                    },
  {  path: '**'                    , component: PageNotFoundComponent               , caption: ''                                             },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
    //
}
