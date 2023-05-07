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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayCategComponent } from './display-categ/display-categ.component';
import { EditCategComponent } from './edit-categ/edit-categ.component';
import { AddCategComponent } from './add-categ/add-categ.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { QuizComponent } from './quiz/quiz.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { CreateCoursComponent } from './create-cours/create-cours.component';
import { DisplayCoursComponent } from './display-cours/display-cours.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { DisplayQuizComponent } from './display-quiz/display-quiz.component';


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
    DisplayCategComponent,
    EditCategComponent,
    AddCategComponent,
    QuizComponent,
    AdminCoursesComponent,
    CreateCoursComponent,
    DisplayCoursComponent,
    ThankyouComponent,
    CreateQuizComponent,
    DisplayQuizComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    NgProgressModule,
    RouterModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class CoursesModule { }
