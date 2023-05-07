import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayCoursesComponent } from './display-courses/display-courses.component';
import { EnrollementComponent } from './enrollement/enrollement.component';
import { StudentEnrollementDetailComponent } from './student-enrollement-detail/student-enrollement-detail.component';
import { StudentCoursesDetailComponent } from './student-courses-detail/student-courses-detail.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { CreateCoursesComponent } from './create-courses/create-courses.component';
import { DeleteCoursesComponent } from './delete-courses/delete-courses.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';
import { DisplayCategComponent } from './display-categ/display-categ.component';
import { EditCategComponent } from './edit-categ/edit-categ.component';
import { AddCategComponent } from './add-categ/add-categ.component';
import { QuizComponent } from './quiz/quiz.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { CreateCoursComponent } from './create-cours/create-cours.component';
import { DisplayCoursComponent } from './display-cours/display-cours.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { DisplayQuizComponent } from './display-quiz/display-quiz.component';

const routes: Routes = [
  { path: 'displaycourse', component: DisplayCoursesComponent },
  { path: 'displaycourseAdmin', component: AdminCoursesComponent },
  { path: 'createcourse', component: CreateCoursesComponent },
  { path: 'editcourse', component: EditCoursesComponent },
  { path: 'displaycateg', component: DisplayCategComponent },
  { path: 'createcateg', component: AddCategComponent },
  { path: 'editcateg', component: EditCategComponent },
  { path: 'coursedetail', component: CoursedetailsComponent },
  { path: 'deletecourse', component: DeleteCoursesComponent },
  { path: 'enrollement', component: EnrollementComponent },
  { path: 'enrollementStudent', component: StudentEnrollementDetailComponent },
  { path: 'enrollementStudentCourses', component: StudentCoursesDetailComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'CreateCours', component: CreateCoursComponent },
  { path: 'displayCours', component: DisplayCoursComponent },
  { path: 'thankyou', component: ThankyouComponent },
  { path: 'createQuiz', component: CreateQuizComponent },
  { path: 'displayQuiz', component: DisplayQuizComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
