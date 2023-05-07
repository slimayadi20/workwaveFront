import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { LoginguardGuard } from './Shared/loginguard.guard';
import { MainComponent } from './main/main.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { RegistersuccessComponent } from './registersuccess/registersuccess.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [LoginguardGuard],
    children: [
      { path: '', component: DashboardComponentComponent },
      { path: 'courses', canActivate: [LoginguardGuard], loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
      { path: 'projects', canActivate: [LoginguardGuard], loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
      { path: 'products', canActivate: [LoginguardGuard], loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
      { path: 'payements', canActivate: [LoginguardGuard], loadChildren: () => import('./payements/payements.module').then(m => m.PayementsModule) },
      { path: 'chat', canActivate: [LoginguardGuard], loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
      { path: 'users', canActivate: [LoginguardGuard], loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
      { path: 'Supplier', canActivate: [LoginguardGuard], loadChildren: () => import('./Supplier/create-supplier/route1/Supplier.module').then(m => m.SupplierModule) },
      { path: 'Order', canActivate: [LoginguardGuard], loadChildren: () => import('./Orders/create-order/Route/orders-module').then(m => m.ordersModule) },

    ]
  },
  { path: 'auth', component: AuthComponent },
  { path: 'registersuccess', component: RegistersuccessComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset', component: ResetComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
