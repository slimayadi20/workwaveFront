import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgProgressComponent } from 'ngx-progressbar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-display-courses',
  templateUrl: './display-courses.component.html',
  styleUrls: ['./display-courses.component.css']
})
export class DisplayCoursesComponent implements AfterViewInit {

  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;

  ngAfterViewInit() {
    this.progressBar.start();
    setTimeout(() => {
      this.progressBar.complete();
    }, 1000); // stop progress after 5 seconds

  }

}
