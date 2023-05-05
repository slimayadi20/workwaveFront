import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgProgressComponent } from 'ngx-progressbar';
import { AuthServiceService } from '../Shared/auth-service.service';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent implements AfterViewInit, OnInit {
  roles: any = [];
  constructor(private auth :AuthServiceService) { }
  ngOnInit(): void {
    this.roles=this.auth.getroles
    
  }


  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;

  ngAfterViewInit() {
    this.progressBar.start();
    setTimeout(() => {
      this.progressBar.complete();
    }, 1000); // stop progress after 5 seconds

  }

}
