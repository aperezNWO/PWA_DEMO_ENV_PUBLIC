import { Injectable,  ViewChild } from "@angular/core";
import { Observable             } from "rxjs";
import { BehaviorSubject        } from "rxjs/internal/BehaviorSubject";
import { ListItem               } from "../_models/entity.model";
//
export class DiskInfo
{
  //
  constructor(public value : number, public graph : string)
  {
      //
  }
}
//
export class HanoiStep
{
  constructor(public n: number, public from: string, public to: string)
  {
     //
  }
}
//
export interface Disk {
    size: number;
}
//
@Injectable({
    providedIn: 'root',
})
export class HanoiEngine
{
  ////////////////////////////////////////////////////////////////////
  public    towerA               : Map<number,( DiskInfo | undefined)> = new Map<number,( DiskInfo | undefined)>();
  public    towerB               : Map<number,( DiskInfo | undefined)> = new Map<number,( DiskInfo | undefined)>();
  public    towerC               : Map<number,( DiskInfo | undefined)> = new Map<number,( DiskInfo | undefined)>();
  public    steps                : string[]    = [];
  public    _steps               : HanoiStep[] = [];
  public    _stepsIndex          : number      = 0;
  public    _startGame           : boolean     = true;
  public    _delayInMilliseconds : number      = 1500;
  public    _stepsAmt            : number      = 0;
  public    _diskAmt             : number      = 0;
  public    _timeoutId           : any;
  public    _diskAmtList         : any;
  public   tituloDiskAmtList     : string     = "Cantidad de Discos";
  @ViewChild('__diskAmtList') __diskAmtList: any;
  ////////////////////////////////////////////////////////////////////
  private gameState$    : BehaviorSubject<Disk[][]>         = new BehaviorSubject<Disk[][]>([
    [{ size: 3 }, { size: 2 }, { size: 1 }],
    [],
    []
  ]);
  public  towers$        : Observable<Disk[][]>            = this.gameState$.asObservable();
  private movesSubject$  : BehaviorSubject<number>         = new BehaviorSubject<number>(0);
  public  moves$         : Observable<number>              = this.movesSubject$.asObservable();
  private selectedTower  : (number | null)                 = null;
  ////////////////////////////////////////////////////////////////////
  constructor()
  {
          //
          this._diskAmtList = new Array();
          this._diskAmtList.push(new ListItem(0,"(seleccione opcion...)",false));
          this._diskAmtList.push(new ListItem(3,"3",true));
          this._diskAmtList.push(new ListItem(4,"4",false));
  }
  manual_selectTower(towerIndex: number) {
    if (this.selectedTower === null) {
      this.selectedTower = towerIndex;
    } else {
      this.manual_moveDisk(this.selectedTower, towerIndex);
      this.selectedTower = null;
    }
  }
  //
  manual_moveDisk(fromTower: number, toTower: number) {
    const currentState = this.gameState$.getValue();
    const diskToMove = currentState[fromTower].pop();

    if (diskToMove) {
      const targetTower = currentState[toTower];
      if (targetTower.length === 0 || targetTower[targetTower.length - 1].size > diskToMove.size) {
        targetTower.push(diskToMove);
        this.gameState$.next(currentState);
        this.movesSubject$.next(this.movesSubject$.getValue() + 1);
        this._checkWinCondition();
      } else {
        currentState[fromTower].push(diskToMove);
      }
    }
  }
  //
  manual_resetGame() {
    this.gameState$.next([
      [{ size: 3 }, { size: 2 }, { size: 1 }],
      [],
      []
    ]);
    this.movesSubject$.next(0);
    this.selectedTower = null;

    //
    this.auto_newGame();
  }
  //
  public _checkWinCondition() {
    const currentState = this.gameState$.getValue();
    if (currentState[2].length === 3) {
      console.log('Congratulations! You solved the puzzle!');
      // You can add more win condition logic here
      return true;
    }
    return false;
  }
////////////////////////////////////////////////////////////////////
  //
  auto_printSteps()
  {
    // END RECURSION
    if (this._stepsIndex > this._stepsAmt)
    {
      //
      clearTimeout(this._timeoutId); 
      //
      return;
    }
    //
    if (this._stepsIndex == 0)
    {
      //
      this.steps.push("[BEGIN STEPS]");
    }
    //
    if (this._steps[this._stepsIndex])
    {
      //
      let scrollableElement = document.querySelector('.steps-container');
      //
      if (scrollableElement)
          scrollableElement.scrollTop = scrollableElement.scrollHeight;
      //      
      let hanoiStep   : HanoiStep = this._steps[this._stepsIndex];
      let n           : number    = hanoiStep.n;
      let from        : string    = hanoiStep.from;
      let to          : string    = hanoiStep.to;
      //
      let message : string = `Step ${(this._stepsIndex + 1)} of ${this._stepsAmt}. Move disk ${n} from Tower ${from} to Tower ${to}`;
      //
      console.log(message);
      // 
      this.steps.push(message);
      // 
      this.auto_makeMove(hanoiStep);
      //
      let n_from : number = hanoiStep.from.charCodeAt(0) - 65
      let n_to   : number = hanoiStep.to.charCodeAt(0)   - 65; 
      //
      //
      console.log(` Manuel Step ${n_from} to ${n_to} `);
      //
      this.manual_moveDisk(n_from, n_to);
    }
    //    
    this._stepsIndex++;
    //
    if ((this._stepsIndex) == this._stepsAmt)
    {
      //
      this.steps.push("[END STEPS]");
      //
    }
    //
    this._timeoutId = setTimeout(() => {
        
        //
        this.auto_printSteps();  

    }, this._delayInMilliseconds); // Delay each move by 1 second        
  }
  //
  auto_makeMove(hanoiStep: HanoiStep) {
    let _n           : number = hanoiStep.n;
    let _from        : string = hanoiStep.from;
    let _to          : string = hanoiStep.to;
    //    
    let diskInfo    : DiskInfo | undefined = undefined;
    // 
    switch (_from) {
        case 'A':
          diskInfo = this.towerA.get(_n);
          this.towerA.set(_n, new DiskInfo(_n,"-"));
          break;
        case 'B':
          diskInfo = this.towerB.get(_n);
          this.towerB.set(_n, new DiskInfo(_n,"-"));
          break;
        case 'C':
          diskInfo = this.towerC.get(_n);
          this.towerC.set(_n, new DiskInfo(_n,"-"));
          break;
    }
    //
    switch (_to) {
      case 'A':
        this.towerA.set(_n,diskInfo);
        break;
      case 'B':
        this.towerB.set(_n,diskInfo);
        break;
      case 'C':
        this.towerC.set(_n,diskInfo);
        break;
    };
  }
  //
  auto_saveStep(n: number, from: string, to: string) {
    // Implement logic to move a single disk from 'from' tower to 'to' tower
    let hanoiStep : HanoiStep = new HanoiStep(n,from,to);
    //
    this._steps.push(hanoiStep);
    //
    this._stepsAmt++;
  }
  //
  auto_towerOfHanoi(n : number, from_rod : string, to_rod : string, aux_rod : string ):void
  {
      if (n === 0) {
        return;
      }
      this.auto_towerOfHanoi(n - 1, from_rod, aux_rod, to_rod);
      this.auto_saveStep(n,from_rod,to_rod);
      this.auto_towerOfHanoi(n - 1, aux_rod, to_rod, from_rod);
  }
  //
  auto_newGame():void {
    //
    console.log("[HANOI TOWERS] - [NEW GAME]")
    //
    //this._diskAmt   = parseInt(this.__diskAmtList.nativeElement.options[this.__diskAmtList.nativeElement.options.selectedIndex].value);
    //
    this._diskAmt   = 3;
    //
    if (this._diskAmt === 0)
        return;
    //
    this.towerA      =  new Map<number,( DiskInfo | undefined)>();
    let  graph      : string = "";
    for (let i= 1; i <= this._diskAmt; i++) {
      graph = graph + "*";
      this.towerA.set(i,new DiskInfo(i,graph));
    }  
    //
    this.towerB    =  new Map<number,( DiskInfo | undefined)>();
    for (let i= 1; i <= this._diskAmt; i++) {
      this.towerB.set(i,new DiskInfo(i,"-"));
    }  
    //
    this.towerC    =  new Map<number,( DiskInfo | undefined)>();
    for (let i= 1; i <= this._diskAmt; i++) {
      this.towerC.set(i,new DiskInfo(i,"-"));
    }  
    //
    this.steps        = [];
    this._steps       = [];
    this._stepsIndex  = 0;
    this._stepsAmt    = 0;
    //
    this._startGame  = false;
  }
  //  
  auto_startGame():void {
    //
    this.auto_newGame();
    //
    console.log("[HANOI TOWERS] - [START GAME]")
    //
    if (this._diskAmt === 0)
      return;
    //
    this._startGame = true;
    // A, B and C are names of rods
    this.auto_towerOfHanoi(this._diskAmt, 'A', 'C', 'B');
    //
    this.auto_printSteps();
  }
}