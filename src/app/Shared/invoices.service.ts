import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8090';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/Invoices`);
  }

  add(invoice: any): Observable<any> {
    return this.http.post(`${baseUrl}/addInvoice`, invoice);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/deleteInvoice/${id}`);
  }

  update(invoice: any): Observable<any> {
    return this.http.put(`${baseUrl}/updateInvoice`, invoice);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/Invoice/${id}`);
  }
  getbyBankAccount(id: Number) {
    return this.http.get(`${baseUrl}/InvoicesbyBankAccount/${id}`);
  }
}