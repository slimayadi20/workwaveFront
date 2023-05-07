import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/Shared/categorie.service';
import { FormationService } from 'src/app/Shared/formation.service';

@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.css']
})
export class CreateCoursesComponent implements OnInit {

  constructor(private formationService: FormationService, private categorieService: CategorieService, private router: Router) { }
  categorie: any;
  Formation = new FormGroup({
    nomFormation: new FormControl('a', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]/)]),
    duree: new FormControl('a', [Validators.required]),
    instructeur: new FormControl('a', [Validators.required]),
    imageInstructeur: new FormControl('a', [Validators.required]),
    description: new FormControl('a', [Validators.required]),
    categ: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.afficherCategorie();
  }
  addFormation() {
    console.log(this.Formation.value);
    this.formationService.addForm(this.Formation.value).subscribe(
      data => {
        console.log(data);
         this.router.navigate(["/courses/displaycourse"])
      });

  }
  afficherCategorie() {
    this.categorieService.getCategs().subscribe(
      data => {
        this.categorie = data;
        console.log("data");
        console.log(data);
      });
  }

}
