import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgProgressComponent } from 'ngx-progressbar';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategorieService } from 'src/app/Shared/categorie.service';
import { FormationService } from 'src/app/Shared/formation.service';

@Component({
  selector: 'app-display-courses',
  templateUrl: './display-courses.component.html',
  styleUrls: ['./display-courses.component.css']
})
export class DisplayCoursesComponent implements AfterViewInit, OnInit {

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
}
