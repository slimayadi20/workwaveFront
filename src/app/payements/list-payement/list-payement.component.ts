import { Component, OnInit } from '@angular/core';
import { BankAccountService } from 'src/app/Shared/bank-account.service';
@Component({
  selector: 'app-list-payement',
  templateUrl: './list-payement.component.html',
  styleUrls: ['./list-payement.component.css']
})

export class ListPayementComponent implements OnInit  {
  banksaccounts: any;
constructor(private bank:BankAccountService){}
  ngOnInit() {
    
this.getall();
  }
  
  getall(){
    this.bank.getAll().subscribe({
      next:(data)=>{
        this.banksaccounts=data;
        console.log(data);
      },
      error: (e) => console.error(e)

    })
}
}
