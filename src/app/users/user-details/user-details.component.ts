import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  id: any="slim961";
  
  constructor(private service: AuthServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.id = this.route.snapshot.queryParams['userName'];
     console.log(this.id);
     
    this.getuser(this.id);
  }
  getuser(id: any) {
    this.service.getuser(id).subscribe((e: any) => {
      console.log(e);
      delete e.password;
      delete e.token;
      delete e.holidays;
      delete e.projet;
      delete e.role;
      this.user = e;
      console.log(this.user);


    });
  }


}
