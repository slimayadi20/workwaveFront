import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/Shared/project.service';
import { ScrumboardService } from 'src/app/Shared/scrumboard.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';
import { BudgetService } from 'src/app/Shared/budget.service';
@Component({
  selector: 'app-display-projects',
  templateUrl: './display-projects.component.html',
  styleUrls: ['./display-projects.component.css']
})
export class DisplayProjectsComponent implements OnInit {
  projects: any;
   taskCount = 0;
   budgetAmountt:any;
   financialManager:any;
   BudgetForm: FormGroup = new FormGroup({
    BudgetAmount: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    financialManager: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
  })
  financialmanager:any;
  b_id: any;
  constructor(private BS:BudgetService,private usr:AuthServiceService,private projectService: ProjectService, private router: Router,private SB:ScrumboardService) { }

  ngOnInit() {

    this.getAll();
    this.getFinancialManagers();

  }


  getAll() {
    this.projectService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        
        this.projects = data;
        console.log(this.projects)
        for (let i = 0; i < this.projects.length; i++) {
         console.log(this.projects.length);
         
          for (let j = 0; j < this.projects[i].user.length; j++) {
            console.log(this.projects[i].user.length);
            
           this.taskCount += this.projects[i].user[j].tasks.length;
           console.log(this.taskCount);

         }
     }
       // for (let i = 0; i < this.projects.length; i++) {
       //   let taskCount = 0;
       //   let userCount = 0;
       //   for (let j = 0; j < this.projects[i].user.length; j++) {
       //     if (Array.isArray(this.projects[i].user[j].tasks)) {
       //       taskCount += this.projects[i].user[j].tasks.length;
       //       console.log(taskCount);
       //       
       //       userCount += this.projects[i].user.length;
       //       console.log(taskCount);
       //       
       //     }
       //   }
       //   this.projects[i].taskCount = taskCount;
       //   this.projects[i].userCount = userCount;
       //   console.log(this.projects[i].taskCount)
       //   console.log(this.projects[i].userCount)
       // }

      }
    });
  }
 
  //getAll() {
  //    this.projectService.getAll().subscribe({
  //      next:(data)=>{
  //        this.projects=data;
  //        console.log(data);
  //        let tasksCount = this.projects.reduce((accumulator: any[], project: { user: any[]; project_name: any; }) => {
  //          let projectTasksCount = project.user.reduce((userTasksCount, user) => {
  //            if (Array.isArray(user.tasks)) {
  //              return userTasksCount + user.tasks.length;
  //            }
  //            return userTasksCount;
  //          }, 0);
  //          return accumulator.concat({ tasks_count: projectTasksCount });
  //        }, []);
  //        
  //        console.log(tasksCount);
  //      },
  //      error: (e) => console.error(e)
  //
  //    })
  //}
  redirect(id: any) {
    this.router.navigate(
      ['/projects/kanban/'],
      { queryParams: { project: id } }
    );
  }


  deleteproject(id: number) {
    this.projectService.deleteProject(id).subscribe(
      (data: any) => {
        console.log(data);
        this.getAll();
    //    window.location.reload();

      },
      (error: any) => {
    //    window.location.reload();
      }

    );
  }
  Update(id: any) {
    this.router.navigate(
      ['/projects/editproject/'],
      { queryParams: { id: id } }
    );
  }
  getFinancialManagers() {
    this.usr.getUserByRoleFinancial().subscribe((e: any) => {
      this.financialmanager = (e);
      console.log(this.financialmanager);
      
    })
 
}
  RequestBudget(p_id:any){
    console.log(p_id);
    
      this.budgetAmountt = this.BudgetForm.controls["BudgetAmount"].value;
      this.financialManager = this.BudgetForm.controls["financialManager"].value;
   
        this.BS.requestBudget(p_id,this.budgetAmountt,this.financialManager).subscribe(
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