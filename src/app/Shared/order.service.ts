import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const baseUrl = 'http://localhost:8090';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
 
  public data: any;
  constructor(private http: HttpClient, private router: Router) { }

  createorder(body: any,userName:any) {
    return this.http.post(`${baseUrl}/addOrder?userName=${userName}`, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  editorder(body: any) {
    return this.http.put(`${baseUrl}/updateOrder`, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public getorder(o_id: any) {
    return this.http.get(`${baseUrl}/getOrder/` + o_id);
  }
  getorders() {
    return this.http.get(`${baseUrl}/Order`, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  deleteorder(o_id: number) {
    return this.http.delete(`${baseUrl}/deleteOrder/${o_id}`);
  }



  
}
