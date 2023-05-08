import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSupplierComponent } from '../Supplier/create-supplier/create-supplier.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    
    CreateProductComponent,
    EditproductComponent,  
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),


    
  ],
  schemas: [NO_ERRORS_SCHEMA]

})
export class ProductsModule { }
