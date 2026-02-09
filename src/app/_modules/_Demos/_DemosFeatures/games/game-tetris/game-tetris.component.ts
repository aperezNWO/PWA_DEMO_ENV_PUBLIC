import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute                             } from '@angular/router';
import { BaseReferenceComponent                     } from 'src/app/_components/base-reference/base-reference.component';
import { BackendService                             } from 'src/app/_services/BackendService/backend.service';
import { SpeechService                              } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { ConfigService                              } from 'src/app/_services/__Utils/ConfigService/config.service';
import { PAGE_GAMES_TETRIS, PAGE_TITLE_LOG, PAGE_TITLE_NO_SOUND } from 'src/app/_models/common';
import { interval, Subscription                     } from 'rxjs';

interface Position {
  x: number;
  y: number;
}

@Component({
    selector: 'app-game-tetris',
    templateUrl: './game-tetris.component.html',
    styleUrl: './game-tetris.component.css',
    providers: [
        {
            provide: PAGE_TITLE_LOG,
            useValue: PAGE_GAMES_TETRIS
        },
    ],
    standalone: false
})
export class GameTetrisComponent extends BaseReferenceComponent implements OnInit, OnDestroy {
  readonly BOARD_WIDTH = 10;
  readonly BOARD_HEIGHT = 20;
  readonly TICK_INTERVAL = 500; // Faster than before
  
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

  constructor(
    public override configService: ConfigService,
    public override route: ActivatedRoute,
    public override speechService: SpeechService,
    public override backendService: BackendService
  ) {
    super(configService, backendService, route, speechService, PAGE_TITLE_NO_SOUND);
  }

  ngOnInit() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Initialize and start the game immediately
    this.startGame();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.isPlaying || this.gameOver) return;
    
    switch(event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.moveLeft();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.moveRight();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.rotate();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.moveDown();
        break;
      case ' ':
        event.preventDefault();
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
    // Cancel any existing game loop
    if (this.gameLoop$) {
      this.gameLoop$.unsubscribe();
    }
    
    // Reset game state
    this.initBoard();
    this.score = 0;
    this.gameOver = false;
    this.isPlaying = true;
    this.currentPiece = [];
    this.currentColor = '';
    
    // Spawn first piece
    this.spawnPiece();
    
    // Start game loop
    this.gameLoop$ = interval(this.TICK_INTERVAL).subscribe(() => {
      if (!this.gameOver) {
        this.moveDown();
      }
    });
    
    // Update display immediately
    this.updateDisplayBoard();
  }

  resetGame() {
    // Stop current game loop
    if (this.gameLoop$) {
      this.gameLoop$.unsubscribe();
    }
    
    // Reset all game state
    this.initBoard();
    this.score = 0;
    this.gameOver = false;
    this.isPlaying = true;
    this.currentPiece = [];
    this.currentColor = '';
    
    // Start fresh game
    this.spawnPiece();
    
    // Restart game loop
    this.gameLoop$ = interval(this.TICK_INTERVAL).subscribe(() => {
      if (!this.gameOver) {
        this.moveDown();
      }
    });
    
    this.updateDisplayBoard();
  }

  spawnPiece() {
    const pieces = Object.keys(this.TETROMINOS);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)] as keyof typeof this.TETROMINOS;
    const piece = this.TETROMINOS[randomPiece];
    
    this.currentPiece = piece.shape.flatMap((row, y) => 
      row.map((cell, x) => cell ? { x: x + Math.floor(this.BOARD_WIDTH/2) - 1, y } : null)
    ).filter((pos): pos is Position => pos !== null);
    
    this.currentColor = piece.color;
    
    // Check for game over
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
    
    const center = this.currentPiece[1] || this.currentPiece[0]; // Use second block as rotation center, fall back to first
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