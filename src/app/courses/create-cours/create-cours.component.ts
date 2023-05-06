import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from 'src/app/Shared/cours.service';
import { FormationService } from 'src/app/Shared/formation.service';

@Component({
  selector: 'app-create-cours',
  templateUrl: './create-cours.component.html',
  styleUrls: ['./create-cours.component.css']
})
export class CreateCoursComponent implements OnInit {

  constructor(private service: CoursService, private router: Router, private FAS: FormationService, private route: ActivatedRoute) { }
  Cours = new FormGroup({
    contenu1: new FormControl('a', [Validators.required]),
    contenu2: new FormControl('a', [Validators.required]),
    contenu3: new FormControl('a', [Validators.required]),
    contenu4: new FormControl('a', [Validators.required]),
    sousTitre1: new FormControl('a', [Validators.required]),
    sousTitre2: new FormControl('a', [Validators.required]),
    sousTitre3: new FormControl('a', [Validators.required]),
    sousTitre4: new FormControl('a', [Validators.required]),
    titre: new FormControl('a', [Validators.required]),
    formation: new FormControl('a', [Validators.required]), // f update fama mochkla 
  })
  formation: any;
  cours: any;
  id: any;
  test:boolean=false ;
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams["id"];
    console.log(this.id);
    this.afficherFormation();

    if (this.id != null) {
      this.getCours(this.id);
      this.test=true ; 
    }
  }
  afficherFormation() {
    this.FAS.getForms().subscribe(
      data => {
        this.formation = data;
        console.log("data");
        console.log(data);
      });
  }
  addCours() {
    console.log(this.Cours.value);
    this.service.addCours(this.Cours.value).subscribe((data: any) => {
      this.router.navigate(["/courses/displayCours"])
    })
  }
  updateCours() {
    const formData = {
      idCours: this.id,
      contenu1: this.Cours.get("contenu1")?.value,
      contenu2: this.Cours.get("contenu2")?.value,
      contenu3: this.Cours.get("contenu3")?.value,
      contenu4: this.Cours.get("contenu4")?.value,
      sousTitre1: this.Cours.get("sousTitre1")?.value,
      sousTitre2: this.Cours.get("sousTitre2")?.value,
      sousTitre3: this.Cours.get("sousTitre3")?.value,
      sousTitre4: this.Cours.get("sousTitre4")?.value,
      titre: this.Cours.get("titre")?.value,
      formation: this.Cours.get("formation")?.value,
    };
    console.log(this.Cours.value);
    this.service.updateCours(formData).subscribe((data: any) => {
      this.router.navigate(["/courses/displayCours"])
    })
  }
  getCours(id:any){
    this.service.getCoursById(id).subscribe((data: any) => {
      // this.Cours=data ; 
      this.Cours.get("contenu1")?.setValue(data.contenu1);
      this.Cours.get("contenu2")?.setValue(data.contenu2);
      this.Cours.get("contenu3")?.setValue(data.contenu3);
      this.Cours.get("contenu4")?.setValue(data.contenu4);
      this.Cours.get("sousTitre1")?.setValue(data.sousTitre1);
      this.Cours.get("sousTitre2")?.setValue(data.sousTitre2);
      this.Cours.get("sousTitre3")?.setValue(data.sousTitre3);
      this.Cours.get("sousTitre4")?.setValue(data.sousTitre4);
      this.Cours.get("titre")?.setValue(data.titre);
      console.log(data);
    });
  }

}
