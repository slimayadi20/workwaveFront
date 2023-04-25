import { Component, OnInit } from '@angular/core';
import { BankAccountService } from 'src/app/Shared/bank-account.service';
import { TransactionsService } from 'src/app/Shared/transactions.service';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewmybankaccount',
  templateUrl: './viewmybankaccount.component.html',
  styleUrls: ['./viewmybankaccount.component.css']
})
export class ViewmybankaccountComponent implements OnInit{
  public payPalConfig?: IPayPalConfig;

  banksaccount: any;
  data: any;  
  username ='';
  transactions: any[] = [];
  bankForm: FormGroup = new FormGroup({
    accountName: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    status: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    accountNumber: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    bankName: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    limitAmount: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
  })
  paypalForm: FormGroup = new FormGroup({
    solde: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
  })
  showSuccess: boolean = false;
  amount = '';
constructor(private router :Router ,private BAS:BankAccountService, private TS:TransactionsService, private auth : AuthServiceService,private encrypt: EncryptionService){}

  ngOnInit(): void {
    this.initConfig();

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
      this.transactions =e.transactions;
      console.log(this.transactions);
      this.bankForm.setValue({
        accountName: this.banksaccount.accountName,
        status : this.banksaccount.status,
        accountNumber: this.banksaccount.accountNumber,
        bankName : this.banksaccount.bankName,
        limitAmount: this.banksaccount.limitAmount
      })
    });
  }
  updateBankAccount(){
    const updatedBankAccount: any = {
      id: this.banksaccount.id,
      balance:this.banksaccount.balance,
      status : this.bankForm.controls['status'].value,
      accountName: this.bankForm.controls['accountName'].value,
      accountNumber: this.bankForm.controls['accountNumber'].value,
      bankName: this.bankForm.controls['bankName'].value,
      limitAmount: this.bankForm.controls['limitAmount'].value,
    };
    this.BAS.updateBankAccount(updatedBankAccount).subscribe((e: any) => {
      window.location.reload();
    });
  }
  deleteBankAccount(){
    if(window.confirm('Are you sure you want to delete the bank account')){
    this.BAS.deleteBankAccount(this.banksaccount.id).subscribe((e: any) => {
      console.log(e);
    });
  
    
  }
  this.router.navigate(['/users/personalinformation']);
  }
  updateAmount(){
    const solde = this.paypalForm.get('solde') as FormControl;
    if (solde?.value != null) {
      this.amount = solde.value.toString();
    }
    console.log(this.amount);
  }
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.amount,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.amount
              }
            }
          },
          items: [
            {
              name: 'Amount To desposit',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: this.amount,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      this.BAS.addBalance(this.banksaccount.id,Number(this.amount)).subscribe((h: any) => {
        console.log(h);
        window.location.reload();
      });
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details: any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}

