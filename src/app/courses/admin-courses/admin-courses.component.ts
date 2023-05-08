import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgProgressComponent } from 'ngx-progressbar';
import { CategorieService } from 'src/app/Shared/categorie.service';
import { FormationService } from 'src/app/Shared/formation.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent  implements AfterViewInit, OnInit{

  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;
  constructor(private categorieService: CategorieService, private formationService: FormationService, private router: Router) { }
  formation: any;
  categories: any;
  ngAfterViewInit() {
    this.progressBar.start();
    setTimeout(() => {
      this.progressBar.complete();
    }, 1000); // stop progress after 5 seconds

  }
  ngOnInit(): void {
    this.showForm();
    this.afficherCategorie();
  }
  showForm() {
    this.formationService.getForms().subscribe(
      data => {
        this.formation = data;
        console.log(data);

      });
  }
  afficherCategorie() {
    this.categorieService.getCategs().subscribe(
      data => {
        this.categories = data;
        console.log("data");
        console.log(data);
      });
  }
  delete(id: any) {
    if (confirm("Do you really wanna delete this course ?")) {
      this.formationService.delete(id).subscribe(
        data => {
          console.log(data);
          this.showForm();
        });
    }
  }
  redirect(id: any) {
    this.router.navigate(
      ['/courses/editcourse'],
      { queryParams: { id: id } }
    );
  }
  displaywithcateg(c:any){
    this.formationService.getFormswithcateg(c).subscribe(
      data => {
        this.formation = data;
        console.log(data);

      });
  }
}
