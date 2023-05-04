import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { MyinvoicesComponent } from './myinvoices/myinvoices.component';
import { OneinvoiceComponent } from './oneinvoice/oneinvoice.component';
import { InvoiceprintComponent } from './invoiceprint/invoiceprint.component';

@NgModule({
  declarations: [
    OneinvoiceComponent,
    MyinvoicesComponent,
    InvoiceprintComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule
  ]
})
export class InvoicesModule { }
