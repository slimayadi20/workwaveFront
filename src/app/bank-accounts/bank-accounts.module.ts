import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankAccountsRoutingModule } from './bank-accounts-routing.module';
import { ListAccountsComponent } from './list-accounts/list-accounts.component';
import { EditAccountsComponent } from './edit-accounts/edit-accounts.component';


@NgModule({
  declarations: [
    ListAccountsComponent,
    EditAccountsComponent
  ],
  imports: [
    CommonModule,
    BankAccountsRoutingModule
  ]
})
export class BankAccountsModule { }
