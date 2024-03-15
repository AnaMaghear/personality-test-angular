import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {KnowledgeContext} from "../models/knowledge-context.model";
import {HttpClient} from "@angular/common/http";
import {QuestionModel} from "../../models/question.model";
import {Question} from "../models/question.model";
import {Category} from "../models/category.model";
import {Job} from "../models/job.model";
import {JobQuestion} from "../models/job-question.model";

const FILE_PATH = "assets/knowledge_base.json";
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private knowledgeContext = new BehaviorSubject<KnowledgeContext | null>(null);
  private knowledgeContext$: Observable<KnowledgeContext | null> = this.knowledgeContext.asObservable();

  constructor(private httpClient: HttpClient) {
    this.loadJsonData();
  }

  private loadJsonData() {
    this.httpClient.get<KnowledgeContext>(FILE_PATH).subscribe({
      next: (data) => this.knowledgeContext.next(data),
      error: (error) => console.error('Error loading knowledge base:', error)
    });
  }

  getCategoryQuestions(): Observable<Question[]> {
    return this.knowledgeContext$.pipe(
      map(context => context ? context.categoryQuestions : [])
    );
  }

  getJobQuestions(): Observable<JobQuestion[]> {
    return this.knowledgeContext$.pipe(
      map(context => context ? context.jobsQuestions : [])
    );
  }

  getCategories(): Observable<Category[]> {
    return this.knowledgeContext$.pipe(
      map(context => context ? context.categories : [])
    );
  }

  getJobs(): Observable<Job[]> {
    return this.knowledgeContext$.pipe(
      map(context => context ? context.jobs : [])
    );
  }
}
