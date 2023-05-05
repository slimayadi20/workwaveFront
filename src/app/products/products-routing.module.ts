import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { CreateSupplierComponent } from '../Supplier/create-supplier/create-supplier.component';

const routes: Routes = [
  
  { path: 'displayproduct', component: ProductListComponent },
  { path: 'createproduct', component: CreateProductComponent },
  { path: 'editproduct', component: EditproductComponent },
  { path: 'displaysupplier', component: CreateSupplierComponent },
  { path: 'createsupplier', component: CreateSupplierComponent },
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
