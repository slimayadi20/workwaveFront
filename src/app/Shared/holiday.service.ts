import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  PATH_OF_API = 'https://workwaveback.onrender.com';

  constructor(private http: HttpClient,) { }
  add(body: any) {
    return this.http.post(this.PATH_OF_API + '/addHoliday', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  update(body: any) {
    return this.http.put(this.PATH_OF_API + '/updateHoliday', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  public getAll() {
    return this.http.get(this.PATH_OF_API + "/holiday");
  }
  public getHolidaysByUser(username: any) {
    return this.http.get(this.PATH_OF_API + "/holidaybyuser/" + username);
  }
  public deleteHoliday(id: any) {
    return this.http.get(this.PATH_OF_API + "/deleteHoliday/" + id);
  }

}
