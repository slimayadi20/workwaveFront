import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListtransactionsComponent } from './listtransactions/listtransactions.component';
const routes: Routes = [
  { path: 'displaytransactions', component: ListtransactionsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }