import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../Shared/chat.service';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs-websocket';



@Component({
  selector: 'app-display-chat',
  templateUrl: './display-chat.component.html',
  styleUrls: ['./display-chat.component.css']
})
export class DisplayChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  data: any;
  convos: any;
  messages: any;
  lastMessage: any;
  private messagesSubscription!: Subscription;

//////

public stompClient: any;
public msg: any;

/////
  input: any;
  data1: any;
  recepient: any;


  MessageAdd = new FormGroup({
    recipientId: new FormControl('slimayadi'),
    senderId: new FormControl('zakaria'),
    senderName: new FormControl('zakaria'),
    recipientName: new FormControl('slimayadi'),
    content: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    //timestamp: new FormControl(new Date().toISOString())
    timestamp: new FormControl(formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en', 'Africa/Tunis').toString())
  });

  constructor(private encrypt: EncryptionService, private chatService: ChatService) { }

  sendMessage(recepientId: any) {
    this.MessageAdd.get("recipientName")!.setValue(recepientId);
    this.MessageAdd.get("recipientId")!.setValue(recepientId);
    this.MessageAdd.get("senderId")!.setValue(this.data1['id']);
    this.MessageAdd.get("senderName")!.setValue(this.data1['id']);
    this.MessageAdd.get("timestamp")!.setValue(formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en', 'Africa/Tunis').toString());
    
    // Send the message via WebSocket
    this.sendMessages(this.MessageAdd.value);
    this.getChatRooms(this.data1['id']);
      
    
    // Clear the message input field
    this.MessageAdd.get("content")!.setValue("");
    this.findChatMessages(this.data1['id'],recepientId);
    this.findChatMessages(this.data1['id'],recepientId);
    this.findChatMessages(this.data1['id'],recepientId);
    this.findChatMessages(this.data1['id'],recepientId);
  }

  sendMessages(message: any) {
    this.stompClient.send("/app/chat", { 'sender': 'websocket' }, JSON.stringify(message));
  }

  

  


   async getAciveUsers() {
    try {
      const res = await this.chatService.getuserActive().toPromise();
      this.data = res;
    } catch (error) {
      console.log(error);
    }
  }


  async findChatMessages(senderId: any, recipientId: any) {
    try {
      this.messages = await this.chatService.findChatMessages(senderId, recipientId).toPromise();
      this.recepient = recipientId;
      //this.getChatRooms(this.data1['id']);
      
    } catch (error) {
      console.log(error);
    }
  }
  

  async getChatRooms(senderId: any) {
    try {
      const res = await this.chatService.getChatRooms(senderId).toPromise();
      this.convos = res;
      // this.convos.forEach((item:any) => {
        //display latest message
      // });
    } catch (error) {
      console.log(error);
    }
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  connect() {
    const socket = new SockJS('http://localhost:8082/ws');
    this.stompClient = Stomp.over(socket);

    // Add JWT token to the header
    const jwtToken = this.data1['token'];
    const headers = {
      Authorization: `${jwtToken}`
    };

    this.stompClient.connect(headers, this.onConnect.bind(this), this.onError.bind(this));
  }


  onConnect(frame: any) {
    console.log("connected" + this.data);

    this.stompClient.subscribe(
      "/user/" + this.data1['id'] + "/queue/messages",
      (msg: any) => this.onMessageReceived(msg)
    );
  }



  public onMessageReceived(msg: any): void {
    const notification = JSON.parse(msg.body);
    //const active = JSON.parse(sessionStorage.getItem("recoil-persist") || "{}")
    //.chatActiveContact;




    if (this.data1['id'] == notification.senderId) {
      console.log(this.chatService.findMessage(notification.id));
      this.chatService.findMessage(notification.id).subscribe((message: any) => {

      });
    } else {

      alert("Received a new message from " + notification.senderName);
      this.findChatMessages(this.data1['id'],notification.senderName);
      this.getChatRooms( this.data1['id'] );

    }
    this.chatService.getuserActive();
  }


  onError(error: any) {
    console.log(error);
  }


  ngOnInit(): void {
    this.getAciveUsers();
    this.data1 = this.encrypt.decrypt(localStorage.getItem('data')!);
    this.getChatRooms(this.data1['id']);


    ///////WEB-SOCKET
    
    
    const socket = new SockJS('http://localhost:8082/ws');
    this.connect();


  }
}
