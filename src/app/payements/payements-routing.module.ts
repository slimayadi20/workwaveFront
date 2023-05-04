import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPayementComponent } from './list-payement/list-payement.component';
import { PaymentsthismonthComponent } from './paymentsthismonth/paymentsthismonth.component';
const routes: Routes = [

  { path: 'displaypayements', component: ListPayementComponent },
  { path: 'paymentsthismonth', component: PaymentsthismonthComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayementsRoutingModule { }
