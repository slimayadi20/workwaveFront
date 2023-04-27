import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankAccountsRoutingModule } from './bank-accounts-routing.module';
import { ViewmybankaccountComponent } from './viewmybankaccount/viewmybankaccount.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';
import { AddbanaccountComponent } from './addbanaccount/addbanaccount.component';



@NgModule({
  declarations: [
    ViewmybankaccountComponent,
    AddbanaccountComponent
  ],
  imports: [
    CommonModule,
    BankAccountsRoutingModule,
    ReactiveFormsModule,
    NgxPayPalModule,
  ]
})
export class BankAccountsModule { }
