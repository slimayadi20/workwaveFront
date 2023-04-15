import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayChatComponent } from './display-chat/display-chat.component';
import { DisplayCalendarComponent } from './display-calendar/display-calendar.component';

const routes: Routes = [
  { path: 'displaychat', component: DisplayChatComponent },
  { path: 'displaycalendar', component: DisplayCalendarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
