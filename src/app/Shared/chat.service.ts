import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) { }

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
}
