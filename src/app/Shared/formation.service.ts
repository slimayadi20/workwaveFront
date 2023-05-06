import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  constructor(private http: HttpClient, private router: Router) { }

  public addForm(body: any) {
    return this.http.post("http://localhost:8090" + '/addForm', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public updateForm(body: any) {
    return this.http.put("http://localhost:8090" + '/updateForm', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public getForms() {
    return this.http.get("http://localhost:8090" + "/showForm");
  }
  public getForm(id: any) {
    return this.http.get("http://localhost:8090" + "/showForm/" + id);
  }
  public delete(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
    });
    return this.http.delete("http://localhost:8090" + `/deleteForm/${data}`, { headers: headers });
  }
  // historique 
  public getHisto(id: any) {
    return this.http.get("http://localhost:8090" + "/findbyUser/" + id);
  }

  public historiquebyuserandformation(id: any, idformation: any) {
    return this.http.get("http://localhost:8090" + "/historiquebyuserandformation/" + id + "/" + idformation);
  }
  public addHisto(body: any) {
    return this.http.post("http://localhost:8090" + '/addHistorique', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public updateHisto(body: any) {
    return this.http.put("http://localhost:8090" + '/updateHistorique', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
