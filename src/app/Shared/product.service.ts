import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  PATH_OF_API = 'https://workwaveback.onrender.com';

  public data: any;
  constructor(private http: HttpClient, private router: Router) { }

  createProduct(body: any) {
    return this.http.post(this.PATH_OF_API + '/addproducts', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  editProduct(body: any) {
    return this.http.put(this.PATH_OF_API + '/updateproducts', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  


  public getproduct(id: any) {
    return this.http.get(this.PATH_OF_API + "/getproduct/" + id);
  }
  getproducts() {
    return this.http.get(this.PATH_OF_API + '/products', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  getproductspagination(page: number) {
    let params = new HttpParams().set('page', page.toString());

    return this.http.get(this.PATH_OF_API + '/productss', { params: params })
  }


  deleteProduct(p_id: number) {
    return this.http.delete(this.PATH_OF_API + `/deleteproducts/${p_id}`);
  }


}

