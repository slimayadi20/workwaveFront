import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../Shared/auth-service.service';
import { NgProgressComponent } from 'ngx-progressbar';
import { EncryptionService } from '../Shared/encryption.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit, AfterViewInit {

  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;

  ngAfterViewInit() {
    this.progressBar.start();
    setTimeout(() => {
      this.progressBar.complete();
    }, 1000); // stop progress after 5 seconds

  }
  token!: string;
  user: any;
  userRegister = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+\.[a-zA-Z0-9]+@esprit\.tn$/)]),

  })
  constructor(
    private userService: AuthServiceService,
    private router: Router, private encryptionService: EncryptionService
  ) { }

  ngOnInit() {
  }
  reset() {
    console.log('Before subscribe method');
    const data = { email: this.userRegister.value };
    console.log('Data:', data);
    const encryptedData = this.encryptionService.encrypt(data);
    console.log('Encrypted data:', encryptedData);
    localStorage.setItem('data', encryptedData);
    console.log('Data stored in local storage:', localStorage.getItem('data'));
  
    this.userService.forget(this.userRegister.value).subscribe((res: any) => {
      //  this.router.navigate(["/registersuccess"]);
    }, (err: any) => {
      console.log('Error:', err);
      if (err.status == 400) {
        console.log("email existant");
      }
    });
    this.router.navigate(["/reset-password"]);
  }
  
}
