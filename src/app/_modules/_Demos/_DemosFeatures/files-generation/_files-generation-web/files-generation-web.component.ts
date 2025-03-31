import { Component          } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/_components/base/base.component';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { SpeechService } from 'src/app/_services/speechService/speech.service';
import { CustomErrorHandler } from 'src/app/app.component';
//
@Component({
  selector: 'app-files-generation-web',
  templateUrl: './files-generation-web.component.html',
  styleUrls: ['./files-generation-web.component.css']
})
//
export class FilesGenerationWebComponent extends BaseComponent {
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
                 "[DEMOS - GENERAR ARCHIVOS]",
                 "PAGE_DEMOS_FILE_GENREATION_INDEX",
           );
       }

}
