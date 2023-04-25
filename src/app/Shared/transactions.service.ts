import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = 'http://localhost:8090';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/Transactions`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/Transaction/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/addTransaction`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/updateTransaction`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/deleteTransaction/${id}`);
  }
  getbyBankAccount(id: Number) {
    return this.http.get(`${baseUrl}/BankAccountByUser/${id}`);
  }
}