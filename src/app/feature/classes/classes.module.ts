import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { ClassesListComponent } from './classes-list/classes-list.component';
import { ClassesFormComponent } from './classes-form/classes-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassesDetailsComponent } from './class-details/class-details.component';
import { AssignEvaComponent } from './assignEva/assignEva.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ClassesComponent,
    ClassesListComponent,
    ClassesFormComponent,
    ClassesDetailsComponent,
    AssignEvaComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ]
})
export class ClassesModule { }
