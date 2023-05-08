import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/Shared/cours.service';
import { FormationService } from 'src/app/Shared/formation.service';

@Component({
  selector: 'app-display-cours',
  templateUrl: './display-cours.component.html',
  styleUrls: ['./display-cours.component.css']
})
export class DisplayCoursComponent implements OnInit {
  cours: any;
  term: any;
  constructor(private service: CoursService,private router :Router) { }
  ngOnInit(): void {
    this.afficherCours()
  }
  afficherCours() {
    this.service.getCours().subscribe(
      data => {
        this.cours = data;
        console.log("data");
        console.log(data);
      });
  }
  redirect(id: any) {
    this.router.navigate(
      ['/courses/CreateCours'],
      { queryParams: { id: id } }
    );
  }
  delete(id:any){
    this.service.deleteCours(id).subscribe((data: any) => {
      console.log('aa');
      console.log(data);
      
      this.afficherCours();
    })
  }


}
