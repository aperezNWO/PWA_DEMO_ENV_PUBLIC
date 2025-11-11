import { Component, OnInit         } from '@angular/core';
import { ActivatedRoute            } from '@angular/router';
import { BaseComponent             } from 'src/app/_components/base/base.component';
import { PAGE_GAMES_TIC_TAC_TOE_AI } from 'src/app/_models/common';
import { _languageName } from 'src/app/_models/entity.model';
import { BackendService            } from 'src/app/_services/BackendService/backend.service';
import { ConfigService             } from 'src/app/_services/ConfigService/config.service';
import { SpeechService             } from 'src/app/_services/speechService/speech.service';
import { _environment              } from 'src/environments/environment';

export interface TicTacToeResponse {
  finalBoard: number[];
  moves: number[];
  winner: string;
  moveCount: number;
  historyCount: number;
  history: number[][];
}

@Component({
  selector: 'app-tic-tac-toe-board-ai',
  templateUrl: './tic-tac-toe-board-ai.component.html',
  styleUrl: './tic-tac-toe-board-ai.component.css'
})
export class TicTacToeBoardAiComponent extends BaseComponent implements OnInit {
  //
  gameHistory: number[][] = [];
  currentStep  = 0;
  loading      = true;
  error        = '';
  aiMode       = 3; 
  temperature  = 1.5;
  //
  private animationInterval: any;
  //
  public __languajeList: any; 
  //
  public __generateSourceList : any;
  //
  constructor(
                  public  override configService    : ConfigService,
                  public  override route            : ActivatedRoute,
                  public  override speechService    : SpeechService,
                  public  override backendService   : BackendService) 
  {  
      //
      super(configService,
            backendService,
            route,
            speechService,
            PAGE_GAMES_TIC_TAC_TOE_AI,
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
        this.__languajeList.push(new _languageName(0, '(.NET Core/C++ -> Expert        ) '  , true ,  "CPP"  ));
        this.__languajeList.push(new _languageName(1, '(.NET Core/C++ -> Creative      ) '  , false,  "CPP"  ));
        this.__languajeList.push(new _languageName(2, '(.NET Core/C++ -> Min Max       ) '  , false,  "CPP"  ));
        this.__languajeList.push(new _languageName(3, '(.NET Core/C++ -> Random Player ) '  , false,  "CPP"  ));
        this.__languajeList.push(new _languageName(4, '(Python        -> Tensorflow    ) '  , false,  "PY"   ));
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
                  this.aiMode                          = this.__languajeList[index]._index;
                  
                  break;
          
                }
            }
        } 
        else 
        {
            this.aiMode = 0; // (.NET Core/C++ -> Creative ) 
        }
        //
        this.loadGame();
    }
    ,complete        : ()                => {
        //
     },
    });
  }
  //
  getConfigValue(key: string) {
    //
    let jsonData : string = JSON.parse(JSON.stringify(_environment.externalConfig))[key];
    //
    return jsonData;
  }
  //
  loadGame() {
    //
    this.loading     = true;
    this.error       = '';
    this.currentStep = 0;
    //
    if (this.animationInterval) clearInterval(this.animationInterval);
    //
    const url    = `${this.getConfigValue('baseUrlNetCoreCPPEntry')}api/tictactoe/play?aiMode=${this.aiMode}&temperature=${this.temperature}`;
    //
    console.log(` aiMode : ${this.aiMode}`);  
    //
    //
    console.log(` url    : ${url}`);  
    //
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: TicTacToeResponse) => {
        this.gameHistory = data.history;
        this.loading = false;
        this.animateGame();
      })
      .catch(err => {
        this.error = 'Failed to load game: ' + err.message;
        this.loading = false;
        console.error('Fetch error:', err);
      });
  }

  animateGame() {
    this.currentStep = 0;
    this.animationInterval = setInterval(() => {
      if (this.currentStep < this.gameHistory.length - 1) {
        this.currentStep++;
      } else {
        clearInterval(this.animationInterval);
      }
    }, 800); // 0.8 seconds per move
  }

  getCellSymbol(cell: number): string {
    return cell === 1 ? 'X' : cell === -1 ? 'O' : '';
  }

  getCellClass(cell: number, index: number): string {
    let base = 'cell ';
    if (cell === 1) base += 'x-cell';
    if (cell === -1) base += 'o-cell';
    if (cell === 0) base += 'empty-cell';
    return base;
  }

  onReplay() {
    this.loadGame();
  }

onAiModeChange(event: Event): void {
  const target = event.target;
  if (target instanceof HTMLSelectElement) {
    this.aiMode = Number(target.value);
  }
}

onTempChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input) {
    this.temperature = parseFloat(input.value);
  }
}

  getCurrentWinner(): string {
    const board = this.gameHistory[this.currentStep];
    const wins = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    for (const [a,b,c] of wins) {
      if (board[a] !== 0 && board[a] === board[b] && board[b] === board[c]) {
        return board[a] === 1 ? 'X' : 'O';
      }
    }

    // Draw?
    if (board.every(cell => cell !== 0)) return 'Draw';

    return 'In Progress';
  }
}

