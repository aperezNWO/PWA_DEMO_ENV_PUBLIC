
// message.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})

export class MessageComponent {
  @Input() dataFromParent: any;
  @Output() dataFromChild = new EventEmitter<any>();
  
  receiveData(data: any) {
    // Handle the data received from the child
    console.log("[CHAT APP] - Received : " + JSON.stringify(data));
  }
}