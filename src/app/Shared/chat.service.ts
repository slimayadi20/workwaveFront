import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs-websocket';
import { EncryptionService } from './encryption.service';
//import { Button, message } from "antd";



//import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'https://workwaveback.onrender.com';

  private socket: any;
  data: any;



  constructor(private http: HttpClient, private encryptionService: EncryptionService) {
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    console.log(this.data);
    const socket = new SockJS(this.baseUrl);
    //this.connect();
  }
  public stompClient: any;
  public msg: any;
  connect() {
    const socket = new SockJS(this.baseUrl +'/ws');
    this.stompClient = Stomp.over(socket);

    // Add JWT token to the header
    const jwtToken = this.data['token'];
    const headers = {
      Authorization: `${jwtToken}`
    };
    console.log(headers);

    this.stompClient.connect(headers, this.onConnect.bind(this), this.onError.bind(this));
  }

  onConnect(frame: any) {
    console.log("connected" + this.data);

    this.stompClient.subscribe(
      "/user/" + this.data['userName'] + "/queue/messages",
      (msg: any) => this.onMessageReceived(msg)
    );
  }
  public onMessageReceived(msg: any): void {
    const notification = JSON.parse(msg.body);
    //const active = JSON.parse(sessionStorage.getItem("recoil-persist") || "{}")
    //.chatActiveContact;




    if (this.data['userName'] == notification.senderId) {
      console.log(this.findMessage(notification.id));
      this.findMessage(notification.id).subscribe((message: any) => {

      });
    } else {
      alert("Received a new message from " + notification.senderName);

    }
    this.getuserActive();
  }

  onError(error: any) {
    console.log(error);
  }
  processMessage(body: any): void {
    this.http.post(`${this.baseUrl}/chat`, body).subscribe();
  }

  countNewMessages(senderId: string, recipientId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/messages/${senderId}/${recipientId}/count`);
  }
  

  findChatMessages(senderId: string, recipientId: string) {
    return this.http.get(`${this.baseUrl}/messages/${senderId}/${recipientId}`);

  }


  public findMessage(id: string) {
    return this.http.get(`${this.baseUrl}/messages/${id}`);
  }

  deleteMessage(id: string): void {
    this.http.delete(`${this.baseUrl}/messages/${id}`).subscribe();
  }

  updateMessage(id: string, content: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/messages/${id}`, { content });
  }

  addMessage(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/chat/add`, body);
  }

  sendMessage(message: any) {

   this.stompClient.send("/app/chat", {}, JSON.stringify(message));

  }
  public getuserActive() {
    return this.http.get(this.baseUrl + "/getUser");
  }
  public getAllUsers() {
    return this.http.get(this.baseUrl + "/users");
  }
  public getChatRooms(senderId: any) {
    return this.http.get(`${this.baseUrl}/chatRooms/${senderId}`);
  }
  public getAllChatRooms() {
    return this.http.get(this.baseUrl + "/chatRooms/{senderId}/{recipientId}");
  }
}