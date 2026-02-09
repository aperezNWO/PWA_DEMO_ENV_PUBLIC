import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { SpeechService } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { BaseReferenceComponent } from 'src/app/_components/base-reference/base-reference.component';
import { ConfigService } from 'src/app/_services/__Utils/ConfigService/config.service';
import { PAGE_TITLE_LOG, PAGE_TITLE_NO_SOUND, PAGE_GAMES_HANOI_3D } from 'src/app/_models/common';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Specific imports for better tree-shaking and reliability
import * as THREE from 'three';
import { Tween, Easing, Group } from '@tweenjs/tween.js';

@Component({
  selector: 'app-game-hanoi3d',
  templateUrl: './game-hanoi3d.component.html',
  styleUrl: './game-hanoi3d.component.css',
  providers: [{ provide: PAGE_TITLE_LOG, useValue: PAGE_GAMES_HANOI_3D }],
  standalone: false
})
export class GameHanoi3dComponent extends BaseReferenceComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer', { static: false }) rendererContainer!: ElementRef;

  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  
  // Create an explicit Tween Group
  private tweenGroup = new Group();

  disks: THREE.Mesh[] = [];
  towers: THREE.Mesh[] = [];
  numDisks = 3;
  moves: { from: number, to: number }[] = [];
  currentMove = 0;
  isAnimating = false;

  private animationFrameId: number | null = null;
  private readonly TOWER_SPACING = 6; 

  constructor(
    public override configService: ConfigService,
    public override backendService: BackendService,
    public override route: ActivatedRoute,
    public override speechService: SpeechService
  ) {
    super(configService, backendService, route, speechService, PAGE_TITLE_NO_SOUND);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initScene();
      this.createTowers();
      this.createDisks();
      this.solveHanoi(this.numDisks, 0, 2, 1);
      console.log('Total moves planned:', this.moves.length);
      this.animate();
    }, 300);
  }

  ngOnDestroy() {
    this.cleanupScene();
    
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);

    const el = this.rendererContainer.nativeElement;
    this.camera = new THREE.PerspectiveCamera(75, el.offsetWidth / el.offsetHeight, 0.1, 1000);
    this.camera.position.set(0, 10, 15);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(el.offsetWidth, el.offsetHeight);
    el.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  }

  createTowers() {
    const geo = new THREE.CylinderGeometry(0.2, 0.2, 5, 32);
    const mat = new THREE.MeshStandardMaterial({ color: 0x888888 });
    for (let i = 0; i < 3; i++) {
      const tower = new THREE.Mesh(geo, mat);
      // Positions: -6, 0, 6
      tower.position.set((i - 1) * this.TOWER_SPACING, 2.5, 0);
      this.towers.push(tower);
      this.scene.add(tower);
    }
  }

  createDisks() {
    for (let i = 0; i < this.numDisks; i++) {
      const radius = 2.5 - (i * 0.5);
      const geo = new THREE.CylinderGeometry(radius, radius, 0.6, 32);
      const mat = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color().setHSL(i / this.numDisks, 0.7, 0.5) 
      });
      const disk = new THREE.Mesh(geo, mat);
      // Start all on tower 0 (x = -6)
      disk.position.set(-this.TOWER_SPACING, (i * 0.7) + 0.3, 0);
      this.disks.push(disk);
      this.scene.add(disk);
    }
  }

  solveHanoi(n: number, s: number, t: number, a: number) {
    if (n > 0) {
      this.solveHanoi(n - 1, s, a, t);
      this.moves.push({ from: s, to: t });
      this.solveHanoi(n - 1, a, t, s);
    }
  }

  animateMove() {
    if (this.currentMove >= this.moves.length || this.isAnimating) return;

    this.isAnimating = true;
    const move = this.moves[this.currentMove];
    const sourceX = (move.from - 1) * this.TOWER_SPACING;
    const targetX = (move.to - 1) * this.TOWER_SPACING;

    // FIND DISK: Using 0.5 margin for floating point safety
    const disksOnSource = this.disks.filter(d => Math.abs(d.position.x - sourceX) < 0.5)
                                    .sort((a, b) => b.position.y - a.position.y);

    if (disksOnSource.length > 0) {
      const disk = disksOnSource[0];
      const disksOnTarget = this.disks.filter(d => Math.abs(d.position.x - targetX) < 0.5);
      const targetY = (disksOnTarget.length * 0.7) + 0.3;

      console.log(`Moving disk from tower ${move.from} to ${move.to}`);

      // Adding Tweens to our specific Group
      new Tween(disk.position, this.tweenGroup)
        .to({ y: 8 }, 600)
        .easing(Easing.Quadratic.Out)
        .onComplete(() => {
          new Tween(disk.position, this.tweenGroup)
            .to({ x: targetX }, 600)
            .easing(Easing.Quadratic.InOut)
            .onComplete(() => {
              new Tween(disk.position, this.tweenGroup)
                .to({ y: targetY }, 600)
                .easing(Easing.Bounce.Out)
                .onComplete(() => {
                  this.currentMove++;
                  this.isAnimating = false;
                })
                .start();
            })
            .start();
        })
        .start();
    } else {
      console.error('No disk found at source!', sourceX);
      this.currentMove++;
      this.isAnimating = false;
    }
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());
    
    // Explicitly update our group
    this.tweenGroup.update();
    this.controls.update();
    
    if (!this.isAnimating) {
      this.animateMove();
    }
    
    this.renderer.render(this.scene, this.camera);
  }

  private cleanupScene() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.tweenGroup.removeAll();
    this.disks.forEach(d => {
      d.geometry.dispose();
      (d.material as THREE.Material).dispose();
    });
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }
  }

  restart() {
    this.cleanupScene();
    this.currentMove = 0;
    this.isAnimating = false;
    this.moves = [];
    this.disks = [];
    this.towers = [];
    this.ngAfterViewInit();
  }
}