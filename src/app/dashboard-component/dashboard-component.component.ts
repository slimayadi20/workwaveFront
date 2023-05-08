import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgProgressComponent } from 'ngx-progressbar';
import { EncryptionService } from '../Shared/encryption.service';
import { SpotifyGenerator } from "embedgenerator";

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent implements AfterViewInit, OnInit {
  constructor(private encrypt: EncryptionService) { }
  data: any;
  list: any;
  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;

  ngAfterViewInit() {
    this.progressBar.start();
    setTimeout(() => {
      this.progressBar.complete();
    }, 1000); // stop progress after 5 seconds
  }

  ngOnInit(): void {
    this.data = this.encrypt.decrypt(localStorage.getItem('data')!);
    this.list = [
      `Welcome Back, ${this.data['userName']}!`,
      `¡Bienvenido de nuevo, ${this.data['userName']}!`,
      `Bienvenue de retour, ${this.data['userName']}!`,
      `Willkommen zurück, ${this.data['userName']}!`,
      `Bentornato/a, ${this.data['userName']}!`
    ];



  }



}

