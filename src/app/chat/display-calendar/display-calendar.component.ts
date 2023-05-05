import { Component,OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg, EventDropArg ,EventMountArg } from '@fullcalendar/core'; // import EventDropArg
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction'; // import interactionPlugin
import { CalendarService } from '../../Shared/calendar.service';
import { Tooltip } from 'bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-display-calendar',
  templateUrl: './display-calendar.component.html',
  styleUrls: ['./display-calendar.component.css']
})
export class DisplayCalendarComponent implements OnInit  {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin,interactionPlugin,timeGridPlugin],
    events: [],
    editable: true, // enable drag and drop
    eventDrop: this.onEventDrop.bind(this), // event drag and drop listener
    headerToolbar: {
      start: 'prev,next today',
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay'

},
eventDidMount: this.eventDidMount.bind(this),
eventClick: this.onEventClick.bind(this),
  };
  
   constructor(private calendarService: CalendarService) {}

   ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.calendarService.getAllEvents().subscribe((events) => {
      this.calendarOptions.events = events.map((event) => ({
        id: event.id, // add the event ID to update the existing event
        title: event.title,
        start: event.start.toString(),
        end: event.finish.toString(),
        description:event.description,
       
        
      
        // additional properties like description, color, etc.
        
      }));
    });
  }
  

  

  onEventDrop(eventDropInfo : EventDropArg) {
    const updatedEvent = eventDropInfo.event;
    const id = eventDropInfo.event.id;
    const start = eventDropInfo.event.start;
    const finish = eventDropInfo.event.end;
    const title = eventDropInfo.event.title;
    const description = eventDropInfo.event.extendedProps['description'];
    

    // Update the event in the database
    this.calendarService.updateEvent({ id, start, finish , title, description}).subscribe(() => {
      console.log('Event updated successfully');
    });
  }
  eventDidMount(eventMountInfo: EventMountArg) {
    const tooltip = new Tooltip(eventMountInfo.el, {
      title: eventMountInfo.event.extendedProps['description'],
      placement: 'top',
      trigger: 'hover',
      container: 'body'
    });
  }

  onEventClick(eventClickInfo: EventClickArg) {
    const event = eventClickInfo.event;
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${event.title}" event.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const id = parseInt(event.id);
        this.calendarService.removeEvent(id).subscribe(() => {
          event.remove();
          Swal.fire({
            title: 'Deleted!',
            text: `"${event.title}" event has been deleted.`,
            icon: 'success',
            confirmButtonColor: '#854FFF'
          });
        });
      }
    });
  }
  
}
