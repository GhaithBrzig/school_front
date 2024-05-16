import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes.component';
import { ClassesListComponent } from './classes-list/classes-list.component';
import { ClassesFormComponent } from './classes-form/classes-form.component';
import { ClassesDetailsComponent } from './classes-details/classes-details.component';

const routes: Routes = [
  { path: 'claaseslist', component: ClassesListComponent },
  { path: 'claasesform', component: ClassesFormComponent },
  { path: 'edit/:id', component: ClassesDetailsComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
