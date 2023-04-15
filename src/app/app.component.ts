import { Component, OnInit } from '@angular/core';
import { EncryptionService } from './Shared/encryption.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'workwavefront';
  user: boolean = false;
  data: any ; 
  token: any ; 
  constructor(private encryptionService: EncryptionService, private router: Router) { }

  ngOnInit() {
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    this.token = this.data["token"];
    // your authentication code here
  }
}
