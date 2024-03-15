import { Injectable } from '@angular/core';
import {KnowledgeContext} from "../models/knowledge-context.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Question} from "../models/question.model";
import {JobQuestion} from "../models/job-question.model";
import {ResponseModel} from "../../models/response.model";
import {QuestionModel} from "../../models/question.model";
import {Category} from "../models/category.model";
import {DataService} from "./data.service";
import {Job} from "../models/job.model";
import {JobResultModel} from "../../models/job-result.model";


@Injectable({
  providedIn: 'root'
})
export class InferenceService {

  categoryQuestions: Question[] = [];
  jobQuestions: JobQuestion[] = [];
  categories: Category[] = [];
  jobs: Job[] = [];
  selectedCategory!: string;

  constructor(private dataService : DataService) {
    this.loadData();
  }

  private loadData() {
    this.dataService.getCategoryQuestions()
      .subscribe(data => this.categoryQuestions = data);

    this.dataService.getJobQuestions()
      .subscribe(data => this.jobQuestions = data);

    this.dataService.getCategories()
      .subscribe(data => this.categories = data);

    this.dataService.getJobs()
      .subscribe(data => this.jobs = data);
  }

  getCategoryQuestions() {
    return this.dataService.getCategoryQuestions()
      .pipe(
        map(v => v as QuestionModel[])
      );
  }

  getJobQuestions(responses: ResponseModel[]) {
    const attributes = responses.map((r, index) =>
      r.response === 0 ?
        this.categoryQuestions[index].no_answer :
        this.categoryQuestions[index].yes_answer
    );
    this.selectedCategory = this.findCategory(attributes);

    return this.jobQuestions.filter(jq => jq.category === this.selectedCategory)[0].questions;
  }

  private findCategory(attributes: string[]) {
    return "Nature";  // dummy test
  }

  getJob(responses: ResponseModel[]) {
    const attributes = responses.map((r, index) =>
      r.response === 0 ?
        this.categoryQuestions[index].no_answer :
        this.categoryQuestions[index].yes_answer
    );
    const categoryJobs = this.jobs.filter(j => j.category === this.selectedCategory);
    const job = "Farmer";
    return categoryJobs.filter(j => j.job === job)[0] as JobResultModel;
  }
}
