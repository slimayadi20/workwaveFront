import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayCoursesComponent } from './display-courses/display-courses.component';
import { EnrollementComponent } from './enrollement/enrollement.component';
import { StudentEnrollementDetailComponent } from './student-enrollement-detail/student-enrollement-detail.component';
import { StudentCoursesDetailComponent } from './student-courses-detail/student-courses-detail.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { CreateCoursesComponent } from './create-courses/create-courses.component';
import { DeleteCoursesComponent } from './delete-courses/delete-courses.component';

const routes: Routes = [
  { path: 'displaycourse', component: DisplayCoursesComponent },
  { path: 'createcourse', component: CreateCoursesComponent },
  { path: 'deletecourse', component: DeleteCoursesComponent },
  { path: 'enrollement', component: EnrollementComponent },
  { path: 'enrollementStudent', component: StudentEnrollementDetailComponent },
  { path: 'enrollementStudentCourses', component: StudentCoursesDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
