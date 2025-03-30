import { Component      } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent  } from 'src/app/_components/base/base.component';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { SpeechService  } from 'src/app/_services/speechService/speech.service';

@Component({  
  selector: 'app-game-tictactoe',
  templateUrl: './game-tictactoe.component.html',
  styleUrls: ['./game-tictactoe.component.css']
})
export class GameTictactoeComponent extends BaseComponent {
  //
  constructor(
                  public  override route            : ActivatedRoute,
                  public  override speechService    : SpeechService,
                  public  override backendService   : BackendService) 
  { 
      //
      super(backendService,
            route,
            speechService,
            "[GAMES - TIC TAC TOE]"
      )
  }
}
