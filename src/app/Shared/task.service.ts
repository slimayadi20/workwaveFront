// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService {
//   addTask(value: any) {
//     throw new Error('Method not implemented.');
//   }
//   getTasks() {
//     throw new Error('Method not implemented.');
//   }

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseURL = 'http://localhost:8090';

  constructor(private http: HttpClient) { }


  addTask(body: any) {
    return this.http.post(`${this.baseURL}`+ '/addTask', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  changeTasketat(id:Number,etat :String) {
    return this.http.post(`${this.baseURL}/changeetat/${id}/${etat}`, {});
  }

}

