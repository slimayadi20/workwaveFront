import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionService } from 'src/app/Shared/encryption.service';
import { FormationService } from 'src/app/Shared/formation.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  constructor(private service: FormationService, private router: Router, private route: ActivatedRoute, private encryptionService: EncryptionService) { }
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

    // ... Add other questions here
  ];
  quiz: any[] = [];
  selectedOptions: any[] = new Array(this.questions.length);
  id: any;
  historique: any;
  username: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams["id"];
    this.username = this.encryptionService.decrypt(localStorage.getItem('data')!)["userName"];

    this.getHistorique(this.username, this.id)
    this.getQuiz();// id formation
  }

  currentQuestionIndex: number = 0;


  getQuiz() {
    this.service.getQuiz(this.id).subscribe((data: any) => {
      if (!data) {
        console.log('No quiz data available');
        return;
      }

      // Create an array to hold the questions
      const quizQuestions = [];

      // Loop through each question in the response data
      for (let i = 1; i <= 4; i++) {
        const question = {
          id: i,
          title: data[`question${i}`],
          options: [
            { id: `opt_${i}a`, value: data[`rep${1}Q${i}`] },
            { id: `opt_${i}b`, value: data[`rep${2}Q${i}`] },
            { id: `opt_${i}c`, value: data[`rep${3}Q${i}`] },
          ],
          correctResponse: data[`repCorrectQ${i}`]
        };
        quizQuestions.push(question);
      }

      // Set the questions array to the new array we just created
      this.questions = quizQuestions;
    });
  }

  nextPrev(n: number) {
    // Move to the next/previous question
    this.currentQuestionIndex += n;
    console.log(this.currentQuestionIndex);
    // console.log("current question index ");
    console.log(this.questions.length);

    // Check if the user has completed the quiz
    if (this.currentQuestionIndex === this.questions.length) {

      // Submit the quiz
      this.submitQuiz();
    }
  }
  submitQuiz() {
    let score = 0; // initialize the score

    // Iterate over the questions
    for (let i = 0; i < this.questions.length; i++) {
      // Check if the user's response is correct
      console.log("this.selected");

      console.log(this.selectedOptions[i]);
      console.log("this.questions");

      console.log(this.questions[i].correctResponse);

      this.questions[i].isCorrect = this.selectedOptions[i] === this.questions[i].correctResponse;
      // Increase the score if the response is correct
      if (this.questions[i].isCorrect) {
        score++;
      }
    }
    if (this.historique.etat === "Active") {
      if (score >= 2) {
        this.historique.score = score;
        this.historique.etat = "done";
        this.historique.completionDate = new Date();
        this.service.updateHisto(this.historique).subscribe((data: any) => {
          console.log(data);
          console.log("donnnnnnnnnnnnnne");
          this.router.navigate(['/courses/thankyou'], { queryParams: { score: score } })

        });
      } else {
        alert("you failed the quiz");
        window.location.reload();
      }

    } else {
      this.router.navigate(['/courses/thankyou'], { queryParams: { score: score } })

      // alert("you failed the quiz");
      // window.location.reload();
    }
    // Display the score or do something else with it
    // console.log(`You scored ${score} out of ${this.questions.length}`);
  }
  getHistorique(id: any, idformation: any) {
    this.service.historiquebyuserandformation(id, idformation).subscribe((e: any) => {
      this.historique = e

      console.log(e);
    })
  }
  isSelected(questionIndex: number, optionValue: string): boolean {

    return this.selectedOptions[questionIndex] === optionValue;
  }

  selectOption(event: any) {

    this.selectedOptions[this.currentQuestionIndex] = event.target.value;
  }

}
