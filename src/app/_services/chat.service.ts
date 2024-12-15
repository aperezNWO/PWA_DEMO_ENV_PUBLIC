// chat.service.ts
import { Injectable          } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConfigService      } from './config.service';
import { of                  } from 'rxjs';
import io from 'socket.io-client';

//
@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket: any;
  private messages: any[] = [];
  onNewMessage = new Subject<any>();

  //
  constructor(configService : ConfigService) {
    //
    let url =  configService.getConfigValue("baseUrlNodeJsChat");
    //
    console.log("Setting chat from url : " + url);
    //
    this.socket = io(url , {
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
