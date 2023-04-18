import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const baseUrl = 'http://localhost:8090';

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
}