import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Shared/auth-service.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private auth :AuthServiceService) { }
  ngOnInit(): void {
    
  }



}