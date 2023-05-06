import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgProgressComponent } from 'ngx-progressbar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceService } from 'src/app/Shared/auth-service.service';
import { CategorieService } from 'src/app/Shared/categorie.service';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { FormationService } from 'src/app/Shared/formation.service';

@Component({
  selector: 'app-display-courses',
  templateUrl: './display-courses.component.html',
  styleUrls: ['./display-courses.component.css']
})
export class DisplayCoursesComponent implements AfterViewInit, OnInit {

  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;
  constructor(private userservice: AuthServiceService, private categorieService: CategorieService, private formationService: FormationService, private router: Router, private encryptionService: EncryptionService) { }
  formation: any;
  categories: any;
  historique: any;
  username: any;
  user: any
  public hasHistorique: boolean = false;

  ngAfterViewInit() {
    this.progressBar.start();
    setTimeout(() => {
      this.progressBar.complete();
    }, 1000); // stop progress after 5 seconds

  }
  ngOnInit(): void {
    this.username = this.encryptionService.decrypt(localStorage.getItem('data')!)["id"];
    this.afficherHistoriqueByUser(this.username);
    this.getUserByUsername(this.username);
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
      });
  }
  afficherHistoriqueByUser(id: any) {
    this.formationService.getHisto(id).subscribe(
      data => {
        this.historique = data;
        console.log(this.historique);
        
      });
  }
  delete(id: any) {
    if (confirm("Do you really wanna delete this course ?")) {
      this.formationService.delete(id).subscribe(
        data => {
          this.showForm();
        });
    }
  }
  redirect(f: any) {
    if (this.hasEnrolled(f)) {
      this.router.navigate(['/courses/coursedetail'], { queryParams: { id: f.idFormation } });
    } else {
      alert('You must enroll in this formation first before you can access the course details.');
    }
  }
  getCompletionPercent(f: any) {
    const nbCoursTermine = this.historique.find((h: any) => h.formation.idFormation === f.idFormation)?.avancement || 0;
    return nbCoursTermine;
  }
  hasEnrolled(f: any): boolean {
    return this.historique && this.historique.some((h: any) => h.formation.idFormation === f.idFormation);
  }
  hasClaimedCertificate(f: any): boolean {
    const courseHistory = this.historique.find((h: any) => h.formation.idFormation === f.idFormation);
    return courseHistory && courseHistory.avancement === 100 && courseHistory.score === 0;
  }
  getUserByUsername(user: any) {
    this.userservice.getUserByUsername(user).subscribe((e: any) => {
      this.user = e;
    })
  }
  enroll(f: any) {
    const formData = {
      formation: f,
      user: this.user,
      score: 0,
      avancement: 0,
      etat: "Active",
    };
    this.formationService.addHisto(formData).subscribe((e: any) => {
      this.afficherHistoriqueByUser(this.username);
    })
  }
  verifyCompletion(f: any) {
    const historique = this.historique.find((h:any) => h.formation.idFormation === f.idFormation);
    if (historique && historique.etat === 'done') {
      return false; // formation completed
    }
    return true; // formation not completed
  }
}
