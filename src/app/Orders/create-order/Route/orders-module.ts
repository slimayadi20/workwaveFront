import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrderComponent } from '../create-order.component';
import { ListOrdersComponent } from '../orders-list/list-orders/list-orders.component';
import { ordersRoutingModule } from './orders-routing.module';
import { EditOrderComponent } from '../../edit-order/edit-order/edit-order.component';



@NgModule({
  declarations: [
   CreateOrderComponent,
   ListOrdersComponent,
   EditOrderComponent,

   

  
  ],
  imports: [
    CommonModule,
    ordersRoutingModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class ordersModule { }
