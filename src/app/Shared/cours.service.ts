import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(private http: HttpClient) { }
  PATH_OF_API = 'http://localhost:8090';

  public addCours(body: any) {
    return this.http.post("http://localhost:8090" + '/addCours', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public updateCours(body: any) {
    return this.http.put("http://localhost:8090" + '/updateCours', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public getCours() {
    return this.http.get("http://localhost:8090" + "/Courss");
  }
 
  public getCoursById(id:any) {
    return this.http.get("http://localhost:8090" + "/Cours/"+id);
  }
  public getCoursByFormation(id:any) {
    return this.http.get("http://localhost:8090" + "/CoursFormation/"+id);
  }
  public deleteCours(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
    });
    return this.http.delete("http://localhost:8090" + `/deleteCours/${data}`, { headers: headers });
  }
}
