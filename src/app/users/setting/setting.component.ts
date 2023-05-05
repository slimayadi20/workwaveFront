import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';
import { EncryptionService } from 'src/app/Shared/encryption.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  data: any;
  user: any;
  isTwoFactorAuthEnabled: any = false;
  userForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    tfa: new FormControl(''),
  })
  constructor(public service: AuthServiceService, private encrypt: EncryptionService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.data = this.encrypt.decrypt(localStorage.getItem('data')!);
    this.getuser(this.data['userName']);


  }
  updateUser() {
    this.userForm.get("userName")!.setValue(this.data['userName']);
    console.log(this.userForm.value);

    this.service.tfa(this.userForm.value).subscribe((data: any) => { })
  }
  getuser(id: any) {
    this.spinner.show();

    // Hide spinner after 5 seconds
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    this.service.getuser(id).subscribe((e: any) => {
      console.log(e);
      this.user=e ; 
      this.userForm.get("userName")!.setValue(e.userName);
      this.userForm.get("tfa")!.setValue(e.tfa);
      console.log(this.userForm.value);
    },
    err => {
      this.spinner.hide();


    },);
  }
  enable() {
    this.userForm.get("tfa")!.setValue(true);
    this.isTwoFactorAuthEnabled = true;
    this.updateUser();
  }
  disable() {
    this.userForm.get("tfa")!.setValue(false);
    this.isTwoFactorAuthEnabled = false;
    this.updateUser();
  }
}

