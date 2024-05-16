import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DurationEnum, Evaluation} from "../../../core/model/Evaluation";
import { User } from "../../../core/model/User";
import { EvaluationService } from "../../../core/service/evaluation.service";
import { AccountService } from "../../../core/service/account.service";
import { EvaluationResultService } from "../../../core/service/evaluationResult.service";
import { EvaluationResult } from "../../../core/model/EvaluationResult";
import { Eleve } from "../../../core/model/Eleve";
import Swal from "sweetalert2";
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from "../../../core/service/ConfirmLeaveGuard.service";

@Component({
  selector: 'app-pass-evaluation',
  templateUrl: './pass-evaluation.component.html',
  styleUrls: ['./pass-evaluation.component.scss']
})
export class PassEvaluationComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  evaluationId?: any;
  evaluation?: Evaluation;
  answers: Map<number, number> = new Map(); // Map<QuestionIndex, SelectedAnswerIndex>
  user?: Eleve; // Assuming you have a User model
  selectedAnswers: number[] = [];
  private submitted?: boolean = false;
  protected timer?: any; // Timer reference
  timeLeft: Date = new Date();


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

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  loadEvaluation() {
    this.evaluationService.getEvaluationById(this.evaluationId).subscribe(evaluation => {
      this.evaluation = evaluation;
      console.log(this.evaluation)
      this.initializeAnswers();
      this.startTimer(); // Start the timer when the evaluation is loaded
    });
  }

  initializeAnswers() {
    // @ts-ignore
    this.evaluation.questions.forEach((question, index) => {
      this.answers.set(index, -1);
    });
  }
  startTimer() {
    if (this.evaluation?.duration) {
      const durationInMinutes = this.getDurationInMinutes(this.evaluation.duration);
      console.log(this.getDurationInMinutes(this.evaluation.duration))
      if (durationInMinutes !== undefined) {
        const durationInMilliseconds = durationInMinutes * 60 * 1000;
        const endTime = Date.now() + durationInMilliseconds;

        this.timer = setInterval(() => {
          const currentTime = Date.now();
          this.timeLeft = new Date(Math.max(0, endTime - currentTime));
          console.log(this.timeLeft)
          if (currentTime >= endTime) {
            clearInterval(this.timer);
            this.submitEvaluationTimer() // Automatically submit the evaluation when the time limit is reached
          }
        }, 1000);
      }
    }
  }
  getDurationInMinutes(durationEnum: DurationEnum): number | undefined {
    console.log(durationEnum === DurationEnum.MINUTES_15)
    if (durationEnum === DurationEnum.MINUTES_15) {
      return 15;
    } else if (durationEnum === DurationEnum.MINUTES_30) {
      return 30;
    } else if (durationEnum === DurationEnum.MINUTES_45) {
      return 45;
    } else if (durationEnum === DurationEnum.MINUTES_60) {
      return 60;
    } else {
      return 1;
    }
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
      if (selectedAnswerIndex === null || selectedAnswerIndex === undefined) {
        return 0; // Return 0 if no answer was selected
      }
      // Ensure that question is defined
      if (question === undefined) {
        return 0;
      }

      // Ensure that selectedAnswerIndex is a valid index
      // @ts-ignore
      if (selectedAnswerIndex < 0 || selectedAnswerIndex >= question.answers.length) {
        return 0;
      }

      // @ts-ignore
      const selectedAnswer = question.answers[selectedAnswerIndex];

      // Ensure that selectedAnswer is defined
      if (selectedAnswer === undefined) {
        return 0;
      }

      if (selectedAnswer.correct) {
        score += 2;
      }
    });
    return score;
  }

  submitEvaluationTimer() {
    this.submitEvaluation('timer');
  }

  submitEvaluationManual() {
    this.submitEvaluation();
  }

  submitEvaluation(trigger?: string) {
    this.submitted = true;
    const submitAction = 'submit';
    // Check if the timer triggered the submission
    const timerTriggered = trigger === 'timer';

    // Customize the Swal message based on whether it's triggered by the timer
    let swalOptions: any = {
      title: 'Submit Evaluation',
      icon: 'question',
      confirmButtonText: `Yes, ${submitAction} it!`,
      cancelButtonText: 'Cancel'
    };

    if (timerTriggered) {
      swalOptions.text = 'The evaluation duration is over. It will be submitted automatically.';
    } else {
      swalOptions.text = 'Are you sure you want to submit this evaluation?';
      swalOptions.showCancelButton = true; // Show the cancel button for manual submission
    }

    Swal.fire(swalOptions).then((result) => {
      if (result.isConfirmed || timerTriggered) { // Automatically proceed if timer triggered
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
    if (this.submitted) {
      // Evaluation has been submitted, allow deactivation without warning
      return true;
    }

    // Evaluation has not been submitted, show warning message
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
