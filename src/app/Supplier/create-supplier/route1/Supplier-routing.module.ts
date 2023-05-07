import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSupplierComponent } from '../create-supplier.component';
import { ListSupplierComponent } from '../../list-supplier/list-supplier/list-supplier.component';
import { UpdateComponent } from '../../update-supplier/update/update.component';



const routes: Routes = [
  { path: 'createsupplier', component: CreateSupplierComponent },
  { path: 'displaysupplier', component: ListSupplierComponent },
  { path: 'editsupplier', component: UpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
