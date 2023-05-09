import { Component,  OnInit,Input ,OnChanges,SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-modal',
  templateUrl: './set-modal.component.html',
  styleUrls: ['./set-modal.component.css']
})
export class SetModalComponent implements OnInit , OnChanges{
  constructor(public service: AuthServiceService, private router: Router) { }
  SalaryForm: FormGroup = new FormGroup({
    salaryAmount: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
  })
  salary: any;
  @Input() userName: any;
  @Input() prenom: any;
  @Input() nom: any;
  username2: any;
  nom2: any;
  prenom2: any;
  ngOnChanges(changes: SimpleChanges): void {
      this.username2 = changes['userName'].currentValue;
      this.nom2 = changes['nom'].currentValue;
      this.prenom2 = changes['prenom'].currentValue;
      console.log(this.username2);
      console.log(this.nom2);
      
   
  }
  ngOnInit(): void { }
  SetSalary(userName: any) {
    this.salary = this.SalaryForm.controls["salaryAmount"].value;
    console.log(this.salary);

    this.service.setSalary(userName, this.salary).subscribe((e: any) => {
      console.log(e);
      window.location.reload();
    })
  }

}

