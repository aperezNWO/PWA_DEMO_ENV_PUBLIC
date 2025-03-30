import { Component, ViewChild, ElementRef, AfterViewInit                 } from '@angular/core';
import { ActivatedRoute                                                  } from '@angular/router';
import { BaseComponent                                                   } from 'src/app/_components/base/base.component';
import { BackendService                                                  } from 'src/app/_services/BackendService/backend.service';
import { PageRestartService                                              } from 'src/app/_services/pageRestart/page-restart.service';
import { SpeechService                                                   } from 'src/app/_services/speechService/speech.service';

@Component({
  selector: 'app-algorithm-collision',
  templateUrl: './algorithm-collision.component.html',
  styleUrl: './algorithm-collision.component.css'
})
export class AlgorithmCollisionComponent extends BaseComponent implements AfterViewInit {
  //
  @ViewChild('ballCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement> | null;
  //
  private ctx!: CanvasRenderingContext2D | null;
  private ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 0,
    radius: 15,
    mass: 1
  };
  private gravity     = 0.5;  // Gravity pulling down
  private friction    = 0.98; // Friction to slow down the ball
  private restitution = 0.8; // Bounce factor, 1 = perfect elastic collision, <1 = energy loss
  //
  constructor(private pageRestartService: PageRestartService,
              public  override speechService     : SpeechService,
              public  override backendService    : BackendService,
              public  override route             : ActivatedRoute,
  )
  {
      super(backendService,route,speechService,"[ALGORITMOS - COLISIÓN]");
  }
  
  restart() {
    this.pageRestartService.reloadPage(); // or use any other method
  }
  ngAfterViewInit() {
    this.animate();
  }

  animate = () => {
    this.ctx = this.canvas!.nativeElement.getContext('2d');
    // Clear canvas
    this.ctx!.clearRect(0, 0, this.canvas!.nativeElement.width, this.canvas!.nativeElement.height);

    // Apply physics
    this.ball.vy += this.gravity; // Apply gravity
    this.ball.x += this.ball.vx;
    this.ball.y += this.ball.vy;

    // Check for collisions with canvas edges
    if (this.ball.x + this.ball.radius > this.canvas!.nativeElement.width || this.ball.x - this.ball.radius < 0) {
      this.ball.vx = -this.ball.vx * this.restitution;
    }
    if (this.ball.y + this.ball.radius > this.canvas!.nativeElement.height) {
      this.ball.y = this.canvas!.nativeElement.height - this.ball.radius;
      this.ball.vy = -this.ball.vy * this.restitution;
      // Apply friction on x-axis when ball hits the ground to slow down
      this.ball.vx *= this.friction;
    }

    // Draw ball
    this.ctx!.beginPath();
    this.ctx!.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx!.fillStyle = "red";
    this.ctx!.fill();
    this.ctx!.closePath();

    // Check if ball has stopped (friction)
    if (Math.abs(this.ball.vx) < 0.1 && Math.abs(this.ball.vy) < 0.1) {
      this.ball.vx = 0;
      this.ball.vy = 0;
    } else {
      requestAnimationFrame(this.animate);
    }
  }
}
