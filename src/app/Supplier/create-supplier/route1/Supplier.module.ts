import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateSupplierComponent } from "../create-supplier.component";
import { NgModule } from "@angular/core";
import { SupplierRoutingModule } from "./Supplier-routing.module";
import { ListSupplierComponent } from "../../list-supplier/list-supplier/list-supplier.component";
import { UpdateComponent } from "../../update-supplier/update/update.component";

@NgModule({
    declarations: [
    
      CreateSupplierComponent,
      ListSupplierComponent,
      UpdateComponent,
    
    ],
    imports: [
      CommonModule,
      SupplierRoutingModule,
      ReactiveFormsModule,
      FormsModule
      
    ]
  })
  export class SupplierModule { }
  