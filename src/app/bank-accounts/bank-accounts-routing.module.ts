import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewmybankaccountComponent } from './viewmybankaccount/viewmybankaccount.component';
import { AddbanaccountComponent } from './addbanaccount/addbanaccount.component';

const routes: Routes = [
  { path: 'mybank', component: ViewmybankaccountComponent },
  { path: 'addbank', component: AddbanaccountComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankAccountsRoutingModule { }
