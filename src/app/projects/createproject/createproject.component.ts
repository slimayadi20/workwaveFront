import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/Shared/project.service';
@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent {
  constructor(private PAS:ProjectService){}
  taskProject = new FormGroup({
    etat: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    dateEmission: new FormControl('', [Validators.required]),
    dateExpiration: new FormControl('', [Validators.required]),
    projectname :new FormControl('', [Validators.required])
  });

  addProject(){
    console.log(this.taskProject.value);
    

    this.PAS.addProject(this.taskProject.value).subscribe(
      (data: any) => {
      },
      (error: any) => { console.log(error) }
    );
    window.location.reload();
  }


















}