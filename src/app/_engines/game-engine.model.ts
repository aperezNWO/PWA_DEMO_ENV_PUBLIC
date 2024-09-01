//
export class TicTacToeEngine
{
    //
    public    readonly COMPUTER     : number = 1;
    public    readonly HUMAN        : number = 2;
    public    readonly COMPUTERMOVE : ('X' | 'O' | null) = 'O';  // Computer will move with 'O'
    public    readonly HUMANMOVE    : ('X' | 'O' | null) = 'X';  // and human with 'X'
    private   readonly SIDE         : number  = 3;
    private   readonly boardSurface : number  = (this.SIDE*this.SIDE);
    private            whoseTurn    : number  = this.HUMAN;
    private            moveIndex    : number  = 0;    
    private            board        : ('X' | 'O' | null)[][] = [];
    public             winner       : ('X' | 'O' | null)    = null;
    public             squares      : ('X' | 'O' | null)[]  = Array(this.boardSurface).fill(null);
    public             message      : string = '';
    //    
    constructor()
    {
        this.initialise();
    }
    //
    initialise():void {

        //
        this.squares = [];
        this.squares = Array(9).fill(null);
        //
        this.board   = [];
        //
        for (let i = 0; i < this.SIDE; i++) {
            //
            const row: ('X' | 'O' | null)[] = [];
            //
            for (let j = 0; j < this.SIDE; j++) {
                row.push(null);
            }
            //
            this.board.push(row);
        }
        //
        this.winner    = null;
        this.moveIndex = 0;
        this.message   = '';
    }
    //
    declareWinner(whoseTurn: number): void 
    {
        if (whoseTurn == this.COMPUTER) 
        {
            this.message = "[ganó COMPUTADOR]";
            this.winner  = this.COMPUTERMOVE;
        }
        else {
            this.message = "[ganó HUMANO]";
            this.winner  = this.HUMANMOVE;
        }
    }
    //
    rowCrossed(board : ('X' | 'O' | null)[][]) {
        for (let i = 0; i < this.SIDE; i++) {
        if (
            board[i][0] == board[i][1] &&
            board[i][1] == board[i][2] &&
            board[i][0] != null
        )
            return true;
        }
        return false;
    }
    //
    columnCrossed(board : ('X' | 'O' | null)[][]) {
        for (let i = 0; i < this.SIDE; i++) {
        if (
            board[0][i] == board[1][i] &&
            board[1][i] == board[2][i] &&
            board[0][i] != null
        )
            return true;
        }
        return false;
    }
    //
    diagonalCrossed(board : ('X' | 'O' | null)[][]) {
        if (
        board[0][0] == board[1][1] &&
        board[1][1] == board[2][2] &&
        board[0][0] != null
        )
        return true;
        if (
        board[0][2] == board[1][1] &&
        board[1][1] == board[2][0] &&
        board[0][2] != null
        )
        return true;
        return false;
    }
    //
    gameOver(board : ('X' | 'O' | null)[][]) {
        return (
        this.rowCrossed(board)      ||
        this.columnCrossed(board)   ||
        this.diagonalCrossed(board)
        );
    }
    //
    minimax(board : ('X' | 'O' | null)[][], depth : number, isAI : boolean) : number | undefined {
        //
        let score     : number | undefined = 0;
        let bestScore : number | undefined = 0;
        //
        if (this.gameOver(board) == true) {
        //
        if (isAI == true) return -1;
        if (isAI == false) return +1;
        } 
        //
        if (depth < 9) {
        if (isAI == true) {
            //
            bestScore = -999;
            //
            for (let i = 0; i < this.SIDE; i++) {
            for (let j = 0; j < this.SIDE; j++) {
                //
                if (board[i][j] == null) {
                //
                board[i][j] = this.COMPUTERMOVE;
                score = this.minimax(board, depth + 1, false);
                //
                board[i][j] = null;
                if (score! > bestScore!) {
                    bestScore = score;
                }
                }
            }
            }
            //
            return bestScore;
        } else {
            bestScore = 999;
            for (let i = 0; i < this.SIDE; i++) {
            for (let j = 0; j < this.SIDE; j++) {
                //
                if (board[i][j] == null) {
                board[i][j] = this.HUMANMOVE;
                score = this.minimax(board, depth + 1, true);
                //
                board[i][j] = null;
                if (score! < bestScore!) {
                    bestScore = score;
                }
                }
            }
            }
            return bestScore;
        }
        } else {
        return 0;
        }
    }
    //
    bestMove(board : ('X' | 'O' | null)[][], moveIndex : number) : number{
        //
        let x         = -1;      
        let y         = -1;
        let score     : number | undefined = 0;      
        let bestScore : number | undefined = -999;
        //
        for (let i = 0; i < this.SIDE; i++) {
        for (let j = 0; j < this.SIDE; j++) {
            //
            if (board[i][j] == null) {
            board[i][j] = this.COMPUTERMOVE;
            score = this.minimax(board, moveIndex + 1, false);
            //
            board[i][j] = null;
            if (score! > bestScore!) {
                bestScore = score;
                x = i;
                y = j;
            }
            }
        }
        }
        return ((x * 3) + y);
    }
    //
    public doPlay(p_whoseTurn : number, p_Move : ('X' | 'O' | null), p_n : number):void
    {
       //  
       this.whoseTurn = p_whoseTurn; 
       //
       let n : number = 0;
       switch(p_whoseTurn)
       {
        case this.COMPUTER :
          n = Math.abs(this.bestMove(this.board, this.moveIndex));
        break;
        case this.HUMAN    :
          n = p_n;
        break;
       }
       //
       let x : number = Math.floor(n / this.SIDE);
       let y : number = Math.floor(n % this.SIDE);
       //
       this.board[x][y] = p_Move;
       this.squares[n]  = p_Move;
       this.moveIndex++;
  }
  //
  _declareWinner():boolean
  {
    let gameRunning  : boolean = (this.gameOver(this.board) == false); 
    //
    console.log(`[TIC-TAC-TOE] - [Declare Winner] `);
    //
    if ((gameRunning && (this.moveIndex != this.boardSurface)) == false )
    {
      //
      if (gameRunning && this.moveIndex == this.boardSurface){
          //
          this.message = "[EMPATE]";
          this.winner  = null;
      }
		  else
		  {
  			this.declareWinner(this.whoseTurn);
	  	}
      //
      return true;
    } 
    else 
    {
      //
      return false;
    }
  }
  //
  makeHumanMove(n: number) {
    //
    this.doPlay(this.HUMAN   ,this.HUMANMOVE    ,n);
  }
  //
  makeComputerMove():void
  {
    //
    this.doPlay(this.COMPUTER,this.COMPUTERMOVE,0);  
  }
   //
   makeMove(n: number) {
    if (this.squares[n] || this.winner) {
        return;
      }
      //
      this.makeHumanMove(n);
      //
      if (this._declareWinner()==false)
      {
        //
        this.makeComputerMove();
        //
        this._declareWinner()
      }
  }
}

