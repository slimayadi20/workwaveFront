import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(private http: HttpClient) { }
  PATH_OF_API = 'http://localhost:8090';

  public addCours(body: any) {
    console.log(body);
    return this.http.post(this.PATH_OF_API  + '/addCours', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public updateCours(body: any) {
    return this.http.put(this.PATH_OF_API  + '/updateCours', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public getCours() {
    return this.http.get(this.PATH_OF_API  + "/ShowCours");
  }
 
  public getCoursById(id:any) {
    return this.http.get(this.PATH_OF_API  + "/ShowCours/"+id);
  }
  public getCoursByFormation(id:any) {
    return this.http.get(this.PATH_OF_API  + "/CoursFormation/"+id);
  }
  public deleteCours(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
    });
    return this.http.delete(this.PATH_OF_API  + `/deleteCours/${data}`, { headers: headers });
  }
}
