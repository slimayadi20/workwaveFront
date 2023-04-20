import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserModule } from '@angular/platform-browser';

import { ChatRoutingModule } from './chat-routing.module';
import { DisplayChatComponent } from './display-chat/display-chat.component';
import { DisplayCalendarComponent } from './display-calendar/display-calendar.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    ReactiveFormsModule
    
  ]
 
})
export class ChatModule { }
