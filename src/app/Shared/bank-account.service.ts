import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EncryptionService } from './encryption.service';
import { BehaviorSubject } from 'rxjs';
const baseUrl = 'http://localhost:8090';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${baseUrl}/BankAccount`);
  }

  getById(id: number) {
    return this.http.get(`${baseUrl}/BankAccount/${id}`);
  }

  getbyUser(userName: string) {
    return this.http.get(`${baseUrl}/BankAccountByUser/${userName}`);
  }

  addBankAccount(bankAccount: any) {
    return this.http.post(`${baseUrl}/addBankAccount`, bankAccount);
  }

  updateBankAccount(bankAccount: any) {
    return this.http.put(`${baseUrl}/updateBankAccount`, bankAccount);
  }

  deleteBankAccount(id: number) {
    return this.http.delete(`${baseUrl}/deleteBankAccount/${id}`);
  }
}