import { Component, OnInit } from '@angular/core';
import { BankAccountService } from 'src/app/Shared/bank-account.service';
import { TransactionsService } from 'src/app/Shared/transactions.service';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-addbanaccount',
  templateUrl: './addbanaccount.component.html',
  styleUrls: ['./addbanaccount.component.css']
})

export class AddbanaccountComponent   implements OnInit{
  username ='';
  data: any;  
  banksaccount: any;
  user:any[]=[];
  constructor(private router :Router ,private BAS:BankAccountService, private TS:TransactionsService, private auth : AuthServiceService,private encrypt: EncryptionService){}
  bankForm: FormGroup = new FormGroup({
    accountName: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    status: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    accountNumber: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    bankName: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    limitAmount: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
  })
  ngOnInit(){
    this.getUser();
  }
  getUser(){
    this.data = this.encrypt.decrypt(localStorage.getItem('data')!);
    console.log(this.data);
    this.username = this.data.userName;
    console.log(this.username);
  }
addBankAccount(){
  const banksaccount: any = {
    user: {
      userName:this.username
    },
    balance: 0,
    status : this.bankForm.controls['status'].value,
    accountName: this.bankForm.controls['accountName'].value,
    accountNumber: this.bankForm.controls['accountNumber'].value,
    bankName: this.bankForm.controls['bankName'].value,
    limitAmount: this.bankForm.controls['limitAmount'].value,
  };
  console.log(banksaccount);
this.BAS.addBankAccount(banksaccount).subscribe((e: any) => {
  this.router.navigate(['/bank/mybank']);
});

this.router.navigate(['/bank/mybank']);

}
}
