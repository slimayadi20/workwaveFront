import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/Shared/categorie.service';

@Component({
  selector: 'app-add-categ',
  templateUrl: './add-categ.component.html',
  styleUrls: ['./add-categ.component.css']
})
export class AddCategComponent implements OnInit {

  constructor(private service: CategorieService, private router: Router) { }
  id: any;
  Categorie = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]/)]),
  })
  ngOnInit(): void {
  }

  addCategorie() {
    console.log(this.Categorie.value);
    this.service.addCateg(this.Categorie.value).subscribe((data: any) => {
      this.router.navigate(["/courses/displaycateg"])
    })
  }
}
