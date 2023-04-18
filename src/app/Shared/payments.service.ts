import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const baseUrl = 'http://localhost:8090';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  constructor(private http: HttpClient) { }

  addPayment(payment: any) {
    return this.http.post(`${baseUrl}/addPayment`, payment);
  }

  deletePayment(id: number) {
    return this.http.delete(`${baseUrl}/deletePayment/${id}`);
  }

  updatePayment(payment: any) {
    return this.http.put(`${baseUrl}/updatePayment`, payment);
  }

  getAllPayments() {
    return this.http.get(`${baseUrl}/Payments`);
  }

  getPaymentById(id: number) {
    return this.http.get(`${baseUrl}/Payment/${id}`);
  }

  getPaymentsByBankAccount(idBankAccount: number) {
    return this.http.get(`${baseUrl}/PaymentsByBankAccount/${idBankAccount}`);
  }
}