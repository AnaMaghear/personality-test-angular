import {Component, OnInit} from '@angular/core';
import {ResultService} from "../../services/result.service";
import {JobResultModel} from "../../models/job-result.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent implements OnInit{

  job_result: JobResultModel = {job: '', img: ''};
  constructor(private resultService: ResultService, private router: Router) {}

  ngOnInit() {
    this.resultService.currentJobResult.subscribe(jobResult => {
      if (jobResult) {
        this.job_result = jobResult;
        localStorage.setItem("job_result", JSON.stringify(jobResult));
      } else {
        this.job_result = JSON.parse(localStorage.getItem("job_result") as string);
      }
    });
  }

  onRestart() {
    this.router.navigate(['/home'])
  }

}
