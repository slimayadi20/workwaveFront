import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOrdersComponent } from '../orders-list/list-orders/list-orders.component';
import { CreateOrderComponent } from '../create-order.component';
import { EditOrderComponent } from '../../edit-order/edit-order/edit-order.component';

const routes: Routes = [
  
 
  { path: 'displayorder', component: ListOrdersComponent },
  { path: 'createorder', component: CreateOrderComponent },
  { path: 'editorder', component: EditOrderComponent },
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ordersRoutingModule { }
