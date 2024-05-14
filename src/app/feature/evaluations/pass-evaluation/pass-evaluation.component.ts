import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evaluation } from "../../../core/model/Evaluation";
import { User } from "../../../core/model/User";
import { EvaluationService } from "../../../core/service/evaluation.service";
import { AccountService } from "../../../core/service/account.service";
import { EvaluationResultService } from "../../../core/service/evaluationResult.service";
import { EvaluationResult } from "../../../core/model/EvaluationResult";
import { Eleve } from "../../../core/model/Eleve";
import Swal from "sweetalert2";
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CanComponentDeactivate} from "../../../core/service/ConfirmLeaveGuard.service";

@Component({
  selector: 'app-pass-evaluation',
  templateUrl: './pass-evaluation.component.html',
  styleUrls: ['./pass-evaluation.component.scss']
})
export class PassEvaluationComponent implements OnInit, CanComponentDeactivate {
  evaluationId?: any;
  evaluation?: Evaluation;
  answers: Map<number, number> = new Map(); // Map<QuestionIndex, SelectedAnswerIndex>
  user?: Eleve; // Assuming you have a User model
  selectedAnswers: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluationService: EvaluationService,
    private accountService: AccountService,
    private evaluationResultService: EvaluationResultService
  ) { }

  ngOnInit(): void {
    this.accountService.getProfile().subscribe(
      (profile) => {
        this.user = profile as Eleve;
        console.log('User Profile:', this.user);

        if (this.user && this.evaluationId) {
          // Add evaluation to passed evaluations list on init
          // @ts-ignore
          this.accountService.addPassedEvaluation(this.user?.userId, this.evaluationId).subscribe(
            () => console.log('Added to passed evaluations'),
            (error) => console.error('Error adding to passed evaluations:', error)
          );
        }
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );

    this.route.paramMap.subscribe(params => {
      this.evaluationId = params.get('id');
      this.loadEvaluation();
    });
  }

  loadEvaluation() {
    this.evaluationService.getEvaluationById(this.evaluationId).subscribe(evaluation => {
      this.evaluation = evaluation;
      this.initializeAnswers();
    });
  }

  initializeAnswers() {
    // @ts-ignore
    this.evaluation.questions.forEach((question, index) => {
      this.answers.set(index, -1);
    });
  }

  selectAnswer(questionIndex: number, answerIndex: number) {
    this.answers.set(questionIndex, answerIndex);
    this.selectedAnswers[questionIndex] = answerIndex;
  }

  calculateScore(): number {
    let score = 0;
    // @ts-ignore
    this.evaluation.questions.forEach((question, index) => {
      const selectedAnswerIndex = this.answers.get(index);
      if (selectedAnswerIndex !== null && selectedAnswerIndex !== undefined) {
        // @ts-ignore
        const selectedAnswer = question.answers[selectedAnswerIndex];
        if (selectedAnswer.correct) {
          score += 2;
        }
      }
    });
    return score;
  }

  submitEvaluation() {
    const submitAction = 'submit';
    Swal.fire({
      title: 'Submit Evaluation',
      text: 'Are you sure you want to submit this evaluation?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Yes, ${submitAction} it!`,
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const score = this.calculateScore();

        const evaluationResult: EvaluationResult = {
          // @ts-ignore
          eleve: this.user,
          // @ts-ignore
          evaluation: this.evaluation,
          score
        };

        this.evaluationResultService.createEvaluationResult(evaluationResult).subscribe(() => {
          this.router.navigate(['/home/evaluations']); // Redirect to dashboard or wherever
          Swal.fire(
            'Success!',
            `Evaluation ${submitAction}d successfully.`,
            'success'
          );
        }, (error) => {
          if (error instanceof HttpErrorResponse) {
            console.log(this.user?.userId);
            this.router.navigate(['/home/evaluations']); // Redirect to dashboard or wherever
            // Handle HttpErrorResponse errors
            Swal.fire(
              'Success!',
              `Evaluation ${submitAction}d successfully.`,
              'success'
            );
          } else {
            // Handle other errors
            Swal.fire(
              'Error!',
              `An unexpected error occurred.`,
              'error'
            );
          }
        });
      }
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return Swal.fire({
      title: 'Warning',
      text: 'Leaving this page will result in you failing the evaluation. Are you sure you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, leave page',
      cancelButtonText: 'Stay on page'
    }).then((result) => {
      return result.isConfirmed;
    });
  }
}
