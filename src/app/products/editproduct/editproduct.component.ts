import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Shared/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  id: any;
  newproduct = new FormGroup({
    p_id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    filename: new FormControl('', [Validators.required]),
    o_id: new FormControl('', [Validators.required]),
  })
  constructor(private router: Router, private service: ProductService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['product'];
    console.log(this.id);
    this.getdata()

  }
  getdata() {
    this.service.getproduct(this.id).subscribe((res: any) => {
      this.newproduct.setValue(res);
      console.log(res);
      
    })
  }
  editproduct(){
    this.newproduct.get("p_id")!.setValue(this.id);

    this.service.editProduct(this.newproduct.value).subscribe((res: any) => {
      this.newproduct.setValue(res);
      console.log(res);
      
      
    })
  }
  


}
