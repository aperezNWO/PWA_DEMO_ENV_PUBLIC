import { Component, OnInit, AfterViewInit , ViewChild,effect } from '@angular/core';
import { CommonModule                                 } from '@angular/common';
import { ListItem                                     } from 'src/app/_models/entity.model';
import { SquareComponent                              } from "../square/square.component";
import { TicTacToeEngine                              } from 'src/app/_engines/tictactoe.engine';
import { SpeechService                                } from 'src/app/_services/__Utils/SpeechService/speech.service';
//
@Component({
    selector: 'app-board',
    standalone: true,
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css'],
    imports: [SquareComponent, CommonModule]
})
export class BoardComponent implements OnInit, AfterViewInit {
  //
  protected tituloSource                   : string = '¿Who Starts?';
  protected __SourceList                   : any;
  @ViewChild('_SourceList')   _sourceList  : any;
  //
  protected IsNewGame                      : boolean = false;
  protected showBoard                      : boolean = false;
  //
  constructor(public ticTacToeEngine : TicTacToeEngine,
              public speechService   : SpeechService
  ) 
  {
    // Define an effect to react to changes in the signal
    effect(() => {
      if (this.ticTacToeEngine.message())
          this.speechService.speakTextCustom(this.ticTacToeEngine.message());
    });
  }
  //
  ngOnInit(): void {
    // INITIALIZE DATA
    //console.log("[TIC-TAC-TOE - INICIAR VALORES");
    //
    this.__SourceList = new Array();
    this.__SourceList.push(new ListItem(0, '(CHOOSE OPTION...)'   , false));
    this.__SourceList.push(new ListItem(this.ticTacToeEngine.COMPUTER, '[Computer]'     , true));
    this.__SourceList.push(new ListItem(this.ticTacToeEngine.HUMAN   , '[Player]'     , false));
    //
    this.ticTacToeEngine.initialise();
  }
  //
  ngAfterViewInit() {
    // INITIALIZE VIEW
    this._sourceList.nativeElement.options.selectedIndex = 1;
  }
  //
  _tituloSourceChanged():void{
    //
  }
  //
  makeMove(n: number): void {
    //
    //console.log(`[TIC-TAC-TOE] - [Click on cel : {${n}}] `);
    //
    this.ticTacToeEngine.makeMove(n);
  }
  //
  newGame():void{
    //
    //console.log("[GAME - TIC-TAC-TOE] - [NEW GAME]")
    //
    this.ticTacToeEngine.initialise();
    //
    this.IsNewGame = true;
    //
    this.showBoard = false;
  }
  //
  startGame():void {
    //
    //console.log("[GAME - TIC-TAC-TOE] - [START GAME]")
    //
    let selectedvalue: number = this._sourceList.nativeElement.options[this._sourceList.nativeElement.options.selectedIndex].value;
    //
    if (selectedvalue == this.ticTacToeEngine.COMPUTER ) {
        //
        this.ticTacToeEngine.makeComputerMove();
    }
    //
    this.IsNewGame = false;
    //
    this.showBoard = true;
  }
};
