import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 
  public data: any;
  constructor(private http: HttpClient, private router: Router) { }

  createorder(body: any) {
    return this.http.post("http://localhost:8091" + '/addOrder', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  editorder(body: any) {
    return this.http.put("http://localhost:8091" + '/updateOrder', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public getorder(o_id: any) {
    return this.http.get("http://localhost:8091" + "/getOrder/" + o_id);
  }
  getorders() {
    return this.http.get("http://localhost:8091" + '/Order', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  deleteorder(o_id: number) {
    return this.http.delete("http://localhost:8091" + `/deleteOrder/${o_id}`);
  }



  
}
