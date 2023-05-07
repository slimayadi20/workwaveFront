import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetsRoutingModule } from './budgets-routing.module';
import { CreateBudgetComponent } from './create-budget/create-budget.component';
import { EditBudgetComponent } from './edit-budget/edit-budget.component';
import { ListBudgetComponent } from './list-budget/list-budget.component';


@NgModule({
  declarations: [
    CreateBudgetComponent,
    EditBudgetComponent,
    ListBudgetComponent
  ],
  imports: [
    CommonModule,
    BudgetsRoutingModule
  ]
})
export class BudgetsModule { }
