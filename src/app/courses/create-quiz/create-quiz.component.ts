import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from 'src/app/Shared/cours.service';
import { FormationService } from 'src/app/Shared/formation.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  constructor(private service: CoursService, private router: Router, private FAS: FormationService, private route: ActivatedRoute) { }
  test: boolean = false;
  formation: any;
  id: any;

  Quizz = new FormGroup({
    question1: new FormControl('a', [Validators.required]),
    question2: new FormControl('a', [Validators.required]),
    question3: new FormControl('a', [Validators.required]),
    question4: new FormControl('a', [Validators.required]),
    rep1Q1: new FormControl('a', [Validators.required]),
    rep2Q1: new FormControl('a', [Validators.required]),
    rep3Q1: new FormControl('a', [Validators.required]),
    repCorrectQ1: new FormControl('a', [Validators.required]),
    rep1Q2: new FormControl('a', [Validators.required]),
    rep2Q2: new FormControl('a', [Validators.required]),
    rep3Q2: new FormControl('a', [Validators.required]),
    repCorrectQ2: new FormControl('a', [Validators.required]),
    rep1Q3: new FormControl('a', [Validators.required]),
    rep2Q3: new FormControl('a', [Validators.required]),
    rep3Q3: new FormControl('a', [Validators.required]),
    repCorrectQ3: new FormControl('a', [Validators.required]),
    rep1Q4: new FormControl('a', [Validators.required]),
    rep2Q4: new FormControl('a', [Validators.required]),
    rep3Q4: new FormControl('a', [Validators.required]),
    repCorrectQ4: new FormControl('a', [Validators.required]),
    formation: new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {
    this.afficherFormation();
    this.id = this.route.snapshot.queryParams["id"];

    if (this.id != null) {
      this.getQuiz(this.id);
      this.test = true;
    }
  }
  addQuiz() {
    console.log(this.Quizz.value);

    this.FAS.addQuiz(this.Quizz.value).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(["/courses/displayQuiz"])
    });

  }
  updateQuiz() {
    const quizData = {
      idQuizz: this.id,
      question1: this.Quizz.get("question1")?.value,
      question2: this.Quizz.get("question2")?.value,
      question3: this.Quizz.get("question3")?.value,
      question4: this.Quizz.get("question4")?.value,
      rep1Q1: this.Quizz.get("rep1Q1")?.value,
      rep2Q1: this.Quizz.get("rep2Q1")?.value,
      rep3Q1: this.Quizz.get("rep3Q1")?.value,
      repCorrectQ1: this.Quizz.get("repCorrectQ1")?.value,
      rep1Q2: this.Quizz.get("rep1Q2")?.value,
      rep2Q2: this.Quizz.get("rep2Q2")?.value,
      rep3Q2: this.Quizz.get("rep3Q2")?.value,
      repCorrectQ2: this.Quizz.get("repCorrectQ2")?.value,
      rep1Q3: this.Quizz.get("rep1Q3")?.value,
      rep2Q3: this.Quizz.get("rep2Q3")?.value,
      rep3Q3: this.Quizz.get("rep3Q3")?.value,
      repCorrectQ3: this.Quizz.get("repCorrectQ3")?.value,
      rep1Q4: this.Quizz.get("rep1Q4")?.value,
      rep2Q4: this.Quizz.get("rep2Q4")?.value,
      rep3Q4: this.Quizz.get("rep3Q4")?.value,
      repCorrectQ4: this.Quizz.get("repCorrectQ4")?.value,
    };
    this.FAS.updateQuiz(quizData).subscribe((data: any) => {

      this.router.navigate(["/courses/displayQuiz"]);
    });

  }
  getQuiz(id: any) {
    this.FAS.getQuizById(id).subscribe((data: any) => {
      this.Quizz.patchValue(data);
      console.log(data.formation);
      this.Quizz.get("formation")?.patchValue(data.formation);
    });
  }
  afficherFormation() {
    this.FAS.getForms().subscribe(
      data => {
        this.formation = data;
        console.log("data");
        console.log(data);
      });
  }

}
