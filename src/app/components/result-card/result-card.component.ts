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

  job_result: JobResultModel = {job: '', job_image: ''};
  constructor(private resultService: ResultService, private router: Router) {}

  ngOnInit() {
    this.resultService.currentJobResult.subscribe(jobResult => {
      if (jobResult) {
        this.job_result = jobResult;
      }
    });
  }

  onRestart() {
    this.router.navigate(['/home'])
  }

}
