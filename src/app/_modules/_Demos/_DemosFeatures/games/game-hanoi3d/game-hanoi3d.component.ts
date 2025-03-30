import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import * as TWEEN from 'tween';
import { PageRestartService } from 'src/app/_services/pageRestart/page-restart.service';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/_services/BackendService/backend.service';
import { SpeechService } from 'src/app/_services/speechService/speech.service';
import { BaseComponent } from 'src/app/_components/base/base.component';

@Component({
  selector: 'app-game-hanoi3d',
  templateUrl: './game-hanoi3d.component.html',
  styleUrl: './game-hanoi3d.component.css'
})
export class GameHanoi3dComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererContainer', { static: false }) rendererContainer!: ElementRef;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  disks: THREE.Mesh[] = [];
  towers: THREE.Mesh[] = [];
  numDisks = 3; // Number of disks
  moves: { from: number, to: number }[] = [];
  currentMove = 0;
  isAnimating = false;

  //
  constructor(
                  public  pageRestartService        : PageRestartService,
                  public  override route            : ActivatedRoute,
                  public  override speechService    : SpeechService,
                  public  override backendService   : BackendService) 
  { 
      //
      super(backendService,
            route,
            speechService,
            "[GAMES - HANOI 3D]"
      )
  }

  restart() {
    this.pageRestartService.reloadPage(); // or use any other method
  }
    
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.initScene();
    this.createTowers();
    this.createDisks();
    this.solveHanoi(this.numDisks, 0, 2, 1); // Solve the Hanoi puzzle
    this.animate();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.rendererContainer.nativeElement.offsetWidth / this.rendererContainer.nativeElement.offsetHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.rendererContainer.nativeElement.offsetWidth, this.rendererContainer.nativeElement.offsetHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.set(10, 10, 10);
    this.controls.update();

    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1).normalize();
    this.scene.add(directionalLight);
  }

  createTowers() {
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Gray
    for (let i = 0; i < 3; i++) {
      const tower = new THREE.Mesh(geometry, material);
      tower.position.set(i * 4 - 4, 2.5, 0); // Position towers
      this.towers.push(tower);
      this.scene.add(tower);
    }
  }

  createDisks() {
    for (let i = 0; i < this.numDisks; i++) {
      const geometry = new THREE.CylinderGeometry(1 - i * 0.1, 1 - i * 0.1, 0.5, 32);
      const material = new THREE.MeshBasicMaterial({ color: new THREE.Color().setHSL(i / this.numDisks, 1, 0.5) }); // Varying colors
      const disk = new THREE.Mesh(geometry, material);
      disk.position.set(-4, (i * 0.5) + 0.25, 0); // Initial position on first tower
      this.disks.push(disk);
      this.scene.add(disk);
    }
  }

  solveHanoi(n: number, source: number, target: number, auxiliary: number) {
    if (n > 0) {
      this.solveHanoi(n - 1, source, auxiliary, target);
      this.moves.push({ from: source, to: target });
      this.solveHanoi(n - 1, auxiliary, target, source);
    }
  }  

  animateMove() {
    if (this.currentMove < this.moves.length && !this.isAnimating) {
      this.isAnimating = true;
      const move = this.moves[this.currentMove];

      // Correct Disk Selection: Find the top disk on the source tower
      const disksOnSource = this.disks.filter(d => Math.abs(d.position.x - this.towers[move.from].position.x) < 0.1).sort((a, b) => b.position.y - a.position.y);
      if (disksOnSource.length > 0) {
        const diskToMove = disksOnSource[0];

        const targetY = this.towers[move.to].position.y + 0.25 + this.disks.filter(d => Math.abs(d.position.x - this.towers[move.to].position.x) < 0.1).length * 0.5;
        
        new TWEEN.Tween(diskToMove.position)
          .to({ y: diskToMove.position.y + 3 }, 500) // Move up
          .onComplete(() => {
            new TWEEN.Tween(diskToMove.position)
              .to({ x: this.towers[move.to].position.x }, 500) // Move across
              .onComplete(() => {
                new TWEEN.Tween(diskToMove.position)
                  .to({ y: targetY }, 500) // Move down
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
        this.currentMove++;
        this.isAnimating = false;
      }
    }
  }

  animate() {
      requestAnimationFrame(this.animate.bind(this));
      TWEEN.update();
      this.controls.update();
      if (this.currentMove < this.moves.length) this.animateMove();
      this.renderer.render(this.scene, this.camera);
  }
}
