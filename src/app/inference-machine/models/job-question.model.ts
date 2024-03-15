import {Question} from "./question.model";

export interface JobQuestion {
  category: string;
  questions: Question[];
}
