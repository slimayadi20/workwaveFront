import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBudgetComponent } from './list-budget/list-budget.component';

const routes: Routes = [
  { path: 'listBudgets', component: ListBudgetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetsRoutingModule { }