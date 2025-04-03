import { Component      } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent  } from 'src/app/_components/base/base.component';
import { HanoiEngine    } from 'src/app/_engines/hanoi-engine';
import { PAGE_GAMES_HANOI_2D } from 'src/app/_models/common';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { ConfigService  } from 'src/app/_services/ConfigService/config.service';
import { SpeechService  } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-game-hanoi-auto',
  templateUrl: './game-hanoi-auto.component.html',
  styleUrl: './game-hanoi-auto.component.css'
})
export class GameHanoiAutoComponent extends BaseComponent {

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
            PAGE_GAMES_HANOI_2D,
      )
  }
  //
  ngOnInit() {
      //
      this.hanoiEngine.manual_resetGame();
  
  }
}
