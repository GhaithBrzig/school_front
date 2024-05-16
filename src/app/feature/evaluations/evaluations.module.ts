import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationsRoutingModule } from './evaluations-routing.module';
import { EvaluationsComponent } from './evaluations.component';
import { EvaluationsListComponent } from './evaluations-list/evaluations-list.component';
import { EvaluationsFormComponent } from './evaluations-form/evaluations-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EvaluationsDetailsComponent } from './evaluations-details/evaluations-details.component';
import { PassEvaluationComponent } from './pass-evaluation/pass-evaluation.component';
import { PassedEvaluationsComponent } from './passed-evaluations/passed-evaluations.component';


@NgModule({
  declarations: [
    EvaluationsComponent,
    EvaluationsListComponent,
    EvaluationsFormComponent,
    EvaluationsDetailsComponent,
    PassEvaluationComponent,
    PassedEvaluationsComponent
  ],
  imports: [
    CommonModule,
    EvaluationsRoutingModule,
    ReactiveFormsModule
  ]
})
export class EvaluationsModule { }
