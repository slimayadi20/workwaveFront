import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  public data :  any;
  constructor(private http: HttpClient, private router: Router) {}
  PATH_OF_API = 'https://workwaveback.onrender.com';

  createSupplier(body: any) {
    return this.http.post(this.PATH_OF_API + '/addSupplier', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getsupplier() {
    return this.http.get(this.PATH_OF_API + '/Supplier', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public getsupplier1(id: any) {
    return this.http.get(this.PATH_OF_API + "/getsupplier/" + id);
  }
  deletesupplier( id: number) {
    return this.http.delete(this.PATH_OF_API + `/deleteSupplier/${id}`);
  }

  editsupplier(body: any) {
    return this.http.put(this.PATH_OF_API + '/updateSupplier', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

}
