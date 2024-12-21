// fireworks.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-fireworks',
  template: `
    <canvas #canvas></canvas>
  `,
  styles: [
    `
 
    `,
  ],
})
export class FireworksComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef | undefined;

  ngAfterViewInit(): void {
    this.animateFireworks();
  }

  animateFireworks(): void {
    const ctx = this.canvas?.nativeElement.getContext('2d');
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const fireworks: any[] = [];
    const particles: any[] = [];

    // Function to create fireworks
    function createFirework(x: number, y: number) {
      const firework = {
        x,
        y,
        velocityX: Math.random() * 2 - 1,
        velocityY: Math.random() * 2 - 1,
        size: Math.random() * 5 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      };
      fireworks.push(firework);
    }

    // Function to update fireworks
    function updateFireworks() {
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];
        firework.x += firework.velocityX;
        firework.y += firework.velocityY;
        firework.size -= 0.1;

        if (firework.size <= 0) {
          fireworks.splice(i, 1);
          createParticles(firework.x, firework.y);
        }
      }
    }

    // Function to create particles
    function createParticles(x: any, y: any) {
      for (let i = 0; i < 50; i++) {
        const particle = {
          x,
          y,
          velocityX: Math.random() * 2 - 1,
          velocityY: Math.random() * 2 - 1,
          size: Math.random() * 2 + 1,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        };
        particles.push(particle);
      }
    }

    // Function to update particles
    function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.size -= 0.1;

        if (particle.size <= 0) {
          particles.splice(i, 1);
        }
      }
    }

    // Main animation loop
    function animate() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      updateFireworks();
      updateParticles();

      for (const firework of fireworks) {
        ctx.beginPath();
        ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
        ctx.fillStyle = firework.color;
        ctx.fill();
      }

      for (const particle of particles) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    // Create initial fireworks
    for (let i = 0; i < 10; i++) {
      createFirework(Math.random() * canvasWidth, Math.random() * canvasHeight);
    }

    animate();
  }
}