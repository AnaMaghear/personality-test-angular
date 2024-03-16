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

  private findCategory(attributes: string[]): string {
    let possibleCategories = [];

    for (const cat of this.categories) {
      let similarity = this.calculateSimilarity(cat.attributes, attributes);
      possibleCategories.push({
        category: cat.category,
        similarity: similarity
      });
    }

    console.log(possibleCategories);
    return possibleCategories.sort((a, b) =>
      -a.similarity + b.similarity)[0].category;
  }

  getJob(responses: ResponseModel[]) {
    const questions = this.jobQuestions.filter(jq => jq.category === this.selectedCategory)[0].questions;
    const attributes = responses.map((r, index) =>
      r.response === 0 ?
        questions[index].no_answer :
        questions[index].yes_answer
    );
    const job = this.findJob(attributes);
    return this.jobs.filter(j => j.job === job)[0] as JobResultModel;
  }

  private findJob(attributes: string[]): string {
    const categoryJobs = this.jobs.filter(j => j.category === this.selectedCategory);
    let possibleJobs = [];

    for (const job of categoryJobs) {
      let similarity = this.calculateSimilarity(job.attributes, attributes);
      possibleJobs.push({
        job: job.job,
        similarity: similarity
      });
    }

    console.log(possibleJobs);
    return possibleJobs.sort((a, b) =>
      - a.similarity + b.similarity)[0].job;
  }

  private calculateSimilarity(attributes: string[], selectedAttributes: string[]): number {
    let similarity = 0;
    let matchedAtt = 0;

    for (const att of attributes) {
      if (!selectedAttributes.includes(att)) {
        break;
      }
      matchedAtt++;
    }

    if (matchedAtt === attributes.length) {
      similarity += matchedAtt;
    }

    for (const selAttribute of selectedAttributes) {
      if (attributes.includes(selAttribute)) {
        similarity++;
      } else {
        if (selAttribute === "") {
          continue;
        }
        similarity--;
      }
    }

    for (const att of attributes) {
      if (!selectedAttributes.includes(att)) {
        similarity--;
      }
    }

    return similarity;
  }
}
