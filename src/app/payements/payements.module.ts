import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayementsRoutingModule } from './payements-routing.module';
import { CreatePayementComponent } from './create-payement/create-payement.component';
import { ListPayementComponent } from './list-payement/list-payement.component';
import { PaymentsthismonthComponent } from './paymentsthismonth/paymentsthismonth.component';
import { SetSalaryComponent } from './set-salary/set-salary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetModalComponent } from './set-modal/set-modal.component';


@NgModule({
  declarations: [
    CreatePayementComponent,
    ListPayementComponent,
    PaymentsthismonthComponent,
    SetSalaryComponent,
    SetModalComponent
  ],
  imports: [
    CommonModule,
    PayementsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PayementsModule { }