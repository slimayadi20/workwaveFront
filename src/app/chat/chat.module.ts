import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { DisplayChatComponent } from './display-chat/display-chat.component';
import { DisplayCalendarComponent } from './display-calendar/display-calendar.component';


@NgModule({
  declarations: [
    DisplayChatComponent,
    DisplayCalendarComponent,

  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
