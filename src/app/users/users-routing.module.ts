import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayusersComponent } from './displayusers/displayusers.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HolidayComponent } from './holiday/holiday.component';

const routes: Routes = [
  { path: 'displayusers', component: DisplayusersComponent },
  { path: 'detailusers', component: UserDetailsComponent },
  { path: 'displayholidays', component: HolidayComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
