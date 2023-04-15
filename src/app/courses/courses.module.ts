import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { DisplayCoursesComponent } from './display-courses/display-courses.component';
import { CreateCoursesComponent } from './create-courses/create-courses.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';
import { DeleteCoursesComponent } from './delete-courses/delete-courses.component';
import { EnrollementComponent } from './enrollement/enrollement.component';
import { StudentEnrollementDetailComponent } from './student-enrollement-detail/student-enrollement-detail.component';
import { StudentCoursesDetailComponent } from './student-courses-detail/student-courses-detail.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { NgProgressModule } from 'ngx-progressbar';
import {RouterModule} from '@angular/router';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { FooterComponent } from '../footer/footer.component';


@NgModule({
  declarations: [
    DisplayCoursesComponent,
    CreateCoursesComponent,
    EditCoursesComponent,
    DeleteCoursesComponent,
    EnrollementComponent,
    StudentEnrollementDetailComponent,
    StudentCoursesDetailComponent,
    CoursedetailsComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    NgProgressModule,
    RouterModule,
  ]
})
export class CoursesModule { }
