import {Component, OnInit} from '@angular/core';
import {QuestionModel} from "../../models/question.model";
import {ResultService} from "../../services/result.service";
import {Router} from "@angular/router";
import {JobResultModel} from "../../models/job-result.model";
import {ResponseModel} from "../../models/response.model";


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent{

  constructor(private resultService: ResultService, private router: Router) {}

  selectedButton: 1 | 0 | null = null;
  questions: QuestionModel[] = [
    {question: 'How are you today 1?', img_name: 'q0.jpg', part: 1},
    {question: 'How are you today 2?', img_name: 'q1.jpg', part: 1},
    {question: 'How are you today 3?', img_name: 'q2.jpg', part: 1},
  ];

  current_question: number = 0;
  number_of_questions: number = this.questions.length;
  all_responses: ResponseModel[] = [];

  selectButton(button: 1 | 0): void {
    this.selectedButton = button;
    this.all_responses[this.current_question] = {
      question: this.questions[this.current_question].question,
      response: button
    }
  }

  onNext() {
    this.selectedButton = null;
    this.current_question++;
    this.selectButton(this.all_responses[this.current_question]?.response);

  }

  onBack() {
    this.current_question--;
    this.selectButton(this.all_responses[this.current_question]?.response);
  }

  onSubmit(part: number) {
    if(part !== 1) { //schimba cand ai doua liste de question uri
    }

    else {
      console.log(this.all_responses);
      const jobResult: JobResultModel = { job: 'Farmer', job_image: 'j0.jpg' }; // call uie sa primesti raspunsul
      this.resultService.changeJobResult(jobResult);
      this.router.navigate(['/result']);
    }
  }

}
