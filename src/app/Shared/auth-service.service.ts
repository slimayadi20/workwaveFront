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
    return this.http.post("http://localhost:8091"+ '/authenticate', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  forget(body: any) {
    return this.http.post("http://localhost:8091"+ '/reset', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  reset(body: any) {
    return this.http.post("http://localhost:8091"+ '/reset_password', body, {
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
  public getusernames() {
    return this.http.get("http://localhost:8091"+ "/usernames");
  }
  logoutUser() {
    localStorage.removeItem('data');

    this.router.navigate(['/auth'])
  }
  otp(body: any) {
console.log(body);

    return this.http.post("http://localhost:8091"+ '/otp', body, {
      observe: 'response',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
