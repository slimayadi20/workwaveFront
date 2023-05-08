import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/Shared/product.service';



@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  public name: any;
  public price: any;
  public quantity: any;
  data: any;

  constructor(private productservice: ProductService, private Router: Router, private productService: ProductService, public spinner: NgxSpinnerService) { }
  newproduct = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
  }
  createProduct() {
    console.log("aaaaaaaaaaaaaaaaaa");

    this.spinner.show();
    // Hide spinner after 5 seconds
    setTimeout(() => {
      this.spinner.hide();
    }, 13000);
    this.productService.createProduct(this.newproduct.value).subscribe(
      (data: any) => {
        console.log(data);
        console.log("aaaaaaaaaaaaaaaaaa");

        // Reset form fields
        this.Router.navigate(["/products/displayproduct"])
        this.newproduct.reset();
      },
      err => {
        this.spinner.hide();
        this.Router.navigate(["/products/displayproduct"])

      },
      () => {
        // Hide spinner when the authentication process is complete
        this.spinner.hide();
      }
    );
  }


}
