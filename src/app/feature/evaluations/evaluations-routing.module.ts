import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EvaluationsListComponent} from "./evaluations-list/evaluations-list.component";
import {EvaluationsFormComponent} from "./evaluations-form/evaluations-form.component";
import {EvaluationsDetailsComponent} from "./evaluations-details/evaluations-details.component";
import {PassEvaluationComponent} from "./pass-evaluation/pass-evaluation.component";
import {ConfirmLeaveGuardService} from "../../core/service/ConfirmLeaveGuard.service";
import {PassedEvaluationsComponent} from "./passed-evaluations/passed-evaluations.component";

const routes: Routes = [
  { path: '', component: EvaluationsListComponent },
  { path: 'add', component: EvaluationsFormComponent },
  { path: 'details/:id', component: EvaluationsDetailsComponent },
  { path: 'passed', component: PassedEvaluationsComponent },
  { path: 'edit/:id', component: EvaluationsFormComponent },
  { path: 'pass/:id', component: PassEvaluationComponent, canDeactivate: [ConfirmLeaveGuardService] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationsRoutingModule { }
