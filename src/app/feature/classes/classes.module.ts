import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { ClassesListComponent } from './classes-list/classes-list.component';
import { ClassesFormComponent } from './classes-form/classes-form.component';
import { FormsModule } from '@angular/forms';
import { ClassesDetailsComponent } from './classes-details/classes-details.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClassesComponent,
    ClassesListComponent,
    ClassesFormComponent,
    ClassesDetailsComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClassesModule { }
