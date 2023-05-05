import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/Shared/supplier.service';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.css']
})
export class ListSupplierComponent {
  supplierList: any;

  constructor(private Supplierservice : SupplierService,private router : Router) { }
  ngOnInit(): void {
    this.getsupplier()

  }
  getsupplier() {
    this.Supplierservice.getsupplier().subscribe((res: any) => { this.supplierList = res ;
      console.log(res
      );
     });
  }

  deletesupplier(id: number) {
    this.Supplierservice.deletesupplier(id).subscribe(
      (data: any) => {
        console.log(data);
        this.getsupplier()
      },
      (error: any) => {
        console.log(error)
        this.getsupplier()
      }
    );
  }
 
  forwardtodetail(id: any) {
    this.router.navigate(
      ["/Supplier/editsupplier"],
      { queryParams: { supplier: id } }
    );
  }

}
