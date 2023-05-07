import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8090';
@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getTodayPaymentsTotal(id:any) {
    return this.http.get(`${baseUrl}/${id}/payments-today-total`);
  }
  getTodayPaymentsPercentageChange(id:any) {
    return this.http.get(`${baseUrl}/${id}/payment-percentage-change`);
  }
  getPaymentsThisMonth(id:any) {
    return this.http.get(`${baseUrl}/${id}/payments-this-month`);
  }
  getPaymentsTotal(id:any) {
    return this.http.get(`${baseUrl}/totalAmountPaidBySenderBankAccountId?senderBankAccountId=${id}`);
  }
  


}
