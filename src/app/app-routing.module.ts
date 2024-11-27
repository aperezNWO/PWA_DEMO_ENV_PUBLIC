import { NgModule             } from '@angular/core';
import { RouterModule, Routes            } from '@angular/router';
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
import { HanoiTowersComponent            } from './_modules/games/game-hanoi/game-hanoi.component';
import { GameHanoiAutoComponent          } from './_modules/games/game-hanoi-auto/game-hanoi-auto.component';
import { OcrComponent                    } from './_modules/miscelaneous/ocr/ocr.component';
import { ChatComponent                   } from './_modules/miscelaneous/chat/chat/chat.component';
import { ChartComponent                  } from './_modules/miscelaneous/chart/chart.component';
import { OcrPhotoCaptureComponent        } from './_modules/miscelaneous/ocr-photo-capture/ocr-photo-capture.component';
import { MiscelaneousComponent           } from './_modules/miscelaneous/miscelaneous/miscelaneous.component';
//
const routes: Routes = [
  {  path: 'Home'                  , component: HomeWebComponent                      },
  {  path: ''                      , component: HomeWebComponent                      },
  {  path: 'AAboutWeb'             , component: AAboutWebComponent                    },
  {  path: 'Contact'               , component: ContactComponent                      },
  {  path: 'ContactForm'           , component: ContactFormComponent                  },
  {  path: 'TechnicalSpecs'        , component: TechnicalSpecsComponent               },
  {  path: 'Topics'                , component: TopicsComponent                       },
  {  path: 'AlgorithmWeb'          , component: AlgorithmWebComponent                 },
  {  path: 'AlgorithmRegEx'        , component: AlgorithmRegExComponent               },
  {  path: 'AlgorithmSort'         , component: AlgorithmSortComponent                },
  {  path: 'AlgorithmDijkstra'     , component: AlgorithmDijkstraComponent            },
  {  path: 'FilesGenerationWeb'    , component: FilesGenerationWebComponent           },
  {  path: 'FilesGenerationXLS'    , component: FilesGenerationXLSComponent           },
  {  path: 'FilesGenerationCSV'    , component: FilesGenerationCSVComponent           },
  {  path: 'FilesGenerationPDF'    , component: FilesGenerationPDFComponent           },
  {  path: 'FilesGenerationZIP'    , component: FilesGenerationZIPComponent           },         
  {  path: 'GamesSudoku'           , component: SudokuComponent                       },
  {  path: 'GamesTicTacToe'        , component: GameTictactoeComponent                },
  {  path: 'GamesHanoi'            , component: HanoiTowersComponent                  },
  {  path: 'GamesHanoiAuto'        , component: GameHanoiAutoComponent                },
  {  path: 'GamesWeb'              , component: GameWebComponent                      },
  {  path: 'Chat'                  , component: ChatComponent                         },
  {  path: 'Chart'                 , component: ChartComponent                        },
  {  path: 'OcrPhotoCapture'       , component: OcrPhotoCaptureComponent              },
  {  path: 'Ocr'                   , component: OcrComponent                          },
  {  path: 'Miscelaneous'          , component: MiscelaneousComponent                 },
  {  path: '**'                    , component: PageNotFoundComponent                 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
    //
}
