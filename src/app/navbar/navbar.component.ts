import { Component, OnInit } from '@angular/core';
import { EncryptionService } from '../Shared/encryption.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Shared/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private encryptionService: EncryptionService, public service: AuthServiceService) { }
  data: any;
  user: any;
  displayerror: any
  ngOnInit(): void {
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
   // console.log(this.data);
    this.getuser();
  }
  getuser() {
    this.service.getuser(this.data["userName"]).subscribe((e: any) => {
      //console.log(e);
      delete e.password;
      delete e.token;
      delete e.holidays;
      delete e.projet;
      delete e.role;
      this.data = e;
    //  console.log(this.data["fileName"]);
      
      if (e["prenom"] == null || e["prenom"] == "undefined")
        this.displayerror = true;
      if (e["gender"] == null || e["gender"] == "undefined")
        this.displayerror = true;
      if (e["phoneNumber"] == null || e["phoneNumber"] == "undefined")
        this.displayerror = true;
    });
  }
 
  logout() {
    localStorage.removeItem('data');
    this.router.navigate(['/auth']).then(e => {
      window.location.reload();
    }
    )
  }
}
