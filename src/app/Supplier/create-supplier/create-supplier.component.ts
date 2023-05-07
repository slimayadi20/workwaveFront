import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/Shared/supplier.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent {
  public address: any;
  public email: any;
  public name: any;
  data: any;

  constructor(private Supplierservice: SupplierService, private Router: Router, private supplierservice: SupplierService) { }
  public newsupplier = new FormGroup({
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });


  createsupplier() {
    this.Supplierservice.createSupplier(this.newsupplier.value).subscribe(
      (data: any) => {
        console.log(data);
        // Reset form fields
        this.Router.navigate(["/supplier/displaysupplier"])
        this.newsupplier.reset();
      },
      (error: any) =>
        this.Router.navigateByUrl("/Supplier/displaysupplier")
    );
  }
}
