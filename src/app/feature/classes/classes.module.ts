import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { ClassesListComponent } from './classes-list/classes-list.component';
import { ClassesFormComponent } from './classes-form/classes-form.component';


@NgModule({
  declarations: [
    ClassesComponent,
    ClassesListComponent,
    ClassesFormComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule
  ]
})
export class ClassesModule { }
