import { Component, OnInit } from '@angular/core';
import { FormationService } from 'src/app/Shared/formation.service';

@Component({
  selector: 'app-enrollement',
  templateUrl: './enrollement.component.html',
  styleUrls: ['./enrollement.component.css']
})
export class EnrollementComponent implements OnInit {

  constructor(private fs: FormationService) { }
  histo: any;
  term: any;
  ngOnInit(): void {
    this.displayEnrollement()
  }
  displayEnrollement() {
    this.fs.getAllHisto().subscribe((data: any) => {
      console.log(data);
      this.histo = data
    })
  }
}
