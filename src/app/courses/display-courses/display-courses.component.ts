import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import jsPDF from 'jspdf';
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
export class DisplayCoursesComponent implements  OnInit {

  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;
  constructor(private userservice: AuthServiceService, private categorieService: CategorieService, private formationService: FormationService, private router: Router, private encryptionService: EncryptionService) { }
  formation: any;
  categories: any;
  historique: any;
  historiquebyuserformation: any;
  username: any;
  user: any
  public hasHistorique: boolean = false;

  // ngAfterViewInit() {
  //   this.progressBar.start();
  //   setTimeout(() => {
  //     this.progressBar.complete();
  //   }, 1000); // stop progress after 5 seconds

  // }
  ngOnInit(): void {
    this.username = this.encryptionService.decrypt(localStorage.getItem('data')!)["userName"];
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
    const historique = this.historique.find((h: any) => h.formation.idFormation === f.idFormation);
    if (historique && historique.etat === 'done') {
      return false; // formation completed
    }
    return true; // formation not completed
  }
  historiqueUserAndFormation(id: any, idformation: any) {
    this.formationService.historiquebyuserandformation(id, idformation).subscribe((e: any) => {
      this.historiquebyuserformation = e

      console.log(e);
    })
  }
  generateCertificatePDF(formation: any): void {
    this.historiqueUserAndFormation(this.username, formation.idFormation);
    // Create a new jsPDF instance
    const doc = new jsPDF('landscape');

    // Define certificate title font and color
    doc.setFont('times', 'bold');
    doc.setFontSize(30);
    doc.setTextColor(28, 82, 120);

    // Add certificate title
    const titleText = 'Certificate of Completion';
    const titleWidth = doc.getStringUnitWidth(titleText) * 30 / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(titleText, titleX, 70);

    // Define recipient name font and color
    doc.setFont('times', 'normal');
    doc.setFontSize(16);
    doc.setTextColor(28, 82, 120);

    // Add recipient name and course details
    const recipientText = `This certifies that ${this.username} has completed the course ${formation.nomFormation} on Workwave.`;
    const recipientWidth = doc.getStringUnitWidth(recipientText) * 16 / doc.internal.scaleFactor;
    const recipientX = (doc.internal.pageSize.width - recipientWidth) / 2;
    doc.text(recipientText, recipientX, 120);

    // Add signature image and completion date
    const signatureImg = new Image();
    signatureImg.src = 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Signature_de_Amine_Zribi.jpg';
    signatureImg.onload = () => {
      const imgWidth = 100;
      const imgHeight = 50;
      const imgX = doc.internal.pageSize.width - 20 - imgWidth;
      const imgY = doc.internal.pageSize.height - 20 - imgHeight;
      doc.addImage(signatureImg, 'PNG', imgX, imgY, imgWidth, imgHeight);

      // Add completion date
      const completionDate = new Date(this.historiquebyuserformation.completionDate);
      const dateText = `Issued at: ${completionDate.toLocaleDateString()}`;
      const dateWidth = doc.getStringUnitWidth(dateText) * 12 / doc.internal.scaleFactor;
      const dateX = doc.internal.pageSize.width - 30 - dateWidth;
      const dateY = doc.internal.pageSize.height - 30;
      doc.text(dateText, dateX, dateY, null!, 'right');


      // Save the PDF
      doc.save(`${this.historiquebyuserformation.user.userName}-Certificate.pdf`);
    };

    // Add certificate border
    doc.setLineWidth(2);
    doc.setDrawColor(28, 82, 120);
    doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40);
  }


  displaywithcateg(c:any){
    this.formationService.getFormswithcateg(c).subscribe(
      data => {
        this.formation = data;
        console.log(data);

      });
  }




}
