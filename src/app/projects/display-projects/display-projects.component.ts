import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { ProjectService } from 'src/app/Shared/project.service';
@Component({
  selector: 'app-display-projects',
  templateUrl: './display-projects.component.html',
  styleUrls: ['./display-projects.component.css']
})
export class DisplayProjectsComponent implements OnInit {
  projects: any;
  data: any
  constructor(private projectService: ProjectService, private router: Router, private encryptionService: EncryptionService) { }

  ngOnInit() {
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);

    this.getAll();

  }

  getAll() {
    this.projectService.getAll().subscribe({
      next: (data) => {
        console.log(data);

        this.projects = data;
        console.log(this.projects)
        for (let i = 0; i < this.projects.length; i++) {
          let taskCount = 0;
          let userCount = 0;
          for (let j = 0; j < this.projects[i].user.length; j++) {
            if (Array.isArray(this.projects[i].user[j].tasks)) {
              taskCount += this.projects[i].user[j].tasks.length;
              userCount += this.projects[i].user.length;
            }
          }
          this.projects[i].taskCount = taskCount;
          this.projects[i].userCount = userCount;
          console.log(this.projects[i].taskCount)
          console.log(this.projects[i].userCount)
        }

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
        window.location.reload();

      },
      (error: any) => {
        window.location.reload();
      }

    );
  }
  Update(id: any) {
    this.router.navigate(
      ['/projects/editproject/'],
      { queryParams: { id: id } }
    );
  }


}