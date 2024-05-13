import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../../core/service/account.service";
import { EvaluationService } from "../../../core/service/evaluation.service";
import { User } from "../../../core/model/User";
import { Role } from "../../../core/model/Role";
import {Evaluation} from "../../../core/model/Evaluation";

@Component({
  selector: 'app-evaluations-list',
  templateUrl: './evaluations-list.component.html',
  styleUrls: ['./evaluations-list.component.scss']
})
export class EvaluationsListComponent implements OnInit {
  user?: User;
  evaluations? : Evaluation[];

  constructor(private accountService: AccountService, private evaluationService: EvaluationService) { }

  ngOnInit(): void {
    this.accountService.getProfile().subscribe(
      (profile) => {
        this.user = profile;
        console.log('User Profile:', this.user);

        // @ts-ignore

          this.evaluationService.getEvaluationsByEnseignantId(this.user.userId).subscribe(
            (evaluations) => {
              console.log('Evaluations:', evaluations);
              // Do something with the evaluations
              this.evaluations = evaluations;
            },
            (error) => {
              console.error('Error fetching evaluations:', error);
            }
          );
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}
