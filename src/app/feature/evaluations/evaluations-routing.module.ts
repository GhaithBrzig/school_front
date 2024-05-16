import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EvaluationsListComponent} from "./evaluations-list/evaluations-list.component";
import {EvaluationsFormComponent} from "./evaluations-form/evaluations-form.component";
import {EvaluationsDetailsComponent} from "./evaluations-details/evaluations-details.component";
import {PassEvaluationComponent} from "./pass-evaluation/pass-evaluation.component";
import {ConfirmLeaveGuardService} from "../../core/service/ConfirmLeaveGuard.service";
import { ClassesListComponent } from '../classes/classes-list/classes-list.component';
import { AssignevaluationtoclassComponent } from './assignevaluationtoclass/assignevaluationtoclass.component';

const routes: Routes = [
  { path: '', component: EvaluationsListComponent },
  { path: 'add', component: EvaluationsFormComponent },
  { path: ':id', component: EvaluationsDetailsComponent },
  { path: 'edit/:id', component: EvaluationsFormComponent },
  { path: 'pass/:id', component: PassEvaluationComponent, canDeactivate: [ConfirmLeaveGuardService] },
  { path: 'form/:id', component: AssignevaluationtoclassComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationsRoutingModule { }
