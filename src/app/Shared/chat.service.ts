import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs-websocket';
import { EncryptionService } from './encryption.service';


//import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:8082';

  private socket: any;
  data: any;

  constructor(private http: HttpClient, private encryptionService: EncryptionService) {
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    console.log(this.data);
    const socket = new SockJS('http://localhost:8082/ws');
    this.connect();
  }
  public stompClient: any;
  public msg: any;
  connect() {
    const socket = new SockJS('http://localhost:8082/ws');
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
      "/user/" + this.data['id'] + "/queue/messages" //change id to userName 
    );
    // this.sendMessage("zakaria aadzqdqslcsqcqs");
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

  findChatMessages(senderId: string, recipientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/messages/${senderId}/${recipientId}`);
  }

  findMessage(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/messages/${id}`);
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
  public getChatRooms(senderId:any) {
    return this.http.get(`${this.baseUrl}/chatRooms/${senderId}`);
  }
  public getAllChatRooms() {
    return this.http.get(this.baseUrl + "/chatRooms/{senderId}/{recipientId}");
  }
}
