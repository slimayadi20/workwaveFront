import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { ListtransactionsComponent } from './listtransactions/listtransactions.component';


@NgModule({
  declarations: [
    ListtransactionsComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
