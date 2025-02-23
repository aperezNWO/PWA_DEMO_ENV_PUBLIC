import { Component, OnInit, ViewChild         } from '@angular/core';
import { NavComponent                         } from '../../home/nav/nav.component';

@Component({
  selector: 'app-miscelaneous',
  templateUrl: './miscelaneous.component.html',
  styleUrl: './miscelaneous.component.css'
})
export class MiscelaneousComponent implements  OnInit {
  //
  //@ViewChild('nav') nav!      : NavComponent;
  //
  ngOnInit(): void {
    //this.nav._NavbarCollapsed = true;
  }
}
