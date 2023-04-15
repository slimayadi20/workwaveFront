import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { DisplayusersComponent } from './displayusers/displayusers.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HolidayComponent } from './holiday/holiday.component';


@NgModule({
  declarations: [
    DisplayusersComponent,
    UserDetailsComponent,
    HolidayComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
