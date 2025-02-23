// chat.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe                     } from '@angular/common';
import { NgForm                       } from '@angular/forms';
import { ChatService                  } from 'src/app/_services/ChatService/chat.service';
//
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
//
export class ChatComponent implements OnInit {
  parentData: any[] = [];
  @ViewChild("_txtName")    txtName:any;
  @ViewChild("_txtMessage") txtMessage:any;
  constructor(private chatService: ChatService,private datePipe: DatePipe) {}

  ngOnInit() {
    this.chatService.getMessages().subscribe(messages => this.parentData = messages);
    this.chatService.onNewMessage.subscribe(message   => this.NotifyingMessage(message));
  }
  //
  NotifyingMessage(message: string): void {
    console.log("Pushing data to client : " + message);
    //this.parentData.push(message);
    console.log("Message Array (client) : " + this.parentData);
  }
  //
  submitForm(form: NgForm) {
    if (form.valid) {
      // Handle form submission logic
      console.log(form.value); // Access form values
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
    console.log("sending message: {" + message + "}");
    //
    this.chatService.sendMessage(messageToSend);
  }
}