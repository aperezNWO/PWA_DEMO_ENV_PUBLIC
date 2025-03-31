import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/_components/base/base.component';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { SpeechService } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-game-web',
  templateUrl: './game-web.component.html',
  styleUrls: ['./game-web.component.css']
})
export class GameWebComponent extends BaseComponent {
     constructor(
           backendService : BackendService,
           route          : ActivatedRoute,
           speechService  : SpeechService,
       )
       {
           //
           super(backendService,
                 route,
                 speechService,
                 "[DEMOS - GAMES]",
                 "PAGE_DEMOS_GAMES_INDEX",
           );
       }

}
