import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = 'http://20.231.246.138:8090';

@Injectable({
  providedIn: 'root'
})
export class ScrumboardService {

  constructor(private http: HttpClient) { }
  getByProjectId(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/ScrumBoardbyproject/${id}`);
  }

}