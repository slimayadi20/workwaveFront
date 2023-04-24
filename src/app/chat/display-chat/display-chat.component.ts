import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../Shared/chat.service';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-display-chat',
  templateUrl: './display-chat.component.html',
  styleUrls: ['./display-chat.component.css']
})
export class DisplayChatComponent  implements OnInit{
 data:any[]=[];
 convos:any[]=[];
 messages:any[]=[];
lastMessage:any;


 input:any;
 data1:any;
 recepient:any;
 

  MessageAdd = new FormGroup({
  recipientId: new FormControl('slimayadi'),
  senderId: new FormControl('zakaria'),
  senderName: new FormControl('zakaria'),
  recipientName: new FormControl('slimayadi'),
  content: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
  //timestamp: new FormControl(new Date().toISOString())
  timestamp: new FormControl(formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en','Africa/Tunis').toString())
});

  constructor(private encrypt: EncryptionService,private chatService:ChatService ) {}
  sendMessage(recepientId:any) {
    this.MessageAdd.get("recipientName")!.setValue(recepientId);
    this.MessageAdd.get("recipientId")!.setValue(recepientId);
      this.chatService.sendMessage(this.MessageAdd.value)
      this.getChatRooms(this.data1['id']);
      //location.reload();
     
    }
 

  getAciveUsers (){
    this.chatService.getuserActive().subscribe((res:any)=>{
      
      this.data=res;
      console.log(res);
    });
}
findChatMessages(senderId:any,recipientId:any){
 this.chatService.findChatMessages(senderId,recipientId).subscribe((res:any)=>{
this.messages=res;
console.log(res);
this.recepient=recipientId;
/*
this.messages.sort((a: any, b: any) => b.timestamp - a.timestamp);
    // Get the most recent message
    const lastMessages: Set<any> = new Set();
    this.lastMessage = this.messages[0]['content'];
    console.log("the last message"+this.lastMessage);
    lastMessages.add(this.lastMessage);
    lastMessages.forEach((element) => {
      console.log("set"+element);
    });
    return lastMessages;
    
  */ 



 }); 
}
getChatRooms(senderId:any){
this.chatService.getChatRooms(senderId).subscribe((res:any)=>{
this.convos=res;
this.convos.forEach((item) => {
  /*
  this.findChatMessages(senderId,item['recipientId']);
  */
 
  
});


console.log(res);
});

}


ngOnInit(): void {
   this.getAciveUsers();
   this.data1 = this.encrypt.decrypt(localStorage.getItem('data')!);
   
   this.MessageAdd.get("senderId")!.setValue(this.data1['id']);
   this.MessageAdd.get("senderName")!.setValue(this.data1['id']);
   
   this.getChatRooms(this.data1['id']);
   
   
   
 }

 
}
