import { Component, Input } from '@angular/core';
import { CommonModule     } from '@angular/common';
//
@Component({
  selector: 'app-tower',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tower.component.html',
  styleUrls: ['./tower.component.css']
})
export class TowerComponent {
 //
 @Input() tower: any;
 //  
 toArray(map: Map<any, any>): any[] {
   return Array.from(map.entries());
 }
}
