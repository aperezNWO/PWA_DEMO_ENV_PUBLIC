import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { evaluate } from 'mathjs';
import { BaseReferenceComponent } from "src/app/_components/base-reference/base-reference.component";
import { PAGE_ALGORITMOS_COLISION, PAGE_TITLE_LOG, PAGE_TITLE_NO_SOUND } from 'src/app/_models/common';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { ConfigService } from 'src/app/_services/__Utils/ConfigService/config.service';
import { SpeechService } from 'src/app/_services/__Utils/SpeechService/speech.service';

@Component({
    selector: 'app-algorithm-collision',
    templateUrl: './algorithm-collision.component.html',
    styleUrls: ['./algorithm-collision.component.css'],
    providers: [
        {
            provide: PAGE_TITLE_LOG,
            useValue: PAGE_ALGORITMOS_COLISION
        },
    ],
    standalone: false
})
export class AlgorithmCollisionComponent extends BaseReferenceComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('ballCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement> | null;
  
  private readonly ASPECT_RATIO = 0.6;
  private readonly MAX_WIDTH = 500;
  private readonly MIN_WIDTH = 280;
  
  canvasWidth = 500;
  canvasHeight = 300;
  
  private gravity = 0.5;
  private friction = 0.98;
  private restitution = 0.8;
  
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  
  ball = {
    radius: 15,
    mass: 1
  };
  
  xPosition: number = 100;
  yPosition: number = 100;
  
  currentX: number = 100;
  currentY: number = 100;
  vx: number = 5;
  vy: number = 0;
  
  isPlaying = false;
  isPaused = false;
  collisionCount = 0;
  
  // Calculated values
  speed: number = 0;
  kineticEnergy: number = 0;
  potentialEnergy: number = 0;
  totalEnergy: number = 0;
  momentum: number = 0;
  
  // Formula display strings
  speedFormula: string = '';
  velocityFormula: string = '';
  keFormula: string = '';
  peFormula: string = '';
  totalFormula: string = '';
  momentumFormula: string = '';
  
  isPanelCollapsed = false;

  constructor(
    public override configService: ConfigService,
    public override speechService: SpeechService,
    public override backendService: BackendService,
    public override route: ActivatedRoute,
  ) {
    super(configService, backendService, route, speechService, PAGE_TITLE_NO_SOUND);
  }

  ngOnInit() {
    this.updateCanvasSize();
    this.currentX = this.xPosition;
    this.currentY = this.yPosition;
    this.updateCalculations(); // Initialize formulas
  }

  ngAfterViewInit() {
    if (this.canvas) {
      const context = this.canvas.nativeElement.getContext('2d');
      if (context && this.isCanvas2DContext(context)) {
        this.ctx = context;
        this.ctx.imageSmoothingEnabled = false;
        this.drawGrid();
        this.drawInitialPositionPreview();
      }
    }
  }

  ngOnDestroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.ctx = null;
  }

  togglePanel() {
    this.isPanelCollapsed = !this.isPanelCollapsed;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const wasPlaying = this.isPlaying;
    if (wasPlaying) this.pauseSimulation();
    
    this.updateCanvasSize();
    this.constrainBallPosition();
    
    if (!this.isPlaying) {
      this.drawStaticFrame();
    } else if (wasPlaying) {
      this.resumeSimulation();
    }
  }

  private updateCanvasSize() {
    const availableWidth = window.innerWidth - 32;
    let newWidth = Math.max(this.MIN_WIDTH, Math.min(this.MAX_WIDTH, availableWidth));
    if (window.innerWidth >= 768) newWidth = this.MAX_WIDTH;
    
    this.canvasWidth = newWidth;
    this.canvasHeight = Math.round(newWidth * this.ASPECT_RATIO);
    this.ball.radius = newWidth < 400 ? 12 : 15;
    
    if (this.xPosition > this.canvasWidth - this.ball.radius) {
      this.xPosition = this.canvasWidth - this.ball.radius;
    }
    if (this.yPosition > this.canvasHeight - this.ball.radius) {
      this.yPosition = this.canvasHeight - this.ball.radius;
    }
  }

  private constrainBallPosition() {
    if (this.currentX > this.canvasWidth - this.ball.radius) {
      this.currentX = this.canvasWidth - this.ball.radius;
    }
    if (this.currentY > this.canvasHeight - this.ball.radius) {
      this.currentY = this.canvasHeight - this.ball.radius;
    }
    if (this.currentX < this.ball.radius) this.currentX = this.ball.radius;
    if (this.currentY < this.ball.radius) this.currentY = this.ball.radius;
  }

  private drawStaticFrame() {
    if (this.ctx) {
      this.clearCanvas();
      this.drawGrid();
      if (this.isPlaying) {
        this.drawBall();
      } else {
        this.drawInitialPositionPreview();
      }
      this.updateCalculations();
    }
  }

  private isCanvas2DContext(context: RenderingContext): context is CanvasRenderingContext2D {
    return 'fillStyle' in context && 'strokeStyle' in context && 'lineWidth' in context;
  }

  startSimulation() {
    this.isPlaying = true;
    this.isPaused = false;
    this.currentX = this.xPosition;
    this.currentY = this.yPosition;
    this.vx = 5;
    this.vy = 0;
    this.collisionCount = 0;
    this.animate();
  }

  pauseSimulation() {
    this.isPaused = true;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  resumeSimulation() {
    this.isPaused = false;
    this.animate();
  }

  resetSimulation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.collisionCount = 0;
    this.currentX = this.xPosition;
    this.currentY = this.yPosition;
    this.vx = 5;
    this.vy = 0;
    this.drawStaticFrame();
    this.updateCalculations();
  }

  animate() {
    if (!this.isPlaying || this.isPaused) return;
    if (!this.ctx || !this.canvas) return;
    
    this.vy += this.gravity;
    this.currentX += this.vx;
    this.currentY += this.vy;

    let horizontalCollision = false;
    let verticalCollision = false;
    
    if (this.currentX + this.ball.radius > this.canvasWidth) {
      this.currentX = this.canvasWidth - this.ball.radius;
      this.vx = -this.vx * this.restitution;
      if (Math.abs(this.vx) < 0.1) this.vx = 0;
      horizontalCollision = true;
    }
    else if (this.currentX - this.ball.radius < 0) {
      this.currentX = this.ball.radius;
      this.vx = -this.vx * this.restitution;
      if (Math.abs(this.vx) < 0.1) this.vx = 0;
      horizontalCollision = true;
    }
    
    if (this.currentY + this.ball.radius > this.canvasHeight) {
      this.currentY = this.canvasHeight - this.ball.radius;
      this.vy = -this.vy * this.restitution;
      this.vx *= this.friction;
      if (Math.abs(this.vy) < 0.1) this.vy = 0;
      verticalCollision = true;
    }
    else if (this.currentY - this.ball.radius < 0) {
      this.currentY = this.ball.radius;
      this.vy = -this.vy * this.restitution;
      if (Math.abs(this.vy) < 0.1) this.vy = 0;
      verticalCollision = true;
    }

    if (horizontalCollision || verticalCollision) this.collisionCount++;

    this.clearCanvas();
    this.drawGrid();
    this.drawBall();
    this.updateCalculations();
    
    const isMoving = Math.abs(this.vx) >= 0.1 || Math.abs(this.vy) >= 0.1;
    
    if (isMoving) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.vx = 0;
      this.vy = 0;
      this.isPaused = true;
      this.clearCanvas();
      this.drawGrid();
      this.drawBall();
      this.updateCalculations(); // Final update for formulas
    }
  }

  private clearCanvas() {
    if (this.ctx) this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  drawGrid() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    
    ctx.beginPath();
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= this.canvasWidth; x += 50) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.canvasHeight);
    }
    for (let y = 0; y <= this.canvasHeight; y += 50) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.canvasWidth, y);
    }
    ctx.stroke();
    
    ctx.fillStyle = '#666';
    ctx.font = `${this.canvasWidth < 400 ? 8 : 10}px Arial`;
    for (let x = 0; x <= this.canvasWidth; x += 100) {
      ctx.fillText(x.toString(), x, this.canvasHeight - 5);
    }
    for (let y = 0; y <= this.canvasHeight; y += 100) {
      ctx.fillText(y.toString(), 5, y + 3);
    }
  }

  drawInitialPositionPreview() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    ctx.save();
    
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#dc3545';
    ctx.strokeStyle = '#c82333';
    ctx.lineWidth = 2;
    
    const renderX = Math.max(this.ball.radius + 1, 
                    Math.min(this.canvasWidth - this.ball.radius - 1, this.xPosition));
    const renderY = Math.max(this.ball.radius + 1, 
                    Math.min(this.canvasHeight - this.ball.radius - 1, this.yPosition));
    
    ctx.beginPath();
    ctx.arc(renderX, renderY, this.ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = '#212529';
    ctx.font = `${this.canvasWidth < 400 ? 10 : 12}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('Start', renderX, renderY - 25);
    ctx.restore();
  }

  drawBall() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    
    const strokePadding = 1;
    const minX = this.ball.radius + strokePadding;
    const maxX = this.canvasWidth - this.ball.radius - strokePadding;
    const minY = this.ball.radius + strokePadding;
    const maxY = this.canvasHeight - this.ball.radius - strokePadding;
    
    const clampedX = Math.max(minX, Math.min(maxX, this.currentX));
    const clampedY = Math.max(minY, Math.min(maxY, this.currentY));
    const renderX = Math.round(clampedX);
    const renderY = Math.round(clampedY);
    
    const gradient = ctx.createRadialGradient(
      renderX - this.ball.radius * 0.3, 
      renderY - this.ball.radius * 0.3, 
      this.ball.radius * 0.2,
      renderX, renderY, this.ball.radius
    );
    gradient.addColorStop(0, '#ff6b6b');
    gradient.addColorStop(1, '#c44569');
    
    ctx.beginPath();
    ctx.arc(renderX, renderY, this.ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = '#92278f';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  updateCalculations() {
    // Speed: v = √(vx² + vy²)
    const speedScope = { vx: this.vx, vy: this.vy };
    this.speed = evaluate('sqrt(vx^2 + vy^2)', speedScope);
    this.speedFormula = `√(${this.vx.toFixed(1)}² + ${this.vy.toFixed(1)}²) = ${this.speed.toFixed(2)}`;

    // Velocity: v = (vx, vy) - Vector notation
    this.velocityFormula = `(${this.vx.toFixed(1)}, ${this.vy.toFixed(1)})`;

    // Kinetic Energy: KE = ½mv²
    const keScope = { m: this.ball.mass, v: this.speed };
    this.kineticEnergy = evaluate('0.5 * m * v^2', keScope);
    this.keFormula = `½×${this.ball.mass}×${this.speed.toFixed(1)}² = ${this.kineticEnergy.toFixed(1)}`;

    // Potential Energy: PE = mgh
    const height = this.canvasHeight - this.currentY;
    const peScope = { m: this.ball.mass, g: this.gravity, h: height };
    this.potentialEnergy = evaluate('m * g * h', peScope);
    this.peFormula = `${this.ball.mass}×${this.gravity}×${height.toFixed(1)} = ${this.potentialEnergy.toFixed(1)}`;

    // Total Energy: E = KE + PE
    const totalScope = { ke: this.kineticEnergy, pe: this.potentialEnergy };
    this.totalEnergy = evaluate('ke + pe', totalScope);
    this.totalFormula = `${this.kineticEnergy.toFixed(1)} + ${this.potentialEnergy.toFixed(1)} = ${this.totalEnergy.toFixed(1)}`;

    // Momentum: p = mv
    const pScope = { m: this.ball.mass, v: this.speed };
    this.momentum = evaluate('m * v', pScope);
    this.momentumFormula = `${this.ball.mass}×${this.speed.toFixed(1)} = ${this.momentum.toFixed(1)}`;
  }

  updatePosition() {
    this.currentX = this.xPosition;
    this.currentY = this.yPosition;
    
    if (this.ctx && this.canvas) {
      this.clearCanvas();
      this.drawGrid();
      this.drawInitialPositionPreview();
      if (this.isPlaying) this.drawBall();
    }
    this.updateCalculations();
  }
}