import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/Shared/cours.service';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { FormationService } from 'src/app/Shared/formation.service';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.css']
})
export class CoursedetailsComponent implements OnInit {
  currentStep: any = 0;
  id: any = 0;
  username: any;
  historique: any = [];
  data: any = [];
  constructor(public service: CoursService, private formationService: FormationService, private route: ActivatedRoute, private encryptionService: EncryptionService) { }
  nextStep() {
    this.currentStep++;
  }
  goBack() {
    if (this.currentStep != 0) {
      this.currentStep--;
    }
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams["id"];
    this.username = this.encryptionService.decrypt(localStorage.getItem('data')!)["id"];
    this.getCours(this.id);
    this.getHistorique(this.username, this.id)
  }
  getCours(id: any) {
    this.service.getCoursByFormation(id).subscribe((e: any) => {
      this.data = e;
    });
  }
  getHistorique(id: any, idformation: any) {
    this.formationService.historiquebyuserandformation(id, idformation).subscribe((e: any) => {
      this.historique = e
      if (this.historique.avancement === 0) {
        this.currentStep = 0
      }
      else if (this.historique.avancement === 25) {
        this.currentStep = 1;
      }
      else if (this.historique.avancement === 50) {
        this.currentStep = 2;
      }
      else {
        this.currentStep = 3
      }
      console.log(e);
    })
  }
  updateHistorique() {
    const formData = {
      idHistorique: this.historique.idHistorique,
      formation: this.historique.formation,
      user: this.historique.user,
      score: this.historique.score,
      avancement: this.historique.avancement === 100 ? this.historique.avancement : this.historique.avancement + 25,
      etat: this.historique.etat,
    };
    this.formationService.updateHisto(formData).subscribe((e: any) => {
      this.getHistorique(this.username, this.id)
    })
  }
}
