import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/Shared/categorie.service';
import { FormationService } from 'src/app/Shared/formation.service';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.css']
})
export class EditCoursesComponent implements OnInit {
  constructor(private formationService: FormationService, private categorieService: CategorieService, private router: Router, private route: ActivatedRoute) { }
  categorie: any;
  id: any;
  Formation = new FormGroup({
    nomFormation: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]/)]),
    duree: new FormControl('', [Validators.required]),
    idFormation: new FormControl('', [Validators.required]),
    instructeur: new FormControl('', [Validators.required]),
    imageInstructeur: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    categ: new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams["id"];
    this.afficherCategorie();
    this.afficherFormation();
  }
  afficherCategorie() {
    this.categorieService.getCategs().subscribe(
      (data: any) => {
        this.categorie = data;
      });
  }
  afficherFormation() {
    this.formationService.getForm(this.id).subscribe(
      (data: any) => {
        // this.Formation = data;
        this.Formation.get("nomFormation")!.setValue(data.nomFormation);
        this.Formation.get("description")!.setValue(data.description);
        this.Formation.get("duree")!.setValue(data.duree);
        this.Formation.get("imageInstructeur")!.setValue(data.imageInstructeur);
        this.Formation.get("instructeur")!.setValue(data.instructeur);
        const selectedCateg = this.categorie.find((c: any) => c.id === data.categ.id);
        this.Formation.get("categ")!.setValue(selectedCateg);
        this.Formation.get("idFormation")!.setValue(data.idFormation);
        console.log("data");
        console.log(data);
      });
  }
  editFormation() {
    console.log(this.Formation.value);
    this.formationService.updateForm(this.Formation.value).subscribe((data: any) => {
      this.router.navigate(["/courses/displaycourse"])
    })
  }

}
