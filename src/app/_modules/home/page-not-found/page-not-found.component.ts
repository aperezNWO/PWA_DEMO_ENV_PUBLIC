import { Component     } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/_components/base/base.component';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { SpeechService } from 'src/app/_services/speechService/speech.service';
//
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
//
export class PageNotFoundComponent  extends BaseComponent {
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
                "[PAGINA NO ENCONTRADA]",
                "PAGE_NOT_FOUND",
          );
      }
  }
