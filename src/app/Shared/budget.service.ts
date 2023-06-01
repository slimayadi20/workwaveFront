import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const baseUrl = 'https://workwaveback.onrender.com';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  getAllBudgets() {
    return this.http.get(`${baseUrl}/Budgets`);
  }

  getBudgetById(id: number) {
    return this.http.get(`${baseUrl}/Budget/${id}`);
  }

  addBudget(budget: any) {
    return this.http.post(`${baseUrl}/addBudget`, budget);
  }

  updateBudget(budget: any) {
    return this.http.put(`${baseUrl}/updateBudget`, budget);
  }

  deleteBudget(id: number) {
    return this.http.delete(`${baseUrl}/deleteBudget/${id}`);
  }
  requestBudget(p_id:any,Amount:any,b_id:any){
    return this.http.post(`${baseUrl}/requestBudget?ProjectID=${p_id}&Amount=${Amount}&BankAccountId=${b_id}`, null);

  }
  AcceptBudget(b_id:any){
    return this.http.post(`${baseUrl}/approveBudget/${b_id}`, null);

  }
  getAllBudgetsByBankAndStatus(id:any,Status:any) {
    return this.http.get(`${baseUrl}/BudgetByBankAccount/${id}/${Status}`);
  }
  
}