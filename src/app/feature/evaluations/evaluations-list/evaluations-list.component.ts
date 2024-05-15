import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../../core/service/account.service";
import { EvaluationService } from "../../../core/service/evaluation.service";
import { User } from "../../../core/model/User";
import { Role } from "../../../core/model/Role";
import { Evaluation } from "../../../core/model/Evaluation";
import { Eleve } from "../../../core/model/Eleve";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-evaluations-list',
  templateUrl: './evaluations-list.component.html',
  styleUrls: ['./evaluations-list.component.scss']
})
export class EvaluationsListComponent implements OnInit {
  user?: User;
  evaluations?: Evaluation[];
  protected role: Role | undefined;

  constructor(private accountService: AccountService, private evaluationService: EvaluationService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.getProfile().subscribe(
      (profile) => {
        this.user = profile;
        console.log('User Profile:', this.user);
        console.log('User role:', this.user.roles);

        if (this.user && this.user.roles) {
          this.role = this.user.roles.find((r) => r.roleName === "enseignant");
          if (this.role) {
            // User is an Enseignant
            this.evaluationService.getEvaluationsByEnseignantId(this.user.userId).subscribe(
              (evaluations) => {
                console.log('Evaluations:', evaluations);
                this.evaluations = evaluations;
              },
              (error) => {
                console.error('Error fetching evaluations:', error);
              }
            );
          } else {
            // User is an Eleve
            const eleve = this.user as Eleve;
            if (eleve.classeId) {
              this.evaluationService.getEvaluationsByClassId(eleve.classeId).subscribe(
                (evaluations) => {
                  console.log('Evaluations:', evaluations);
                  this.evaluations = evaluations.filter(evaluation =>
                    !eleve.passedEvaluations?.some(passedEval => passedEval.id === evaluation.id)
                  );
                },
                (error) => {
                  console.error('Error fetching evaluations:', error);
                }
              );
            } else {
              console.error('Eleve does not have a class assigned');
            }
          }
        } else {
          console.error('User or user roles not found');
        }
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  confirmStartEvaluation(evaluationId: number | undefined): void {
    Swal.fire({
      title: 'Start Evaluation',
      text: 'You can only take this test once. Do you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, start it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/home/evaluations/pass', evaluationId]);
      }
    });
  }
}
