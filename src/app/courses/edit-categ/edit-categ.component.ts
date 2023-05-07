import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategorieService } from 'src/app/Shared/categorie.service';

@Component({
  selector: 'app-edit-categ',
  templateUrl: './edit-categ.component.html',
  styleUrls: ['./edit-categ.component.css']
})
export class EditCategComponent implements OnInit {

  constructor(private service: CategorieService, private router: Router, private route: ActivatedRoute) { }
  id: any;
  Categorie = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]/)]),
  })
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams["id"];
    this.afficherCategorie();
    console.log(this.Categorie.value);
  }
  afficherCategorie() {
    this.service.getCateg(this.id).subscribe((data: any) => {
      this.Categorie.get("id")!.setValue(data.id);
      this.Categorie.get("nom")!.setValue(data.nom);
      console.log(data);
      
    })
  };

  editCategorie() {
    console.log(this.Categorie.value);
    this.service.updateCateg(this.Categorie.value).subscribe((data: any) => {
      this.router.navigate(["/courses/displaycateg"])
    })
  }
}
