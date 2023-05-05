import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthServiceService } from '../Shared/auth-service.service';
import { EncryptionService } from '../Shared/encryption.service';
import { NgProgressComponent } from 'ngx-progressbar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public userName: any;
  public email1: any;
  public contact: any;
  public id: any;
  data: any;
  constructor(private router: Router, private authService: AuthServiceService, private encryptionService: EncryptionService) { }
  userLogin = new FormGroup({
    userName: new FormControl('yasminebettaieb220', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]/)]),
    password: new FormControl('yasmine', [Validators.required])

  })
  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;

  ngAfterViewInit() {
    this.progressBar.start();
    setTimeout(() => {
      this.progressBar.complete();
    }, 1000); // stop progress after 5 seconds

  }
  ngOnInit() {
    // your authentication code here
  }
  login() {
    this.authService.login(this.userLogin.value).subscribe(
      data => {
        if ((data as { [key: string]: any })['jwtToken'].length != 0) {
          this.id = (data as { [key: string]: any })["user"]['userName'];
          this.email1 = (data as { [key: string]: any })["user"]['email'];
          this.contact = (data as { [key: string]: any })["user"]['phoneNumber'];
          console.log('aaaaaaaaaaaaaaa');

          // console.log ((data as { [key: string]: any })["user"]["role"][0]["roleName"]);
          localStorage.setItem('data', this.encryptionService.encrypt({ id: this.id, email: this.email1, contact: this.contact, token: ((data as { [key: string]: any })['jwtToken']), role: (data as { [key: string]: any })["user"]["role"][0]["roleName"] }));
          this.router.navigate(['/courses/displaycourse']);
          this.router.navigate(["/"]).then(e => {
            window.location.reload();
          }
          )
        }
      },
      error => {
        console.log(error.status);
        Swal.fire(
          'erreur!',
          'Mot de passe ou username invalide!',
          'error'
        );
      }
    );
  }

}
