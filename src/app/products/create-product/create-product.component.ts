import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Shared/product.service';



@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  public name: any;
  public price: any;
  public quantity: any;
  data: any;

  constructor(private productservice: ProductService, private Router: Router, private productService: ProductService) { }
  newproduct = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  })


  createProduct() {
    this.productService.createProduct(this.newproduct.value).subscribe(
      (data: any) => {
        console.log(data);
        // Reset form fields
        this.Router.navigate(["/products/displayproduct"])
        this.newproduct.reset();
      },
      (error: any) => 

      this.Router.navigateByUrl("/products/displayproduct")
    );
  }









}
