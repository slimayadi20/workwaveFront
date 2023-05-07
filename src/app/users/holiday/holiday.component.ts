import { Component, OnInit } from '@angular/core';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { HolidayService } from 'src/app/Shared/holiday.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {
  constructor(public service: HolidayService, private encrypt: EncryptionService) { }
  data: any;
  admin : boolean = false ; 
  ngOnInit(): void {
    this.data = this.encrypt.decrypt(localStorage.getItem('data')!);

    if (this.data.role == "Admin") {
      this.displayHodiday();
      this.admin=true ; 
    }
    else{
      this.displayHodidayByUser();
      this.admin=false
    }
  }
  displayHodiday() {
    this.service.getAll().subscribe((res: any) => {
      this.data = res;
      console.log(this.data);
    })
  }
  displayHodidayByUser() {
    this.service.getHolidaysByUser(this.data["userName"]).subscribe((res: any) => {
      this.data = res;
      console.log(this.data);
    })
  }

}
