import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { DisplayProjectsComponent } from './display-projects/display-projects.component';
import { KanbanComponent } from './kanban/kanban.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { EditprojectComponent } from './editproject/editproject.component';


@NgModule({
  declarations: [
    DisplayProjectsComponent,
    KanbanComponent,
    CreateprojectComponent,
    EditprojectComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
