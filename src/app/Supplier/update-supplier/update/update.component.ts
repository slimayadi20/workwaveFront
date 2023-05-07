import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/Shared/supplier.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id: any;
  newsupplier = new FormGroup({
    id: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),

  })
  constructor(private router: Router, private supplierservice: SupplierService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['supplier'];
    console.log(this.id);
    this.getdata()

  }
  getdata() {
    this.supplierservice.getsupplier1(this.id).subscribe((res: any) => {
      this.newsupplier.setValue(res);
      console.log(res);

    })
  }
  editsupplier() {
    this.newsupplier.get("id")!.setValue(this.id);

    this.supplierservice.editsupplier(this.newsupplier.value).subscribe((res: any) => {
      this.newsupplier.setValue(res);
      this.router.navigate(["/supplier/displaysupplier"]);
      console.log(res);
    },(err:any)=>{
      this.router.navigate(["/supplier/displaysupplier"]);

    })
  }

}
