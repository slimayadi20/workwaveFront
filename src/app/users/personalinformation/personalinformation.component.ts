import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';
import { EncryptionService } from 'src/app/Shared/encryption.service';

@Component({
  selector: 'app-personalinformation',
  templateUrl: './personalinformation.component.html',
  styleUrls: ['./personalinformation.component.css']
})
export class PersonalinformationComponent implements OnInit {
  constructor(private encrypt: EncryptionService, public service: AuthServiceService, private spinner: NgxSpinnerService) { }

  data: any;
  countryCode: any;
  userFile: any;
  public imagePath: any;
  imgURL: any;
  message: any;
  public errorMessage: any;
  public styl: any;
  userForm: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    prenom: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    userName: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.pattern(/^[a-zA-Z0-9]+\.[a-zA-Z0-9]+@esprit\.tn$/)]),
    gender: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    phoneNumber: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
  })
  passwordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    repassword: new FormControl('', matchValidator('password')),
  })
  user: any;
  ngOnInit(): void {
    this.data = this.encrypt.decrypt(localStorage.getItem('data')!);
    this.getuser();
    this.countrycode();
  }
  countrycode() {
    this.service.getcc().subscribe((data: any) => {
      this.countryCode = data.calling_code;
      console.log(data);
    });
  }
  getuser() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 500);

    this.service.getuser(this.data["userName"]).subscribe((e: any) => {
      console.log(e);
      this.user = e;
      if (e["prenom"] == null || e["prenom"] == "undefined")
        this.userForm.get("prenom")!.setValue("");
      if (e["gender"] == null || e["gender"] == "undefined")
        this.userForm.get("gender")!.setValue("");
      if (e["phoneNumber"] == null || e["phoneNumber"] == "undefined")
        this.userForm.get("phoneNumber")!.setValue("");
      this.userForm.get("nom")!.setValue(e.nom);
      this.userForm.get("prenom")!.setValue(e.prenom);
      this.userForm.get("userName")!.setValue(e.userName);
      this.userForm.get("email")!.setValue(e.email);
      this.userForm.get("gender")!.setValue(e.gender);
      this.userForm.get("phoneNumber")!.setValue(e.phoneNumber);

      console.log(this.userForm.value);


    },
      err => {
        this.spinner.hide();


      },

    );
  }

  updateUser() {
    const updatedUser: any = {
      userName: this.user.userName,
      nom: this.userForm.controls['nom'].value,
      prenom: this.userForm.controls['prenom'].value,
      email: this.userForm.controls['email'].value,
      gender: this.userForm.controls['gender'].value,
      phoneNumber: this.userForm.controls['phoneNumber'].value,
    };
    this.service.update(updatedUser).subscribe((e: any) => {
      window.location.reload();
    });
  }
  updatePassword() {

    this.service.update({ "userName": this.data["userName"], "password": this.passwordForm.value.password }).subscribe((e: any) => {
      window.location.reload();
    });
  }
  updateImage() {
    const formData = new FormData();
    // const user = this.user;
    console.log(this.user);

    formData.append('user', JSON.stringify(this.user));
    formData.append('file', this.userFile);

    this.service.adduser(formData).subscribe(data => {
      alert('user added ');
      this.setMessage("successfully item added", "#43b581");
    }, (err) => {
      console.log(err);
      history.back();
    });
  }
  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }
  setMessage(msg: any, color: any) {
    this.errorMessage = msg;
    this.styl = {
      backgroundColor: color,
    }
    setTimeout(() => {
      this.errorMessage = null;
    }, 4000);
  }
  onDeleteImage() {
    this.imgURL = null; // clear the image URL variable
    let input = document.getElementById('upload-input');
    if (input) {
      input = null;
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
