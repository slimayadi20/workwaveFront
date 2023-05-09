import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';
import { BudgetService } from 'src/app/Shared/budget.service';
import { ProjectService } from 'src/app/Shared/project.service';
import { ScrumboardService } from 'src/app/Shared/scrumboard.service';

@Component({
  selector: 'app-budget-modal',
  templateUrl: './budget-modal.component.html',
  styleUrls: ['./budget-modal.component.css']
})
export class BudgetModalComponent implements OnInit {

  constructor(private BS: BudgetService, private usr: AuthServiceService, private projectService: ProjectService, private router: Router, private SB: ScrumboardService) { }
  budgetAmountt: any;
  financialManager: any;
  financialmanager: any;
  BudgetForm: FormGroup = new FormGroup({
    BudgetAmount: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    financialManager: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
  })
  @Input() id: any;
  @Input() name: any;
  ngOnInit(): void {
    this.getFinancialManagers();
  }
  getFinancialManagers() {
    this.usr.getUserByRoleFinancial().subscribe((e: any) => {
      this.financialmanager = (e);
      console.log(this.financialmanager);

    })

  }
  RequestBudget(p_id: any) {
    console.log(p_id);

    this.budgetAmountt = this.BudgetForm.controls["BudgetAmount"].value;
    this.financialManager = this.BudgetForm.controls["financialManager"].value;

    this.BS.requestBudget(p_id, this.budgetAmountt, this.financialManager).subscribe(
      (data: any) => {
        console.log(data);

        window.location.reload();

      },
      (error: any) => {
        window.location.reload();
      }

    );
  }

}
