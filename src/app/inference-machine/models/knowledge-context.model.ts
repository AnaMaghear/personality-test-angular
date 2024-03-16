import {Question} from "./question.model";
import {JobQuestion} from "./job-question.model";
import {Category} from "./category.model";
import {Job} from "./job.model";

export interface KnowledgeContext {
  categoryQuestions: Question[];
  jobsQuestions: JobQuestion[];
  categories: Category[];
  jobs: Job[];
}
