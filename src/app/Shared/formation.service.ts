import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  constructor(private http: HttpClient, private router: Router) { }

  public addForm(body: any) {
    return this.http.post("https://workwaveback.onrender.com" + '/addForm', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public updateForm(body: any) {
    return this.http.put("https://workwaveback.onrender.com" + '/updateForm', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public getForms() {
    return this.http.get("https://workwaveback.onrender.com" + "/showForm");
  }
  public getForm(id: any) {
    return this.http.get("https://workwaveback.onrender.com" + "/showForm/" + id);
  }
  public getFormswithcateg(id: any) {
    return this.http.get("https://workwaveback.onrender.com" + "/showFormByCateg/" + id);
  }
  public delete(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
    });
    return this.http.delete("https://workwaveback.onrender.com" + `/deleteForm/${data}`, { headers: headers });
  }
  // historique 
  public getHisto(id: any) {
    return this.http.get("https://workwaveback.onrender.com" + "/findbyUser/" + id);
  }
  public getAllHisto() {
    return this.http.get("https://workwaveback.onrender.com" + "/ShowHistorique");
  }

  public historiquebyuserandformation(id: any, idformation: any) {
    return this.http.get("https://workwaveback.onrender.com" + "/historiquebyuserandformation/" + id + "/" + idformation);
  }
  public addHisto(body: any) {
    return this.http.post("https://workwaveback.onrender.com" + '/addHistorique', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public updateHisto(body: any) {
    return this.http.put("https://workwaveback.onrender.com" + '/updateHistorique', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  // quiz
  public getQuiz(id: any) {
    return this.http.get("https://workwaveback.onrender.com" + "/quizbyformation/" + id);
  }
  public getQuizById(id: any) {
    return this.http.get("https://workwaveback.onrender.com" + "/quizbyid/" + id);
  }
  public getAllQuiz() {
    return this.http.get("https://workwaveback.onrender.com" + "/ShowQuizz" );
  }
  public deleteQuiz(id:any) {
    return this.http.delete("https://workwaveback.onrender.com" + "/deleteQuizz/"+id );
  }
  public addQuiz(body: any) {
    return this.http.post("https://workwaveback.onrender.com" + '/addQuizz', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public updateQuiz(body: any) {
    return this.http.put("https://workwaveback.onrender.com" + '/updateQuizz', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
