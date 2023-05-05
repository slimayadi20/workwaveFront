import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/Shared/order.service';
import { ProductService } from 'src/app/Shared/product.service';
import { SupplierService } from 'src/app/Shared/supplier.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent {
  o_id: any;
  product: any;
  supplier: any;
  neworder = new FormGroup({
    orderDate: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    product: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required]),
    o_id: new FormControl('', [Validators.required]),
  })
  constructor(private service: OrderService, private router: Router, private PAS: ProductService, private supplierservice: SupplierService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.o_id = this.route.snapshot.queryParams['order'];
    console.log(this.o_id);
    this.getdata();
    this.afficherSupplier();
    this.afficherproduit();
  }
  getdata() {
    this.service.getorder(this.o_id).subscribe((res: any) => {
      this.neworder.get("orderDate")!.setValue(res.orderDate);
      this.neworder.get("quantity")!.setValue(res.quantity);
      this.neworder.get("product")!.setValue(res.product[0]);
      this.neworder.get("supplier")!.setValue(res.supplier[0]);
      this.neworder.get("o_id")!.setValue(res.o_id);
      console.log(res);
    })
  }
  editorder() {
    const formData = {
      o_id: this.neworder.value.o_id,
      orderDate: this.neworder.value.orderDate,
      quantity: this.neworder.value.quantity,
      product: [this.neworder.value.product!],
      supplier: [this.neworder.value.supplier!],
    };
    this.service.editorder(formData).subscribe((res: any) => {
      this.neworder.setValue(res);
      console.log(res);
      this.router.navigateByUrl("/Order/displayorder");


    }, (err: any) => {

      this.router.navigateByUrl("/Order/displayorder");

    })
  }
  afficherproduit() {
    this.PAS.getproducts().subscribe(
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
