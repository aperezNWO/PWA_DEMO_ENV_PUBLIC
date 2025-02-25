import { Component   } from '@angular/core';
import { HanoiEngine } from 'src/app/_engines/hanoi-engine';

@Component({
  selector: 'app-game-hanoi-auto',
  templateUrl: './game-hanoi-auto.component.html',
  styleUrl: './game-hanoi-auto.component.css'
})
export class GameHanoiAutoComponent {

  constructor(public hanoiEngine : HanoiEngine)
  {

  }

  //
  ngOnInit() {
      //
      this.hanoiEngine.manual_resetGame();
  
  }
}
