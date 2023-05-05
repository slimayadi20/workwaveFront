import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { DisplayusersComponent } from './displayusers/displayusers.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HolidayComponent } from './holiday/holiday.component';
import { PersonalinformationComponent } from './personalinformation/personalinformation.component';
import { SettingComponent } from './setting/setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { NotificationComponent } from './Roles/Role.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    DisplayusersComponent,
    UserDetailsComponent,
    HolidayComponent,
    PersonalinformationComponent,
    SettingComponent,
    NotificationComponent,
    CreateRoleComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule, 
    Ng2SearchPipeModule,
    FormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    NgMultiSelectDropDownModule.forRoot(),
    

  ]
})
export class UsersModule { }
