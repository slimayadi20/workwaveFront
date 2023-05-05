import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../Shared/auth-service.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgProgressComponent } from 'ngx-progressbar';
import { EncryptionService } from '../Shared/encryption.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {

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
    password: new FormControl('', [Validators.required]),
    repassword: new FormControl('', matchValidator('password')),
  })
  otp = new FormGroup({
    otp1: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    otp2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    otp3: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    otp4: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
  })
  otpverified: boolean = false;
  taa!: number;
  data: any;
  email: any;
  @ViewChild('field1') field1: ElementRef | undefined;
  @ViewChild('field2') field2: ElementRef | undefined;
  @ViewChild('field3') field3: ElementRef | undefined;
  @ViewChild('field4') field4: ElementRef | undefined;
  constructor(
    private route: ActivatedRoute,
    private userService: AuthServiceService,
    private router: Router,
    private encryptionService: EncryptionService,
  ) { }

  ngOnInit() {
    this.email = this.encryptionService.decrypt(localStorage.getItem('data')!)["email"];
    console.log(this.email);
  }
  reset() {
    if (this.userRegister.value.password == this.userRegister.value.repassword) {
      this.userService.reset({ "email": this.email["email"], "password": this.userRegister.value.password })
        .subscribe((res: any) => {
          this.router.navigate(["/auth"]);
          console.log(this.user);
        }, (error) => {
          console.error(error);
          // Show error message to the user here
        });
    }
    else {
      console.log("they are not the same ");

    }

  }
  otpfct() {
    this.taa = Number(this.otp.value.otp1! + this.otp.value.otp2! + this.otp.value.otp3! + this.otp.value.otp4!);
    console.log(this.taa);
    console.log(this.email["email"]);

    this.userService.otp({ "otp": this.taa, "email": this.email["email"] }).subscribe((res: any) => {
      console.log(res);

      this.otpverified = true;

    }, (err) => {
      console.log(err);
    })
  }
  redirect() {
    this.router.navigate(['/reset'])

  }
  onKeyUp(event: any, fieldIndex: any) {
    if (event.target.value && event.target.value.length > 0) {
      switch (fieldIndex) {
        case 1:
          this.field2!.nativeElement.focus();
          break;
        case 2:
          this.field3!.nativeElement.focus();
          break;
        case 3:
          this.field4!.nativeElement.focus();
          break;
        case 4:
          // Do something when the last field is filled
          break;
      }
    }
  }
}
export function matchValidator(
  matchTo: string,
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl):
    ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo]
      AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value ===
      (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };

}
