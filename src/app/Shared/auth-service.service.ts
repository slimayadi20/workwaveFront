import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EncryptionService } from './encryption.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public data: any;
  PATH_OF_API = 'http://localhost:8090';

  constructor(private encryptionService: EncryptionService, private http: HttpClient, private router: Router) { }

  register(body: any) {
    return this.http.post(this.PATH_OF_API + '/registerNewUser', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  update(body: any) {
    return this.http.put(this.PATH_OF_API + '/updateUser', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any) {
    return this.http.post(this.PATH_OF_API + '/authenticate', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  faceAuth(body: any) {
    return this.http.post(this.PATH_OF_API + '/faceAuthenticate', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  forget(body: any) {
    return this.http.post(this.PATH_OF_API + '/reset', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  reset(body: any) {
    return this.http.post(this.PATH_OF_API + '/reset_password', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  PaginationUsers(page: number, role?: string) {
    let params = new HttpParams().set('page', page.toString());
    if (role) {
      params = params.set('role', role);
    }
    return this.http.get(this.PATH_OF_API + '/list', { params: params });
  }
  getUserByRoleFinancial(){
    return this.http.get(this.PATH_OF_API + "/getUserByRoleFinancial");

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
    return this.http.get(this.PATH_OF_API + "/usernames");
  }
  public getuser(username: any) {
    return this.http.get(this.PATH_OF_API + "/getUser/" + username);
  }
  public getcc() {
    return this.http.get('https://api.ipgeolocation.io/ipgeo?apiKey=e3f347b989f34e239402188106fbdf4c')
  }
  logoutUser() {
    localStorage.removeItem('data');

    this.router.navigate(['/auth'])
  }
  otp(body: any) {
    console.log(body);

    return this.http.post(this.PATH_OF_API + '/otp', body, {
      observe: 'response',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  adduser(formData: FormData): Observable<any> {
    return this.http.put(this.PATH_OF_API + '/updateimage', formData)
  }
  getphoto(username: any) {
    return this.http.get(this.PATH_OF_API + "/ImgUsers/" + username);
  }
  getusers() {
    return this.http.get(this.PATH_OF_API + "/users");
  }
  getroles() {
    return this.http.get(this.PATH_OF_API + "/getallroles");
  }
  getrole(role?: string) {
    return this.http.get(this.PATH_OF_API + "/userbyrole/" + role);
  }
  ban(body: any) {
    return this.http.put(this.PATH_OF_API + '/banUser', body)
  }
  getbyBankAccount(id: Number) {
    return this.http.get(`${this.PATH_OF_API}/UserByBankAccount/${id}`);
  }
  getbyNoPayments() {
    return this.http.get(`${this.PATH_OF_API}/unpaid`);
  }

  tfa(body: any) {
    return this.http.put(this.PATH_OF_API + '/tfaUser', body)
  }
  createRole(body: any) {
    return this.http.post(this.PATH_OF_API + '/createNewRole', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  updateRole(body: any, role: any) {
    return this.http.post(this.PATH_OF_API + '/users/' + role, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  deleteRole(body: any) {
    return this.http.delete(this.PATH_OF_API + '/role/' + body);
  }

}
