import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators,ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarService } from '../../Shared/calendar.service';
//import { EncryptionService } from '../Shared/encryption.service';
import Swal from 'sweetalert2';
import { NgProgressComponent } from 'ngx-progressbar';



@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit,AfterViewInit{
  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;
  ngAfterViewInit() {
    this.progressBar.start();
    setTimeout(() => {
      this.progressBar.complete();
    }, 1000); // stop progress after 5 seconds

  }

  EventAdd = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    start: new FormControl('',  [Validators.required]),
    finish: new FormControl('', [Validators.required,dateRangeValidator('start', 'finish')]),
  })
  constructor(private router: Router, private CalendarService:CalendarService ) { }
  ngOnInit(): void {
 
  
  }



  AddEvent() {
    


      this.CalendarService.addEvent(this.EventAdd.value).subscribe((res: any) => {

        Swal.fire({
          title: "Excellent ! ",
          text: 'Event Added succesfully !',
          icon: 'success',
          confirmButtonColor: '#854FFF',
          confirmButtonText: "Oui",
        }).then((result) => {
          if (result.isConfirmed) {
       
          this.router.navigate(["/chat/displaycalendar"]).then(e => {
            window.location.reload();
          }
          )
        }
          
        });
      }, (err) => {
        console.log('Error:', err);
        if (err.status == 400) {
          Swal.fire(
            'erreur!',
            'verify the dates !',
            'error'
          );
        }
      });
    }



    
}


export function dateRangeValidator(startControlName: string, finishControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const start = control.get(startControlName)?.value;
    const finish = control.get(finishControlName)?.value;

    if (start && finish) {
      const startDate = new Date(start);
      const finishDate = new Date(finish);
      
      if (finishDate < startDate) {
        return { dateRangeError: true };
      }
    }

    return null;
  };
}