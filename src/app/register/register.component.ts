import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Shared/auth-service.service';
import { EncryptionService } from '../Shared/encryption.service';
import Swal from 'sweetalert2';
import { NgProgressComponent } from 'ngx-progressbar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;
  isLoading = false;


  usernames: string[] = [];
  userRegister: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    userName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+\.[a-zA-Z0-9]+@esprit\.tn$/)]),
    password: new FormControl('', [Validators.required]),
  })
  constructor(private router: Router, private authService: AuthServiceService, private encryptionService: EncryptionService) { }
  ngAfterViewInit() {
    this.progressBar.start();
    setTimeout(() => {
      this.progressBar.complete();
    }, 1000); // stop progress after 5 seconds

  }
  ngOnInit(): void {
    // this.progressBar.start();
    // setTimeout(() => {
    //   this.progressBar.complete();
    // }, 1000); // stop progress after 5 seconds

    this.loaddata();
    // Watch for changes to the first and last name form controls
    this.userRegister.get('nom')!.valueChanges.subscribe(() => {
      this.generateUsername();
    });


  }
  generateUsername() {
    const firstName = this.userRegister.get('nom')!.value;
    const randomNumber = Math.floor(Math.random() * 1000);
    let username = firstName.toLowerCase() + randomNumber;
    const usernameControl = this.userRegister.get('userName');

    if (usernameControl) {
      let numTries = 0;
      while (this.usernames.includes(username) && numTries < 10) {
        // Username already exists, generate a new one
        const randomNumber = Math.floor(Math.random() * 1000);
        username = firstName.toLowerCase() + randomNumber;
        numTries++;
      }
      if (this.usernames.includes(username)) {
        // Unable to generate a unique username after 10 tries
        console.log('Unable to generate a unique username.');
      } else {
        // Username is available
        console.log('Username is available');
        usernameControl.setValue(username);
      }
    }
  }


  Register() {
    const usernameControl = this.userRegister.get('userName');
    const username = usernameControl?.value;

    if (this.usernames.includes(username)) {
      console.log('Username already taken');
    } else {
      // Username is available, make the registration request
      console.log('Username is available');
      this.isLoading = true;
      this.progressBar.start();
      setTimeout(() => {
        this.progressBar.complete();
      }, 1000); // stop progress after 5 seconds
  
      this.authService.register(this.userRegister.value).subscribe((res: any) => {
        // this.isLoading = false;

        Swal.fire({
          title: "Excellent ! ",
          text: 'Veuillez verifier votre mail pour activer votre compte !',
          icon: 'success',
          confirmButtonColor: '#854FFF',
          confirmButtonText: "Oui",
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/registersuccess']);
          }
        });
      }, (err) => {
        console.log('Error:', err);
        if (err.status == 400) {
          Swal.fire(
            'erreur!',
            'Email existant!',
            'error'
          );
        }
      });
    }
  }

  loaddata() {
    this.authService.getusernames().subscribe((res: any) => {
      this.usernames = res;
    })
      , (err: any) => {
        console.log('Error:', err);
        if (err.status == 400) {
          console.log("email existant");
        }
      };
  }
}
