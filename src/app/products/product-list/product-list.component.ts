import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Shared/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: any;
  page: number = 0;
  pages: Array<number> | undefined;
  term: any;

  constructor(public productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getproducts()
  }

  deleteProduct(p_id: number) {
    this.productService.deleteProduct(p_id).subscribe(
      (data: any) => {
        console.log(data);
        this.getproducts()
      },
      (error: any) => {
        console.log(error)
        this.getproducts()
      });
  }
  getproducts() {
    this.productService.getproductspagination(this.page).subscribe((res: any) => {
      // this.productList = res; console.log(res);
      console.log(res);

      this.productList = res['content'];
      this.pages = new Array(res['totalPages']);
    });
  }
  forwardtodetail(id: any) {
    this.router.navigate(
      ["/products/editproduct"],
      { queryParams: { product: id } }
    );
  }
  setPage(i: any, event: any) {
    event.preventDefault();
    this.page = i;
    this.getproducts();
  }
}
