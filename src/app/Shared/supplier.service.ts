import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  public data :  any;
  constructor(private http: HttpClient, private router: Router) {}

  createSupplier(body: any) {
    return this.http.post("http://localhost:8091" + '/addSupplier', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getsupplier() {
    return this.http.get("http://localhost:8091" + '/Supplier', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public getsupplier1(id: any) {
    return this.http.get("http://localhost:8091" + "/getsupplier/" + id);
  }
  deletesupplier( id: number) {
    return this.http.delete("http://localhost:8091" + `/deleteSupplier/${id}`);
  }

  editsupplier(body: any) {
    return this.http.put("http://localhost:8091" + '/updateSupplier', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

}
