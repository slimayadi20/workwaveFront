import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormationService } from 'src/app/Shared/formation.service';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.css']
})
export class DisplayQuizComponent implements OnInit {

  constructor(private service: FormationService,private router:Router) { }
  quiz: any;
  term: any;
  ngOnInit(): void {
    this.getAllQuiz();
  }
  getAllQuiz() {
    this.service.getAllQuiz().subscribe((data: any) => {
      console.log(data);
      this.quiz = data;
    })
  }
  delete(id: any) {
    this.service.deleteQuiz(id).subscribe((data: any) => { });
  }
  redirect(id: any) {
    this.router.navigate(
      ['/courses/createQuiz'],
      { queryParams: { id: id } }
    );
  }
}
