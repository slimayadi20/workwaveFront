import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetsRoutingModule } from './budgets-routing.module';
 
import { ListBudgetComponent } from './list-budget/list-budget.component';


@NgModule({
  declarations: [
 
    ListBudgetComponent
  ],
  imports: [
    CommonModule,
    BudgetsRoutingModule
  ]
})
export class BudgetsModule { }