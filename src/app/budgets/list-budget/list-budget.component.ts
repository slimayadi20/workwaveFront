import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/Shared/budget.service';
import { BankAccountService } from 'src/app/Shared/bank-account.service';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { ProjectService } from 'src/app/Shared/project.service';
@Component({
  selector: 'app-list-budget',
  templateUrl: './list-budget.component.html',
  styleUrls: ['./list-budget.component.css']
})
export class ListBudgetComponent implements OnInit{
  budgets: any;
  banksaccount: any;
  data: any;  
  username ='';
  project_name:any;

  constructor(private BS:BudgetService,private PS:ProjectService,private BAS:BankAccountService,private encrypt: EncryptionService) { }
  ngOnInit(): void {
    this.getUser();
    this.getBankAccount();
  
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
    });  }
  Status = [
      "InProgress","Declined","Approved"
  ]
  getBudgetsByStatus(status: any) {
    this.BS.getAllBudgetsByBankAndStatus(this.banksaccount.id, status)
    .subscribe((e: any) => {
        this.budgets = e;
        console.log(this.budgets);
    }, error => { 
      console.error(error);
    });
  }
  AcceptBudget(id:any){
    this.BS.AcceptBudget(id).subscribe((e:any) =>{
      console.log("hhhhhhhhhhhhhhhhhhh");
      window.location.reload();
    });
  }
}