import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Shared/order.service';
import { ProductService } from 'src/app/Shared/product.service';
import { SupplierService } from 'src/app/Shared/supplier.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  public orderDate: any;
  public quantity: any;
  data: any;
  supplier: any;
  constructor(private Orderservice: OrderService, private router: Router, private productservice: ProductService, private supplierservice: SupplierService) { }
  product: any;
  neworder = new FormGroup({
    orderDate: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    product: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {
    this.afficherproduit();
    this.afficherSupplier();
  }


  createorder() {
    console.log(this.neworder.value);
    console.log(this.neworder.value.product);

    const formData = {
      orderDate: this.neworder.value.orderDate,
      quantity: this.neworder.value.quantity,
      product: [this.neworder.value.product!],
      supplier: [this.neworder.value.supplier!],
    };
    console.log(formData);

    this.Orderservice.createorder(formData).subscribe(
      (data: any) => {
        console.log(data);
        // Reset form fields
        this.neworder.reset();
        this.router.navigateByUrl("/Order/displayorder");
      },
      (error: any) => {
        this.router.navigateByUrl("/Order/displayorder");
      }
    );
  }

  afficherproduit() {
    this.productservice.getproducts().subscribe(
      data => {
        this.product = data;
        console.log("data");
        console.log(data);
      });

  }
  afficherSupplier() {
    this.supplierservice.getsupplier().subscribe(
      data => {
        this.supplier = data;
        console.log("data");
        console.log(data);
      });

  }


}
