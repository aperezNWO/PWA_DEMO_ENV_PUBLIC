import { Component    } from '@angular/core';
import { _environment } from 'src/environments/environment';

@Component({
  selector: 'app-llmlist',
  templateUrl: './llmlist.component.html',
  styleUrl: './llmlist.component.css'
})
export class LLMListComponent {
      public aiPrompts : any[] = [];
      constructor()
      {
        console.log('AI Prompts: ' + JSON.stringify(_environment.LLMList));

        this.aiPrompts = _environment.LLMList;
      }
}
