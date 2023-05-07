import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayementsRoutingModule } from './payements-routing.module';
import { CreatePayementComponent } from './create-payement/create-payement.component';
import { ListPayementComponent } from './list-payement/list-payement.component';


@NgModule({
  declarations: [
    CreatePayementComponent,
    ListPayementComponent
  ],
  imports: [
    CommonModule,
    PayementsRoutingModule
  ]
})
export class PayementsModule { }
