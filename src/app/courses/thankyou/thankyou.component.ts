import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  score: any;
  ngOnInit(): void {
    this.score = this.route.snapshot.queryParams["score"];
  }
}
