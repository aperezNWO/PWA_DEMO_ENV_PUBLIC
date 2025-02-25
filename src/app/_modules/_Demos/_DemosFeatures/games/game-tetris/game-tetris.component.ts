// tetris.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { PageRestartService } from 'src/app/_services/pageRestart/page-restart.service';

interface Position {
  x: number;
  y: number;
}

@Component({
  selector: 'app-game-tetris',
  templateUrl: './game-tetris.component.html',
  styleUrl: './game-tetris.component.css'
})
export class GameTetrisComponent  implements OnInit {
  readonly BOARD_WIDTH = 10;
  readonly BOARD_HEIGHT = 20;
  readonly TICK_INTERVAL = 1000;
  
  board: string[][] = [];
  displayBoard: string[][] = [];
  currentPiece: Position[] = [];
  currentColor: string = '';
  score: number = 0;
  isPlaying: boolean = false;
  gameOver: boolean = false;
  isMobile: boolean = false;
  
  private gameLoop$?: Subscription;
  
  readonly TETROMINOS = {
    I: { shape: [[1, 1, 1, 1]], color: '#00f0f0' },
    O: { shape: [[1, 1], [1, 1]], color: '#f0f000' },
    T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#a000f0' },
    S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#00f000' },
    Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#f00000' },
    J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#0000f0' },
    L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#f0a000' }
  };

  constructor(private pageRestartService: PageRestartService)
  {
    
  }
  restart() {
    this.pageRestartService.reloadPage(); // or use any other method
  }

  ngOnInit() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.initBoard();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.isPlaying || this.gameOver) return;
    
    switch(event.key) {
      case 'ArrowLeft':
        this.moveLeft();
        break;
      case 'ArrowRight':
        this.moveRight();
        break;
      case 'ArrowUp':
        this.rotate();
        break;
      case 'ArrowDown':
        this.moveDown();
        break;
      case ' ':
        this.drop();
        break;
    }
  }

  initBoard() {
    this.board = Array(this.BOARD_HEIGHT).fill(null)
      .map(() => Array(this.BOARD_WIDTH).fill(''));
    this.displayBoard = Array(this.BOARD_HEIGHT).fill(null)
      .map(() => Array(this.BOARD_WIDTH).fill(''));
  }

  startGame() {
    if (this.gameLoop$) {
      this.gameLoop$.unsubscribe();
    }
    
    this.initBoard();
    this.score = 0;
    this.gameOver = false;
    this.isPlaying = true;
    this.spawnPiece();
    
    this.gameLoop$ = interval(this.TICK_INTERVAL).subscribe(() => {
      if (!this.gameOver) {
        this.moveDown();
      }
    });
  }

  spawnPiece() {
    const pieces = Object.keys(this.TETROMINOS);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)] as keyof typeof this.TETROMINOS;
    const piece = this.TETROMINOS[randomPiece];
    
    this.currentPiece = piece.shape.flatMap((row, y) => 
      row.map((cell, x) => cell ? { x: x + Math.floor(this.BOARD_WIDTH/2) - 1, y } : null)
    ).filter((pos): pos is Position => pos !== null);
    
    this.currentColor = piece.color;
    
    if (this.checkCollision()) {
      this.gameOver = true;
      this.isPlaying = false;
      if (this.gameLoop$) {
        this.gameLoop$.unsubscribe();
      }
    }
    
    this.updateDisplayBoard();
  }

  moveLeft() {
    const newPositions = this.currentPiece.map(pos => ({ ...pos, x: pos.x - 1 }));
    if (this.isValidMove(newPositions)) {
      this.currentPiece = newPositions;
      this.updateDisplayBoard();
    }
  }

  moveRight() {
    const newPositions = this.currentPiece.map(pos => ({ ...pos, x: pos.x + 1 }));
    if (this.isValidMove(newPositions)) {
      this.currentPiece = newPositions;
      this.updateDisplayBoard();
    }
  }

  moveDown() {
    const newPositions = this.currentPiece.map(pos => ({ ...pos, y: pos.y + 1 }));
    if (this.isValidMove(newPositions)) {
      this.currentPiece = newPositions;
      this.updateDisplayBoard();
    } else {
      this.lockPiece();
      this.clearLines();
      this.spawnPiece();
    }
  }

  drop() {
    while (this.isValidMove(this.currentPiece.map(pos => ({ ...pos, y: pos.y + 1 })))) {
      this.currentPiece = this.currentPiece.map(pos => ({ ...pos, y: pos.y + 1 }));
    }
    this.updateDisplayBoard();
    this.lockPiece();
    this.clearLines();
    this.spawnPiece();
  }

  rotate() {
    if (!this.currentPiece.length) return;
    
    const center = this.currentPiece[1]; // Use second block as rotation center
    const newPositions = this.currentPiece.map(pos => ({
      x: center.x - (pos.y - center.y),
      y: center.y + (pos.x - center.x)
    }));
    
    if (this.isValidMove(newPositions)) {
      this.currentPiece = newPositions;
      this.updateDisplayBoard();
    }
  }

  isValidMove(positions: Position[]): boolean {
    return positions.every(pos => 
      pos.x >= 0 && 
      pos.x < this.BOARD_WIDTH &&
      pos.y >= 0 && 
      pos.y < this.BOARD_HEIGHT &&
      !this.board[pos.y]?.[pos.x]
    );
  }

  checkCollision(): boolean {
    return !this.isValidMove(this.currentPiece);
  }

  updateDisplayBoard() {
    // Copy the locked pieces board
    this.displayBoard = this.board.map(row => [...row]);
    
    // Add current piece to display
    this.currentPiece.forEach(pos => {
      if (pos.y >= 0 && pos.y < this.BOARD_HEIGHT) {
        this.displayBoard[pos.y][pos.x] = this.currentColor;
      }
    });
  }

  lockPiece() {
    this.currentPiece.forEach(pos => {
      if (pos.y >= 0 && pos.y < this.BOARD_HEIGHT) {
        this.board[pos.y][pos.x] = this.currentColor;
      }
    });
    this.updateDisplayBoard();
  }

  clearLines() {
    let linesCleared = 0;
    
    for (let y = this.BOARD_HEIGHT - 1; y >= 0; y--) {
      if (this.board[y].every(cell => cell !== '')) {
        this.board.splice(y, 1);
        this.board.unshift(Array(this.BOARD_WIDTH).fill(''));
        linesCleared++;
        y++; // Check the same line again
      }
    }
    
    if (linesCleared > 0) {
      this.score += Math.pow(2, linesCleared - 1) * 100;
    }
    
    this.updateDisplayBoard();
  }

  ngOnDestroy() {
    if (this.gameLoop$) {
      this.gameLoop$.unsubscribe();
    }
  }
}