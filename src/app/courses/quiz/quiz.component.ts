import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: any[] = [
    {
      id: 1,
      title: 'Make a Multiple Choice Test Template Using Excel?',
      options: [
        { id: 'opt_1', value: 'Activate Developer Tab' },
        { id: 'opt_2', value: 'Providing a Lecturer' },
        { id: 'opt_3', value: 'Personally Quizzes' },
        { id: 'opt_4', value: 'Massive Batches' },
      ],
    },
    {
      id: 2,
      title: 'Make a Multiple Choice Test Template Using flutter?',
      options: [
        { id: 'opt_1', value: 'Activate Developer Tab' },
        { id: 'opt_2', value: 'Providing a Lecturer' },
        { id: 'opt_3', value: 'Personally Quizzes' },
        { id: 'opt_4', value: 'Massive Batches' },
      ],
    },
    {
      id: 3,
      title: 'Make a Multiple Choice Test Template Using web?',
      options: [
        { id: 'opt_1', value: 'Activate Developer Tab' },
        { id: 'opt_2', value: 'Providing a Lecturer' },
        { id: 'opt_3', value: 'Personally Quizzes' },
        { id: 'opt_4', value: 'Massive Batches' },
      ],
    },
    // ... Add other questions here
  ];
  selectedOptions: any[] = new Array(this.questions.length);

  ngOnInit(): void {

  }

  currentQuestionIndex: number = 0;

  nextPrev(step: number) {
    this.currentQuestionIndex += step;
  }

  submitQuiz(): void {
    console.log(this.selectedOptions);
  }
}
