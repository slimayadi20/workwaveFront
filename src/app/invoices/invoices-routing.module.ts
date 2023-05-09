import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyinvoicesComponent } from './myinvoices/myinvoices.component';
import { OneinvoiceComponent } from './oneinvoice/oneinvoice.component';
const routes: Routes = [
  { path: 'myinvoices', component: MyinvoicesComponent },
  { path: 'oneinvoice/:id', component: OneinvoiceComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }