import { Injectable                                          } from '@angular/core';
import { HttpClient, HttpErrorResponse                       } from '@angular/common/http';
import { Observable, interval, Subscription, throwError, of  } from 'rxjs';
import { catchError, tap                                     } from 'rxjs/operators';
import { TetrisState,  AIWeights                             } from "src/app/_models/entity.model";
import { _environment                                        } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TetrisService {
  //
  private readonly apiUrl                  =  `${this.getConfigValue('baseUrlNetCoreCPPEntry')}api/tetris`;
  private autoPlaySub: Subscription | null = null;
  private gameCreated                      = false;


  constructor(private http: HttpClient) {}

  //
  getConfigValue(key: string) {
    //
    let jsonData : string = JSON.parse(JSON.stringify(_environment.externalConfig))[key];
    //
    return jsonData;
  }

  private handleError = (error: HttpErrorResponse) => {
    const message = error.error?.error || error.message || 'Unknown error';
    console.error('❌ Tetris API Error:', message);
    return throwError(() => new Error(message));
  };

  // Game lifecycle
  createGame(): Observable<{ message: string; handle: number }> {
    return this.http.post<{ message: string; handle: number }>(`${this.apiUrl}/create`, {}).pipe(
      tap(() => {
        this.gameCreated = true;
        console.log('✅ Game instance created');
      }),
      catchError(this.handleError)
    );
  }

  destroyGame(): Observable<any> {
    this.gameCreated = false;
    return this.http.post(`${this.apiUrl}/destroy`, {}).pipe(
      catchError(this.handleError)
    );
  }

  reset(): Observable<any> {
    if (!this.gameCreated) return this.createGame();
    return this.http.post(`${this.apiUrl}/reset`, {}).pipe(
      catchError(this.handleError)
    );
  }

  step(): Observable<any> {
    if (!this.gameCreated) {
      return throwError(() => new Error('Game not created. Call createGame() first.'));
    }
    return this.http.post(`${this.apiUrl}/step`, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Get state
  getState(): Observable<TetrisState | null> {
    if (!this.gameCreated) {
      return of(null); // Return null if game not created
    }
    
    return this.http.get<TetrisState>(`${this.apiUrl}/state`).pipe(
      catchError(err => {
        console.warn('⚠️ State fetch failed:', err);
        return of(null);
      })
    );
  }

  // AI functions
  trainAI(weightsFile: string = 'tetris_weights.txt', generations: number = 20): Observable<any> {
    return this.http.post(`${this.apiUrl}/train`, { weightsFile, generations }).pipe(
      tap(() => console.log('✅ AI training complete')),
      catchError(this.handleError)
    );
  }

  loadAI(weightsFile: string): Observable<any> {
    if (!this.gameCreated) return throwError(() => new Error('Game not created.'));
    return this.http.post(`${this.apiUrl}/load-ai`, { weightsFile }).pipe(
      catchError(this.handleError)
    );
  }

  getAIWeights(): Observable<AIWeights> {
    return this.http.get<AIWeights>(`${this.apiUrl}/ai-weights`).pipe(
      catchError(this.handleError)
    );
  }

  setAIWeights(weights: AIWeights): Observable<any> {
    if (!this.gameCreated) return throwError(() => new Error('Game not created.'));
    return this.http.post(`${this.apiUrl}/ai-weights`, weights).pipe(
      catchError(this.handleError)
    );
  }

  toggleAutoPlay(): Observable<any> {
    if (!this.gameCreated) return throwError(() => new Error('Game not created.'));
    return this.http.post(`${this.apiUrl}/toggle-auto-play`, {}).pipe(
      catchError(this.handleError)
    );
  }

  startAutoPlay(): void {
    if (this.autoPlaySub || !this.gameCreated) return;
    this.autoPlaySub = interval(100).subscribe(() => {
      this.step().subscribe({ error: err => console.error('Auto-play error:', err) });
    });
  }

  stopAutoPlay(): void {
    if (this.autoPlaySub) {
      this.autoPlaySub.unsubscribe();
      this.autoPlaySub = null;
    }
  }

  isAutoPlaying(): boolean {
    return this.autoPlaySub !== null;
  }

  isGameCreated(): boolean {
    return this.gameCreated;
  }

  // Add new method:
  getStateWithPreview(): Observable<TetrisState | null> {
      //
      if (!this.gameCreated) {
        return of(null);
      }
      //
      return this.http.get<TetrisState>(`${this.apiUrl}/state-with-preview`).pipe(
        catchError(err => {
          console.warn('⚠️ State with preview fetch failed:', err);
          return of(null);
        })
      );
  }
}