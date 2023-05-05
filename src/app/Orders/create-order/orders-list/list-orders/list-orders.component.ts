import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Shared/order.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {

  orderList: any;
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.getorders()

  }

  deleteorder(o_id: number) {
    this.orderService.deleteorder(o_id).subscribe(
      (data: any) => {
        console.log(data);
        this.getorders()

      },
      (error: any) => {
        console.log(error)
        this.getorders()
      }
    );
  }
  getorders() {
    this.orderService.getorders().subscribe((res: any) => {
      this.orderList = res; console.log(res);
    });
  }

  forwardtodetail(o_id: any) {
    this.router.navigate(
      ["/Order/editorder"],
      { queryParams: { order: o_id } }
    );
  }

}
