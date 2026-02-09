import { Component              } from '@angular/core';
import { ActivatedRoute         } from '@angular/router';
import { BaseReferenceComponent } from 'src/app/_components/base-reference/base-reference.component';
import { HanoiEngine            } from 'src/app/_engines/hanoi-engine';
import { BackendService         } from 'src/app/_services/BackendService/backend.service';
import { ConfigService          } from 'src/app/_services/__Utils/ConfigService/config.service';
import { SpeechService          } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { PAGE_GAMES_HANOI_2D, PAGE_GAMES_SUDOKU, PAGE_TITLE_LOG } from 'src/app/_models/common';

@Component({
  selector: 'app-game-hanoi-auto',
  templateUrl: './game-hanoi-auto.component.html',
  styleUrl: './game-hanoi-auto.component.css' ,
  providers   : [
    { 
      provide : PAGE_TITLE_LOG, 
      useValue: PAGE_GAMES_HANOI_2D 
    },
  ]
})
export class GameHanoiAutoComponent extends BaseReferenceComponent {

  //
  constructor(
                  public  hanoiEngine               : HanoiEngine,
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
            PAGE_GAMES_SUDOKU,
      )
  }
  //
  ngOnInit() {
      //
      this.hanoiEngine.manual_resetGame();
  
  }
}
