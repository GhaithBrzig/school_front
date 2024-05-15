import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import Swal from "sweetalert2";
import { EvaluationService } from "../../../core/service/evaluation.service";
import { AccountService } from "../../../core/service/account.service";
import { User } from "../../../core/model/User";
import { Enseignant } from "../../../core/model/Enseignant";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-evaluations-form',
  templateUrl: './evaluations-form.component.html',
  styleUrls: ['./evaluations-form.component.scss']
})
export class EvaluationsFormComponent implements OnInit {
  evaluationForm?: FormGroup;
  user?: Enseignant;
  isEdit: boolean = false;
  evaluationId: any;

  constructor(private fb: FormBuilder, private evaluationService: EvaluationService, private accountService: AccountService, private route: ActivatedRoute,
  private router:Router) { }

  ngOnInit(): void {
    this.accountService.getProfile().subscribe(
      (profile) => {
        this.user = profile;
        console.log('User Profile:', this.user);
        this.createForm();
        this.checkRouteParameters();
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  checkRouteParameters() {
    this.route.paramMap.subscribe(params => {
      this.evaluationId = params.get('id');
      if (this.evaluationId) {
        this.isEdit = true;
        this.loadEvaluationForEdit(this.evaluationId);
      }
    });
  }

  loadEvaluationForEdit(evaluationId: number) {
    this.evaluationService.getEvaluationById(evaluationId).subscribe(
      (evaluation) => {
        // Patch the form values with the fetched evaluation data
        this.evaluationForm?.patchValue({
          nom: evaluation.nom,
          enseignant: this.user // Assuming this.user contains the current user's information
        });

        // Clear existing questions
        while (this.questions.length !== 0) {
          this.questions.removeAt(0);
        }

        // Add questions from the fetched evaluation
        // @ts-ignore
        evaluation.questions.forEach(question => {
          const questionFormGroup = this.fb.group({
            text: [question.text, Validators.required],
            answers: this.fb.array([])
          });
          const answersFormArray = questionFormGroup.get('answers') as FormArray;
          // @ts-ignore
          question.answers.forEach(answer => {
            answersFormArray.push(this.fb.group({
              text: [answer.text, Validators.required],
              correct: [answer.correct, Validators.required]
            }));
          });
          this.questions.push(questionFormGroup);
        });
      },
      (error) => {
        console.error('Error fetching evaluation for edit:', error);
      }
    );
  }

  createForm() {
    this.evaluationForm = this.fb.group({
      nom: ['', Validators.required],
      enseignant: [this.user], // Assuming this.user contains the current user's information
      questions: this.fb.array([])
    });
  }

  get questions(): FormArray {
    // @ts-ignore
    return this.evaluationForm.get('questions') as FormArray;
  }

  addQuestion() {
    const question = this.fb.group({
      text: ['', Validators.required],
      answers: this.fb.array([
        this.createAnswer(),
        this.createAnswer(),
        this.createAnswer(),
        this.createAnswer()
      ])
    });
    this.questions.push(question);
  }

  createAnswer() {
    return this.fb.group({
      text: ['', Validators.required],
      correct: [false, Validators.required]
    });
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  onSubmit() {
    if (this.evaluationForm?.valid) {
      console.log(this.evaluationForm.value.enseignant);
      const submitAction = this.isEdit ? 'update' : 'create';
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to ${submitAction} this evaluation?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `Yes, ${submitAction} it!`,
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {

          const observable = this.isEdit ?
            this.evaluationService.updateEvaluation(this.evaluationId!, this.evaluationForm?.value) :
            this.evaluationService.createEvaluation(this.evaluationForm?.value);
          this.router.navigate(['/home/evaluations']); // Navigate to a new route
          observable.subscribe(
            () => {
              Swal.fire(
                'Success!',
                `Evaluation ${submitAction}d successfully.`,
                'success'
              );
              this.evaluationForm?.reset();
              this.isEdit = false;
              this.evaluationId = null;

            },
            (error) => {
              if (error instanceof HttpErrorResponse) {
                // Ignore the error, as it might be due to the expected non-JSON response
                Swal.fire(
                  'Success!',
                  `Evaluation ${submitAction}d successfully.`,
                  'success'
                );
                this.evaluationForm?.reset();
                this.isEdit = false;
                this.evaluationId = null;
              } else {
                // Handle other errors
                Swal.fire(
                  'Error!',
                  `Failed to ${submitAction} evaluation.`,
                  'error'
                );
              }
            }
          );
        }
      });
    } else {
      Swal.fire(
        'Validation Error!',
        'Please fill out all required fields.',
        'error'
      );
    }
  }

  getAnswersControls(questionIndex: number): AbstractControl[] {
    // @ts-ignore
    return (this.evaluationForm.get('questions').at(questionIndex).get('answers') as FormArray).controls;
  }

}
