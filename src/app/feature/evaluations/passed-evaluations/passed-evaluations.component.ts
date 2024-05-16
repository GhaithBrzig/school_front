import { Component, OnInit } from '@angular/core';
import { EvaluationResult } from "../../../core/model/EvaluationResult";
import { AccountService } from "../../../core/service/account.service";
import { EvaluationResultService } from "../../../core/service/evaluationResult.service";
import { Eleve } from "../../../core/model/Eleve";

@Component({
  selector: 'app-passed-evaluations',
  templateUrl: './passed-evaluations.component.html',
  styleUrls: ['./passed-evaluations.component.scss']
})
export class PassedEvaluationsComponent implements OnInit {
  user!: Eleve;
  evaluationResults: EvaluationResult[] = [];

  constructor(
    private accountService: AccountService,
    private evaluationResultService: EvaluationResultService
  ) { }

  ngOnInit(): void {
    this.accountService.getProfile().subscribe(
      (profile) => {
        this.user = profile;
        console.log('User Profile:', this.user);
        console.log('User role:', this.user.roles);
        this.loadEvaluationResults(this.user.userId);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  loadEvaluationResults(userId: number | undefined): void {
    if (userId !== undefined) {
      this.evaluationResultService.getEvaluationResultsByUserId(userId).subscribe(
        (results) => {
          this.evaluationResults = results;
          console.log('Evaluation Results:', this.evaluationResults);
        },
        (error) => {
          console.error('Error fetching evaluation results:', error);
        }
      );
    }
  }
}
