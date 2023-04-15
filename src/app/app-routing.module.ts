import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { LoginguardGuard } from './Shared/loginguard.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset', component: ResetComponent },
  // { path: '**', component: ErrorComponent },
  { path: 'courses', canActivate: [LoginguardGuard], loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
  { path: 'projects', canActivate: [LoginguardGuard], loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'products', canActivate: [LoginguardGuard], loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'chat', canActivate: [LoginguardGuard], loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  { path: 'users', canActivate: [LoginguardGuard], loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
