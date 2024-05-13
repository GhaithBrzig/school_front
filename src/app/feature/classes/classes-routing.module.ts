import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes.component';
import { ClassesListComponent } from './classes-list/classes-list.component';
import { ClassesFormComponent } from './classes-form/classes-form.component';

const routes: Routes = [
  { path: '', component: ClassesComponent },
  { path: 'claaseslist', component: ClassesListComponent },
  { path: 'claasesform', component: ClassesFormComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
