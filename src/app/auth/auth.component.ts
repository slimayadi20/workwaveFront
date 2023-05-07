import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthServiceService } from '../Shared/auth-service.service';
import { EncryptionService } from '../Shared/encryption.service';
import { NgProgressComponent } from 'ngx-progressbar';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

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
  public nom: any;
  public prenom: any;
  public gender: any;
  public tfa: any = false;
  public islogin: any = false;
  data: any;
  constructor(private router: Router, private authService: AuthServiceService, private encryptionService: EncryptionService,
    private spinner: NgxSpinnerService) { }
  userLogin = new FormGroup({
    userName: new FormControl('slim318', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]/)]),
    password: new FormControl('slim', [Validators.required])

  })
  faceLogin = new FormGroup({
    userName: new FormControl('slim318', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]/)]),

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
    /*if (localStorage.getItem('role') != "ROLE_ADMIN") {
      this.router.navigate(['/error-page'])
    }*/

  }


  login() {
    this.authService.login(this.userLogin.value).subscribe(
      data => {
        if ((data as { [key: string]: any })['jwtToken'].length != 0) {
          this.id = (data as { [key: string]: any })["user"]['userName'];
          this.email1 = (data as { [key: string]: any })["user"]['email'];
          this.contact = (data as { [key: string]: any })["user"]['phoneNumber'] ?? "undefined";
          this.nom = (data as { [key: string]: any })["user"]['nom'] ?? "";
          this.prenom = (data as { [key: string]: any })["user"]['prenom'] ?? "undefined";
          this.gender = (data as { [key: string]: any })["user"]['gender'] ?? "undefined";

          // console.log ((data as { [key: string]: any })["user"]["role"][0]["roleName"]);
          localStorage.setItem('data', this.encryptionService.encrypt({ userName: this.id, email: this.email1, phoneNumber: this.contact, token: ((data as { [key: string]: any })['jwtToken']), role: (data as { [key: string]: any })["user"]["role"][0]["roleName"], nom: this.nom, prenom: this.prenom, gender: this.gender }));
          this.router.navigate(['/courses/displaycourse']);
          this.router.navigate(["/"]).then(e => {
            window.location.reload();
          }
          )
        }
      },
      err => {
        if (err.status == 403) {

          console.log(err.status);
          Swal.fire(
            'erreur!',
            'Veuillez activer votre compte',
            'error'
          );
        }
        else {
          console.log(err.status);
          Swal.fire(
            'erreur!',
            'Mot de passe ou username invalide!',
            'error'
          );
        }
      }
    );
  }

  FaceAuth() {
    // Display spinner
    this.spinner.show();

    // Hide spinner after 5 seconds
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);

    // Make API call for face authentication
    this.authService.faceAuth(this.faceLogin.value).subscribe(
      data => {
        if ((data as { [key: string]: any })['jwtToken'].length != 0) {
          this.id = (data as { [key: string]: any })["user"]['userName'];
          this.email1 = (data as { [key: string]: any })["user"]['email'];
          this.contact = (data as { [key: string]: any })["user"]['phoneNumber'] ?? "undefined";
          this.nom = (data as { [key: string]: any })["user"]['nom'] ?? "";
          this.prenom = (data as { [key: string]: any })["user"]['prenom'] ?? "undefined";
          this.gender = (data as { [key: string]: any })["user"]['gender'] ?? "undefined";

          // console.log ((data as { [key: string]: any })["user"]["role"][0]["roleName"]);
          localStorage.setItem('data', this.encryptionService.encrypt({ userName: this.id, email: this.email1, phoneNumber: this.contact, token: ((data as { [key: string]: any })['jwtToken']), role: (data as { [key: string]: any })["user"]["role"][0]["roleName"], nom: this.nom, prenom: this.prenom, gender: this.gender }));
          this.router.navigate(['/courses/displaycourse']);
          this.router.navigate(["/"]).then(e => {
            window.location.reload();
          }
          )
        }
      },
      err => {
        this.spinner.hide();

        // Handle authentication error
        if (err.status === 403) {
          Swal.fire('Erreur!', 'Veuillez activer 2FA', 'error');
        } else {
          Swal.fire('Erreur!', 'Identifiants incorrects!', 'error');
        }
      },
      () => {
        // Hide spinner when the authentication process is complete
        this.spinner.hide();
      }
    );
  }


}
