import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/Shared/categorie.service';

@Component({
  selector: 'app-display-categ',
  templateUrl: './display-categ.component.html',
  styleUrls: ['./display-categ.component.css']
})
export class DisplayCategComponent implements OnInit {
  constructor(private service: CategorieService, private router: Router) { }
  categories: any;
  term: any;
  page: number = 0;
  pages: Array<number> | undefined;
  ngOnInit(): void {
    this.afficherCateg();
  }
 
  setPage(i: any, event: any) {
    event.preventDefault();
    this.page = i;
    this.afficherCateg();

  }
  afficherCateg() {
    this.service.getCategspage(this.page).toPromise().then((data: any) => {
      console.log(data);
      
      this.categories = data['content'];
      this.pages = new Array(data['totalPages']);
    }).catch((err) => {
      console.log("erreur a afficher les utilisateurs");
    })
  }
  delete(id: any) {
    if (confirm("Do you really wanna delete this category ?")) {
      this.service.deleteForm(id).subscribe(
        data => {
          console.log(data);
          this.afficherCateg();
        });
    }
  }

  redirect(id: any) {
    this.router.navigate(
      ['/courses/editcateg'],
      { queryParams: { id: id } }
    );
  }

}
