import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  PATH_OF_API = 'https://workwaveback.onrender.com';
 
  public data: any;
  constructor(private http: HttpClient, private router: Router) { }

  createorder(body: any) {
    return this.http.post(this.PATH_OF_API + '/addOrder', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  editorder(body: any) {
    return this.http.put(this.PATH_OF_API + '/updateOrder', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public getorder(o_id: any) {
    return this.http.get(this.PATH_OF_API + "/getOrder/" + o_id);
  }
  getorders() {
    return this.http.get(this.PATH_OF_API + '/Order', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  deleteorder(o_id: number) {
    return this.http.delete(this.PATH_OF_API + `/deleteOrder/${o_id}`);
  }



  
}
