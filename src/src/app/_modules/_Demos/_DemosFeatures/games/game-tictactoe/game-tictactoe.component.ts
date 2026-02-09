import { Component              } from '@angular/core';
import { ActivatedRoute         } from '@angular/router';
import { BaseReferenceComponent } from 'src/app/_components/base-reference/base-reference.component';
import { BackendService         } from 'src/app/_services/BackendService/backend.service';
import { SpeechService          } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { ConfigService          } from 'src/app/_services/__Utils/ConfigService/config.service';
import { PAGE_GAMES_TIC_TAC_TOE, PAGE_TITLE_LOG, PAGE_TITLE_NO_SOUND } from 'src/app/_models/common';


@Component({  
  selector    : 'app-game-tictactoe',
  templateUrl : './game-tictactoe.component.html',
  styleUrls   : ['./game-tictactoe.component.css'],
  providers   : [
      { 
        provide : PAGE_TITLE_LOG, 
        useValue: PAGE_GAMES_TIC_TAC_TOE 
      },
  ]
})
export class GameTictactoeComponent extends BaseReferenceComponent {
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
            PAGE_TITLE_NO_SOUND,
      )
  }
}
