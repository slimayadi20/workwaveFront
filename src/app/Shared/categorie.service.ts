import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  constructor(private http: HttpClient, private router: Router) { }

  public addCateg(body: any) {
    return this.http.post("https://workwaveback.onrender.com" + '/addCateg', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public updateCateg(body: any) {
    return this.http.put("https://workwaveback.onrender.com" + '/updateCateg', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public getCategs() {
    return this.http.get("https://workwaveback.onrender.com" + "/Categs");
  }
  public getCategspage(page: number) {
    let params = new HttpParams().set('page', page.toString());
     
    return this.http.get("https://workwaveback.onrender.com" + '/categ/list', {params: params});
  }
  public getCateg(id:any) {
    return this.http.get("https://workwaveback.onrender.com" + "/Categ/"+id);
  }
  public deleteForm(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
    });
    return this.http.delete("https://workwaveback.onrender.com" + `/deleteCateg/${data}`, { headers: headers });
  }
}