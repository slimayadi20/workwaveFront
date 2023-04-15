import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EncryptionService } from './encryption.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public data: any;
  constructor(private encryptionService: EncryptionService,private http: HttpClient, private router: Router) { }

  register(body: any) {
    return this.http.post("http://localhost:8091" + '/registerNewUser', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any) {
    console.log("http://localhost:8091");
    return this.http.post("http://localhost:8091"+ '/authenticate', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  loggedIn() {
    return !!localStorage.getItem('token')
  }

 
  getToken() {
    console.log(localStorage.getItem('data')!);
    if (localStorage.getItem('data') != null) {
      this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
      console.log(this.data);
      return this.data["token"];

    }
    return null;

  }

  logoutUser() {
    localStorage.removeItem('data');

    this.router.navigate(['/auth'])
  }
}
