import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPayementComponent } from './list-payement/list-payement.component';
import { PaymentsthismonthComponent } from './paymentsthismonth/paymentsthismonth.component';
import { SetSalaryComponent } from './set-salary/set-salary.component';
const routes: Routes = [

  { path: 'displaypayements', component: ListPayementComponent },
  { path: 'paymentsthismonth', component: PaymentsthismonthComponent },
  { path: 'setSalary', component: SetSalaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayementsRoutingModule { }