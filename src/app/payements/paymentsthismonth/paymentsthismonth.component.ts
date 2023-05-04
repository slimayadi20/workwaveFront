import { Component, OnInit } from '@angular/core';
import { BankAccountService } from 'src/app/Shared/bank-account.service';
import { TransactionsService } from 'src/app/Shared/transactions.service';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { PaymentsService } from 'src/app/Shared/payments.service';
import { forkJoin, map } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-paymentsthismonth',
  templateUrl: './paymentsthismonth.component.html',
  styleUrls: ['./paymentsthismonth.component.css']
})
export class PaymentsthismonthComponent {



  banksaccount: any;
  data: any;  
  username ='';
  transactions: any[] = [];
  invoices : any[] = [];
  role:String ='';
  payments: any[]=[];
  usersUnpaid: any[]=[];
  usersPaid: any[]=[];
constructor(private PS:PaymentsService,private BAS:BankAccountService, private TS:TransactionsService, private auth : AuthServiceService,private encrypt: EncryptionService){}
  ngOnInit() {
    this.getUser();
    this.getBankAccountOfFinancial();
 this.getAllNoPayments();

  }
 
  getUser() {
    this.data = this.encrypt.decrypt(localStorage.getItem('data')!);
    console.log(this.data);
    this.username = this.data.userName;
    this.role= this.data.role;
    console.log(this.username);
  }
  getBankAccountOfFinancial() {
    this.BAS.getbyUser(this.username).subscribe((f: any) => {
      console.log(f);
      this.banksaccount = f
      console.log("Got Financial Account");
      
    //  this.getUsersIPaid(this.banksaccount.id);
    //  this.payments = e.payments;
    this.getPaymentsFromThisMonth(this.banksaccount.id);
    });
  } 
//getUsersIPaid(id:any){
//  this.auth.getbyBankAccount(id).subscribe((u:any) =>{
//    console.log(u);
//    console.log("Got Users i Paid");
//    
//  })
//}
  getAllNoPayments(){
    this.auth.getbyNoPayments().subscribe((p:any) => {
      console.log(p);
      console.log("Got all users with No Payments");
      
      this.usersUnpaid = p ;
    })
  }
  getPaymentsFromThisMonth(id:any){
    this.PS.getPaymentsThisMonth(id).subscribe((t:any) => {

      console.log("Got All Payments from this month");
      
      this.usersPaid = t;
    })
  }
  Pay(userName:any,receiverBankAccountId:any){
    this.PS.Pay(this.banksaccount.id,receiverBankAccountId,userName).subscribe((res: any) => {
      console.log("Payed Success");
      window.location.reload();
    }
    )

  }
  AutoPay(){
    
  }

}
