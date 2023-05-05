import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayusersComponent } from './displayusers/displayusers.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HolidayComponent } from './holiday/holiday.component';
import { PersonalinformationComponent } from './personalinformation/personalinformation.component';
import { NotificationComponent } from './Roles/Role.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  { path: 'displayusers', component: DisplayusersComponent },
  { path: 'detailusers', component: UserDetailsComponent },
  { path: 'displayholidays', component: HolidayComponent },
  { path: 'personalinformation', component: PersonalinformationComponent },
  { path: 'roles', component: NotificationComponent },
  { path: 'setting', component: SettingComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
