import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/Shared/project.service';

@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.css']
})
export class EditprojectComponent implements OnInit {
  constructor(private PAS: ProjectService, private route: ActivatedRoute, private router: Router) { }

  taskProject = new FormGroup({
    etat: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    dateEmission: new FormControl('', [Validators.required]),
    dateExpiration: new FormControl('', [Validators.required]),
    projectname: new FormControl('', [Validators.required]),
    id: new FormControl('', [Validators.required])
  });

  id: any

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['userName'];
    this.getdata(this.id)
  }

  getdata(id: any) {
    this.PAS.getById(id).subscribe((e: any) => {
      this.taskProject.get("etat")!.setValue(e.etat);
      this.taskProject.get("description")!.setValue(e.description);
      this.taskProject.get("dateEmission")!.setValue(e.dateEmission);
      this.taskProject.get("dateExpiration")!.setValue(e.dateExpiration);
      this.taskProject.get("projectname")!.setValue(e.projectname);
      this.taskProject.get("id")!.setValue(e.id);
    })
  }
  updateProject() {
    this.PAS.updateProject(this.taskProject.value).subscribe((res: any) => {
      console.log(res);
      this.router.navigateByUrl("/projects/displayprojects");
    })
  }
}