import { Injectable } from '@angular/core';
import {JobResultModel} from "../models/job-result.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private jobResultSource = new BehaviorSubject<JobResultModel | null>(null);
  currentJobResult = this.jobResultSource.asObservable();
  constructor() { }

  changeJobResult(jobResult: JobResultModel) {
    this.jobResultSource.next(jobResult);
  }
}
