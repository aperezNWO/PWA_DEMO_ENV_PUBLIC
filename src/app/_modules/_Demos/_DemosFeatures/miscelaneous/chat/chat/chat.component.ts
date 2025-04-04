// chat.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe                     } from '@angular/common';
import { NgForm                       } from '@angular/forms'
import { ActivatedRoute               } from '@angular/router';;
import { ChatService                  } from 'src/app/_services/ChatService/chat.service';
import { BaseComponent                } from 'src/app/_components/base/base.component';
import { BackendService               } from 'src/app/_services/BackendService/backend.service';
import { SpeechService                } from 'src/app/_services/speechService/speech.service';
import { ConfigService                } from 'src/app/_services/ConfigService/config.service';
import { PAGE_MISCELANEOUS_CHAT       } from 'src/app/_models/common';
//
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
//
export class ChatComponent extends BaseComponent implements OnInit  {
  parentData: any[] = [];
  @ViewChild("_txtName")    txtName:any;
  @ViewChild("_txtMessage") txtMessage:any;
  //
  constructor(public chatService               : ChatService,
              public datePipe                  : DatePipe,
              public override configService    : ConfigService,
              public override backendService   : BackendService,
              public override route            : ActivatedRoute,
              public override speechService    : SpeechService) 
  {
      //
      super(configService,
            backendService,
            route,
            speechService,
            PAGE_MISCELANEOUS_CHAT);

  }
  ngOnInit() {
    this.chatService.getMessages().subscribe(messages => this.parentData = messages);
    this.chatService.onNewMessage.subscribe(message   => this.NotifyingMessage(message));
  }
  //
  NotifyingMessage(message: string): void {
    //console.log("Pushing data to client : " + message);
    //this.parentData.push(message);
    //console.log("Message Array (client) : " + this.parentData);
  }
  //
  submitForm(form: NgForm) {
    if (form.valid) {
      // Handle form submission logic
      //console.log(form.value); // Access form values
      //
      let name    = form.value['txtName'];
      let message = form.value['txtMessage'];
      //
      this.sendMessage(name,message);
    }
  }
  //  
  sendMessage(name : string ,message: string) {
    //
    const currentDate = new Date();
    let formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');
    //
    let messageToSend : string = `[${formattedDate}] -[${name}] Says: "${message}"`;
    //
    this.status_message.set(message);
    //
    this.chatService.sendMessage(messageToSend);
  }
}