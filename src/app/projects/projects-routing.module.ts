import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayProjectsComponent } from './display-projects/display-projects.component';
import { KanbanComponent } from './kanban/kanban.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { EditprojectComponent } from './editproject/editproject.component';

const routes: Routes = [
  { path: 'displayprojects', component: DisplayProjectsComponent },
  { path: 'kanban', component: KanbanComponent },
  { path: 'createproject', component: CreateprojectComponent },
  { path: 'editproject', component: EditprojectComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }