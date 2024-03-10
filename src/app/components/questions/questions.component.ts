import { Component } from '@angular/core';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {

  current_question: number = 1;
  number_of_questions: number = 30;
  selectedButton: 'yes' | 'no' | null = null;

  selectButton(button: 'yes' | 'no'): void {
    this.selectedButton = button;

  }

}
