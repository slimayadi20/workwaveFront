import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/Shared/transactions.service';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { BankAccountService } from 'src/app/Shared/bank-account.service';
@Component({
  selector: 'app-listtransactions',
  templateUrl: './listtransactions.component.html',
  styleUrls: ['./listtransactions.component.css']
})
export class ListtransactionsComponent implements OnInit {
  data: any;
  constructor(private TS:TransactionsService,private encrypt: EncryptionService ,private BAS:BankAccountService){

  }
  username :any;
  banksaccount: any;
  transactions:any[]=[];

  ngOnInit(): void {
    this.getUser();

   this.getBankAccount();
   
  }
  getUser(){
    this.data = this.encrypt.decrypt(localStorage.getItem('data')!);
    console.log(this.data);
    this.username = this.data.userName;
    console.log(this.username);
    
  }
  getBankAccount(){
    this.BAS.getbyUser(this.username).subscribe((e: any) => {
      console.log(e);
      this.banksaccount = e
      this.getTransactions(this.banksaccount.id);
    });
  }
  getTransactions(id:any) {
    this.TS.getbyBankAccount(id).subscribe((e: any) => {
        this.transactions = e;
        console.log(this.transactions);
    });
  }

}