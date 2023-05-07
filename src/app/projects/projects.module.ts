import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { DisplayProjectsComponent } from './display-projects/display-projects.component';
import { KanbanComponent } from './kanban/kanban.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { EditprojectComponent } from './editproject/editproject.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TaskService } from '../Shared/task.service';


@NgModule({
  declarations: [
    DisplayProjectsComponent,
    KanbanComponent,
    CreateprojectComponent,
    EditprojectComponent,
    AddtaskComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule

  ],
 providers: [TaskService],

})
export class ProjectsModule { }