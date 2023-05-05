import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  PATH_OF_API = 'http://localhost:8091';

  public data: any;
  constructor(private http: HttpClient, private router: Router) { }

  createProduct(body: any) {
    return this.http.post("http://localhost:8091" + '/addproducts', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  editProduct(body: any) {
    return this.http.put("http://localhost:8091" + '/updateproducts', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  


  public getproduct(id: any) {
    return this.http.get("http://localhost:8091" + "/getproduct/" + id);
  }
  getproducts() {
    return this.http.get("http://localhost:8091" + '/products', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  getproductspagination(page: number) {
    let params = new HttpParams().set('page', page.toString());

    return this.http.get("http://localhost:8091" + '/products', { params: params })
  }


  deleteProduct(p_id: number) {
    return this.http.delete("http://localhost:8091" + `/deleteproducts/${p_id}`);
  }


}

