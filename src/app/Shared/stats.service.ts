import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = 'https://20.231.246.138:8090';
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
  getPaymentsTodayList(id:any) {
    return this.http.get(`${baseUrl}/${id}/payments-today`);
  }
  getPaymentsHighest(id:any) {
    return this.http.get(`${baseUrl}/payments/highest/${id}`);
  }
  getPaymentsLowest(id:any) {
    return this.http.get(`${baseUrl}/payments/lowest/${id}`);
  }
  getHighestTransaction(id:any) {
    return this.http.get(`${baseUrl}/${id}/highest-transaction`);
  }
  getLowestTransaction(id:any) {
    return this.http.get(`${baseUrl}/${id}/lowest-transaction`);
  }
  getTransactionMonth(id:any) {
    return this.http.get(`${baseUrl}/${id}/transactions-count-by-month`);
  }
  getHighestBudgetProject(id:any) {
    return this.http.get(`${baseUrl}/${id}/highestBudget`);
  }

  getLowestBudgetProject(id:any) {
    return this.http.get(`${baseUrl}/${id}/lowestBudget`);
  }
  getBalanceHistory(id:any) {
    return this.http.get(`${baseUrl}/balances/${id}`);
  }
  getUserUnpaidNumber() {
    return this.http.get(`${baseUrl}/unpaid`);
  }
  getUserpaidNumber(id:any) {
    return this.http.get(`${baseUrl}/usersPaid?bankAccountId=${id}`);
  }
  getBudgetLowest(id:any) {
    return this.http.get(`${baseUrl}/${id}/lowestBudget`);
  }
  getBudgetHighest(id:any) {
    return this.http.get(`${baseUrl}/${id}/highestBudget`);
  }
  getBudgetCount() {
    return this.http.get(`${baseUrl}/Budget/count`);
  }
  getProjectCount() {
    return this.http.get(`${baseUrl}/projects/count`);
  }
  getProjectActiveCount() {
    return this.http.get(`${baseUrl}/projects/count/active`);
  }
  getProjectInActiveCount() {
    return this.http.get(`${baseUrl}/projects/count/inactive`);
  }
  getUserspaid(id:any) {
    return this.http.get(`${baseUrl}/usersPaid?bankAccountId=${id}`);
  }
  getTaskCount() {
    return this.http.get(`${baseUrl}/tasks/count`);
  }
  getTaskInProgress() {
    return this.http.get(`${baseUrl}/tasks/in-progress/count`);
  }
  getTaskInOpen() {
    return this.http.get(`${baseUrl}/tasks/open/count`);
  }
  getTaskInToReview() {
    return this.http.get(`${baseUrl}/tasks/toreview/count`);
  }
  getTaskInCompleted() {
    return this.http.get(`${baseUrl}/tasks/completed/count`);
  }





  



}