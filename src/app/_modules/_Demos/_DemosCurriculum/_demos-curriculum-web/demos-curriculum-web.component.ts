import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/_components/base/base.component';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { SpeechService } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-demos-curriculum-web',
  templateUrl: './demos-curriculum-web.component.html',
  styleUrl: './demos-curriculum-web.component.css'
})
export class DemosCurriculumWebComponent extends BaseComponent {
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
                 "[DEMOS - CURRICULUM]",
                 "PAGE_DEMOS_CURRICIULUM_INDEX",
           );
       }

}
