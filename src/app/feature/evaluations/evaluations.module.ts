import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationsRoutingModule } from './evaluations-routing.module';
import { EvaluationsComponent } from './evaluations.component';
import { EvaluationsListComponent } from './evaluations-list/evaluations-list.component';
import { EvaluationsFormComponent } from './evaluations-form/evaluations-form.component';


@NgModule({
  declarations: [
    EvaluationsComponent,
    EvaluationsListComponent,
    EvaluationsFormComponent
  ],
  imports: [
    CommonModule,
    EvaluationsRoutingModule
  ]
})
export class EvaluationsModule { }
