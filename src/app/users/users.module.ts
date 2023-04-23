import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { DisplayusersComponent } from './displayusers/displayusers.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HolidayComponent } from './holiday/holiday.component';
import { PersonalinformationComponent } from './personalinformation/personalinformation.component';
import { NotificationComponent } from './notification/notification.component';
import { SettingComponent } from './setting/setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DisplayusersComponent,
    UserDetailsComponent,
    HolidayComponent,
    PersonalinformationComponent,
    NotificationComponent,
    SettingComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule, 
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class UsersModule { }
