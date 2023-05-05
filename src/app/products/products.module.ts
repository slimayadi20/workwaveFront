import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSupplierComponent } from '../Supplier/create-supplier/create-supplier.component';



@NgModule({
  declarations: [
    
    CreateProductComponent,
    EditproductComponent,
    
  
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class ProductsModule { }
