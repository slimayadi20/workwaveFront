import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyinvoicesComponent } from './myinvoices/myinvoices.component';
import { OneinvoiceComponent } from './oneinvoice/oneinvoice.component';
import { InvoiceprintComponent } from './invoiceprint/invoiceprint.component';
const routes: Routes = [
  { path: 'myinvoices', component: MyinvoicesComponent },
  { path: 'oneinvoice', component: OneinvoiceComponent },
  { path: 'printinvoice', component: InvoiceprintComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
