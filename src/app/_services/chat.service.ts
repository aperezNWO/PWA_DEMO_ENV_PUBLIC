// chat.service.ts
import { Injectable          } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { of                  } from 'rxjs';
import io from 'socket.io-client';
//
@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket: any;
  private messages: any[] = [];
  onNewMessage = new Subject<any>();

  //
  constructor() {
    //
    this.socket = io('https://2ylppr-3000.csb.app', {
      //
      extraHeaders: {
        "Access-Control-Allow-Origin": "*"
    }});
    // Replace with your server URL
    this.socket.on('message', (message: any) => {
      //
      console.log("received message : [" + JSON.stringify(message) + "]");
      //
      this.messages.push(message);
      //
      console.log("Message Array (service) : " + this.messages);
      //
      this.onNewMessage.next(message);
    });
  }

  //
  getMessages(): Observable<any[]> {
    //
    console.log("Receiving messages to UIX...");
    //
    return of(this.messages);
  }

  //
  sendMessage(message: string) {
    this.socket.emit('message', message);
  }
}
