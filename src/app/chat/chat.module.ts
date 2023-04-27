import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserModule } from '@angular/platform-browser';

import { ChatRoutingModule } from './chat-routing.module';
import { DisplayChatComponent } from './display-chat/display-chat.component';
import { DisplayCalendarComponent } from './display-calendar/display-calendar.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { JitsiComponentComponent } from './jitsi-component/jitsi-component.component';



@NgModule({
  declarations: [
    DisplayChatComponent,
    DisplayCalendarComponent,
    CreateEventComponent,
    
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule,
   Ng2SearchPipeModule 

    
  ]
 
})
export class ChatModule { }
