import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registersuccess',
  templateUrl: './registersuccess.component.html',
  styleUrls: ['./registersuccess.component.css']
})
export class RegistersuccessComponent  implements OnInit {
  public showLoadingComponent = true;

  constructor(private router: Router) {}

  public counter = 5;
  public showCounter = true;

  ngOnInit() {
    const intervalId = setInterval(() => {
      this.counter--;
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      this.showCounter = false;
      this.router.navigate(['/second-component']);

    }, 5000);
  }

}
