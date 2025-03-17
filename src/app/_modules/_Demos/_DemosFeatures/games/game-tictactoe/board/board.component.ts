import { Component, OnInit, AfterViewInit , ViewChild } from '@angular/core';
import { CommonModule                                 } from '@angular/common';
import { ListItem                                     } from 'src/app/_models/entity.model';
import { SquareComponent                              } from "../square/square.component";
import { TicTacToeEngine                              } from 'src/app/_engines/game.engine';
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
  protected tituloSource                   : string = '¿Quien Inicia?';
  protected __SourceList                   : any;
  @ViewChild('_SourceList')   _sourceList  : any;
  //
  protected IsNewGame                      : boolean = false;
  protected showBoard                      : boolean = false;
  //
  public    ticTacToeEngine                : TicTacToeEngine = new TicTacToeEngine();
  //
  constructor() {
    //
  }
  //
  ngOnInit(): void {
    // INITIALIZE DATA
    //console.log("[TIC-TAC-TOE - INICIAR VALORES");
    //
    this.__SourceList = new Array();
    this.__SourceList.push(new ListItem(0, '(SELECCIONE OPCION..)'   , false));
    this.__SourceList.push(new ListItem(this.ticTacToeEngine.COMPUTER, '[MAQUINA]'     , true));
    this.__SourceList.push(new ListItem(this.ticTacToeEngine.HUMAN   , '[JUGADOR]'     , false));
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
