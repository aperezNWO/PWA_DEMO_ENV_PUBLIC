import { Component          } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent      } from 'src/app/_components/base/base.component';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { SpeechService } from 'src/app/_services/speechService/speech.service';
import { CustomErrorHandler } from 'src/app/app.module';
//
@Component({
  selector: 'app-algorithm-web',
  templateUrl: './algorithm-web.component.html',
  styleUrls: ['./algorithm-web.component.css']
})
//
export class AlgorithmWebComponent extends BaseComponent {
  //
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
            "[DEMOS - ALGORITMOS]",
            "PAGE_ALGORITMOS_INDEX",
      );
  }
}