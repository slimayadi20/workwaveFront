import { Component, OnInit } from '@angular/core';
import { BankAccountService } from 'src/app/Shared/bank-account.service';
import { TransactionsService } from 'src/app/Shared/transactions.service';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
import { InvoicesService } from 'src/app/Shared/invoices.service';
@Component({
  selector: 'app-myinvoices',
  templateUrl: './myinvoices.component.html',
  styleUrls: ['./myinvoices.component.css']
})

export class MyinvoicesComponent implements OnInit{
  banksaccount: any;
  data: any;  
  username ='';
  transactions: any[] = [];
  invoices : any[] = [];
  role:String ='';
  constructor(private INV: InvoicesService,private router :Router ,private BAS:BankAccountService, private TS:TransactionsService, private auth : AuthServiceService,private encrypt: EncryptionService){}
  
  ngOnInit(){
    this.getUser();
    this.getBankAccount();

  }
  getUser() {
    this.data = this.encrypt.decrypt(localStorage.getItem('data')!);
    console.log(this.data);
    this.username = this.data.userName;
    this.role= this.data.role;
    console.log(this.username);
  }
  getBankAccount() {
    this.BAS.getbyUser(this.username).subscribe((e: any) => {
      console.log(e);
      this.banksaccount = e
      this.invoices = e.invoices;
      console.log(this.invoices);
    });
  }




}
