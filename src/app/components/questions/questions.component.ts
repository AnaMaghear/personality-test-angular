import {Component, OnInit} from '@angular/core';
import {QuestionModel} from "../../models/question.model";
import {ResultService} from "../../services/result.service";
import {Router} from "@angular/router";
import {JobResultModel} from "../../models/job-result.model";
import {ResponseModel} from "../../models/response.model";
import {InferenceService} from "../../inference-machine/services/inference.service";


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor(
    private resultService: ResultService,
    private router: Router,
    private inferenceService: InferenceService
    ) {}

  ngOnInit(): void {
      this.inferenceService.getCategoryQuestions()
        .subscribe(data => {
          this.questions = data;
          this.number_of_questions = data.length;
        });
  }

  selectedButton: 1 | 0 | null = null;
  questions: QuestionModel[] = [];

  current_question: number = 0;
  number_of_questions: number = 0;
  all_responses: ResponseModel[] = [];

  selectButton(button: 1 | 0): void {
    this.selectedButton = button;
    this.all_responses[this.current_question] = {
      question: this.questions[this.current_question].question,
      response: button
    }
  }

  onNext() {
    this.selectButton(this.all_responses[this.current_question]?.response);
    this.current_question++;
    this.selectedButton = null;
  }

  onBack() {
    this.current_question--;
    this.selectButton(this.all_responses[this.current_question]?.response);
  }

  onSubmit(part: number) {
    this.selectedButton = null;

    if(part === 1) {
      this.questions = this.inferenceService.getJobQuestions(this.all_responses);
      this.number_of_questions = this.questions.length;
      this.current_question = 0;
      this.all_responses = [];
    } else {
      const jobResult = this.inferenceService.getJob(this.all_responses);
      this.resultService.changeJobResult(jobResult);
      this.router.navigate(['/result']);
    }
  }

}
