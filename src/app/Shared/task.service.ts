import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseURL = 'https://20.231.246.138:8090';

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

  updateTask(task:any){
    return this.http.put(`${this.baseURL}/updateTask}`, task);
  }

  getTaskById(taskId: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/Task/{id}/${taskId}`);
  }
  
}
