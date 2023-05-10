import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  constructor(private http: HttpClient, private router: Router) { }

  public addCateg(body: any) {
    return this.http.post("http://20.231.246.138:8090" + '/addCateg', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public updateCateg(body: any) {
    return this.http.put("http://20.231.246.138:8090" + '/updateCateg', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public getCategs() {
    return this.http.get("http://20.231.246.138:8090" + "/Categs");
  }
  public getCategspage(page: number) {
    let params = new HttpParams().set('page', page.toString());
     
    return this.http.get("http://20.231.246.138:8090" + '/categ/list', {params: params});
  }
  public getCateg(id:any) {
    return this.http.get("http://20.231.246.138:8090" + "/Categ/"+id);
  }
  public deleteForm(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
    });
    return this.http.delete("http://20.231.246.138:8090" + `/deleteCateg/${data}`, { headers: headers });
  }
}