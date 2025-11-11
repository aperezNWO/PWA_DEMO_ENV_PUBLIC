import { ChangeDetectorRef, Component, ElementRef, OnInit, signal, ViewChild                         } from '@angular/core';
import { ActivatedRoute                            } from '@angular/router';
import { BaseComponent                             } from 'src/app/_components/base/base.component';
import { BackendService                            } from 'src/app/_services/BackendService/backend.service';
import { ConfigService                             } from 'src/app/_services/ConfigService/config.service';
import { SpeechService                             } from 'src/app/_services/speechService/speech.service';
import { PAGE_GAMES_TETRIS_AI                      } from 'src/app/_models/common';
import { HttpClient, HttpHeaders                   } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AIMove {
  action: number;
  action_name: string;
  q_values: number[];
  success: boolean;
}


@Component({
  selector: 'app-game-tetris-ai',
  templateUrl: './game-tetris-ai.component.html',
  styleUrl: './game-tetris-ai.component.css'
})
export class GameTetrisAIComponent  extends BaseComponent implements OnInit {
  
  BOARD_HEIGHT = 20;
  BOARD_WIDTH = 10;

  board: number[][] = [];
  gameOver = false;
  score = 0;

  aiSuggestion: AIMove | null = null;
  aiLoading = false;

  // 🔗 URL de tu backend
  private apiUrl = 'https://6rtfk8-8000.csb.app/tetris_ai_move';

  // Pieza activa
  currentPieceX = 5;
  currentPieceY = 0;
  currentPieceShape: number[][] = [[1, 1], [1, 1]];
  pieceTypes = [
    [[1, 1, 1, 1]],                           // I
    [[1, 1], [1, 1]],                         // O
    [[0, 1, 0], [1, 1, 1]],                  // T
    [[0, 1, 1], [1, 1, 0]],                  // S
    [[1, 1, 0], [0, 1, 1]],                  // Z
    [[1, 0, 0], [1, 1, 1]],                  // J
    [[0, 0, 1], [1, 1, 1]]                   // L
  ];

  constructor(    private http: HttpClient, 
                  private cd: ChangeDetectorRef,
                  public  override configService    : ConfigService,
                  public  override route            : ActivatedRoute,
                  public  override speechService    : SpeechService,
                  public  override backendService   : BackendService,) 
  { 
      //
      super(configService,
            backendService,
            route,
            speechService,
            PAGE_GAMES_TETRIS_AI
      )
  }
  
ngOnInit(): void {
    console.log('🎮 Tetris AI: Iniciando modo autoplay...');
    this.initBoard();
    this.spawnPiece();
    this.redraw();
    this.startAutoPlay();
  }

  initBoard(): void {
    this.board = Array(this.BOARD_HEIGHT).fill(0).map(() => Array(this.BOARD_WIDTH).fill(0));
  }

  spawnPiece(): void {
    this.currentPieceShape = this.pieceTypes[Math.floor(Math.random() * this.pieceTypes.length)];
    const width = this.currentPieceShape[0].length;
    this.currentPieceX = Math.max(0, Math.min(this.BOARD_WIDTH - width, 5));
    this.currentPieceY = 0;

    if (this.wouldCollide()) {
      console.warn('⚠️ Colisión al spawnear pieza → Juego terminado');
      this.gameOver = true;
    }
  }

  wouldCollide(dx = 0, dy = 0): boolean {
    for (let y = 0; y < this.currentPieceShape.length; y++) {
      for (let x = 0; x < this.currentPieceShape[y].length; x++) {
        if (this.currentPieceShape[y][x]) {
          const px = this.currentPieceX + x + dx;
          const py = this.currentPieceY + y + dy;
          if (px < 0 || px >= this.BOARD_WIDTH || py >= this.BOARD_HEIGHT) return true;
          if (py >= 0 && this.board[py][px] === 1) return true;
        }
      }
    }
    return false;
  }

  move(dx: number, dy: number): void {
    if (!this.wouldCollide(dx, dy)) {
      this.currentPieceX += dx;
      this.currentPieceY += dy;
    } else if (dy > 0) {
      this.lockPiece();
      this.clearLines();
      this.spawnPiece();
    }
    this.redraw();
  }

  rotatePiece(): void {
    const rotated = this.rotateMatrix(this.currentPieceShape);
    const oldShape = this.currentPieceShape;
    this.currentPieceShape = rotated;
    if (this.wouldCollide()) this.currentPieceShape = oldShape;
    this.redraw();
  }

  hardDrop(): void {
    while (!this.wouldCollide(0, 1)) {
      this.currentPieceY++;
    }
    this.currentPieceY--;
    this.lockPiece();
    this.clearLines();
    this.spawnPiece();
    this.redraw();
  }

  lockPiece(): void {
    for (let y = 0; y < this.currentPieceShape.length; y++) {
      for (let x = 0; x < this.currentPieceShape[y].length; x++) {
        if (this.currentPieceShape[y][x]) {
          const py = this.currentPieceY + y;
          const px = this.currentPieceX + x;
          if (py >= 0 && py < this.BOARD_HEIGHT && px >= 0 && px < this.BOARD_WIDTH) {
            this.board[py][px] = 1;
          }
        }
      }
    }
  }

  clearLines(): void {
    let linesCleared = 0;
    for (let y = this.BOARD_HEIGHT - 1; y >= 0; y--) {
      if (this.board[y].every(cell => cell === 1)) {
        linesCleared++;
        for (let yy = y; yy > 0; yy--) {
          this.board[yy] = [...this.board[yy - 1]];
        }
        this.board[0] = Array(this.BOARD_WIDTH).fill(0);
        y++;
      }
    }
    if (linesCleared > 0) {
      this.score += [0, 100, 300, 500, 800][linesCleared];
    }
  }

  redraw(): void {
    this.initBoard();
    this.lockPiece();
    this.board = this.board.map(row => [...row]);
    this.cd.detectChanges(); // 🔥 Fuerza actualización visual
  }

  // === Autoplay: Bucle infinito seguro ===
  startAutoPlay(): void {
    console.log('▶️ Autoplay iniciado');
    this.autoPlayLoop();
  }

  autoPlayLoop(): void {
    if (this.gameOver) {
      console.log('💀 Juego terminado. Deteniendo autoplay.');
      return;
    }

    this.aiLoading = true;

    this.http.post<AIMove>(this.apiUrl, { board: this.board })
      .subscribe({
        next: (response) => {
          console.log('✅ Respuesta del modelo:', response);

          if (typeof response?.action === 'number') {
            this.aiSuggestion = response;
            this.applyAction(response.action);
          } else {
            console.warn('⚠️ Respuesta inválida, omitiendo...', response);
          }
        },
        error: (err) => {
          console.error('❌ Error al contactar con IA:', err);
        },
        complete: () => {
          this.aiLoading = false;
          // Programar siguiente movimiento SIEMPRE
          this.scheduleNextMove();
        }
      });
  }

  private scheduleNextMove(): void {
    setTimeout(() => {
      if (!this.gameOver) {
        this.autoPlayLoop(); // 🔁 Siguiente iteración
      }
    }, 600); // Ajusta velocidad aquí (ms entre movimientos)
  }

  applyAction(action: number): void {
    console.log('🔧 Aplicando acción:', action);

    switch (action) {
      case 0: this.move(-1, 0); break;  // ← Izquierda
      case 1: this.move(1, 0); break;   // → Derecha
      case 2: this.rotatePiece(); break; // ↻ Rotar
      case 3: this.hardDrop(); break;   // ↓ Bajar rápido
      case 4: this.move(0, 1); break;   // No hacer nada (bajar)
      default:
        console.warn('⚠️ Acción desconocida:', action);
        this.move(0, 1);
    }
  }

  resetGame(): void {
    console.log('🔄 Reiniciando juego...');
    this.gameOver = false;
    this.score = 0;
    this.aiSuggestion = null;
    this.initBoard();
    this.spawnPiece();
    this.redraw();
    this.startAutoPlay();
  }

  get qValuesFormatted(): string {
    const q = this.aiSuggestion?.q_values;
    if (!Array.isArray(q)) return '---';
    return q.map(v => v.toFixed(2)).join(', ');
  }

  private rotateMatrix(matrix: number[][]): number[][] {
    const N = matrix.length;
    const M = matrix[0].length;
    const result = Array(M).fill(0).map(() => Array(N).fill(0));
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        result[x][N - 1 - y] = matrix[y][x];
      }
    }
    return result;
  }
}  
