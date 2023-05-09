import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = 'https://20.231.246.138:8090';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/Project`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/Project/${id}`);
  }


  addProject(project: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/addProject/`, project);
  }

  updateProject(project: any): Observable<any> {
    return this.http.put<any>(`${baseUrl}/updateProject/`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/deleteProject/${id}`);
  }
}