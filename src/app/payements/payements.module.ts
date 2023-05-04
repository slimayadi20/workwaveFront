import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayementsRoutingModule } from './payements-routing.module';
import { CreatePayementComponent } from './create-payement/create-payement.component';
import { ListPayementComponent } from './list-payement/list-payement.component';
import { PaymentsthismonthComponent } from './paymentsthismonth/paymentsthismonth.component';


@NgModule({
  declarations: [
    CreatePayementComponent,
    ListPayementComponent,
    PaymentsthismonthComponent
  ],
  imports: [
    CommonModule,
    PayementsRoutingModule
  ]
})
export class PayementsModule { }
