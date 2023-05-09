import { Component, OnInit } from '@angular/core';
import { InvoicesService } from 'src/app/Shared/invoices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { BankAccountService } from 'src/app/Shared/bank-account.service';

@Component({
  selector: 'app-oneinvoice',
  templateUrl: './oneinvoice.component.html',
  styleUrls: ['./oneinvoice.component.css']
})
export class OneinvoiceComponent implements OnInit{
  id: any;
  invoice: any;
  banksaccount: any;
  data: any;  
  username ='';
constructor(private INV:InvoicesService, private route: ActivatedRoute,private BAS:BankAccountService,private encrypt: EncryptionService){

}
  ngOnInit(): void {
    this.getUser();
    this.getBankAccount();
  
    this.id = this.route.snapshot.params['id'];
    this.getInvoice(this.id);
  }
  getInvoice(id:any) {
this.INV.getById(id).subscribe((e:any)=>{
  console.log(e);
  this.invoice=e;

})

}



getUser() {
  this.data = this.encrypt.decrypt(localStorage.getItem('data')!);
  console.log(this.data);
  this.username = this.data.userName;
 
}
getBankAccount() {
  this.BAS.getbyUser(this.username).subscribe((e: any) => {
    console.log(e);
    this.banksaccount = e

  });
}

printPage(){
  window.print();

}

PayInvoice(id:any){
  console.log("hhhhhhhhh")
  console.log(id)
  this.INV.PayInvoice(id,this.banksaccount.id).subscribe((e:any)=>{
    console.log("hhhhhhhhhhhhhhhhh doneeee")
    window.location.reload();
  })
}
}