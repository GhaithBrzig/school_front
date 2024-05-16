import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import {EnseignantRoutingModule } from './enseignant-routing.module';
import { EnseignantFormComponent } from './EnseignantForm/EnseignantForm.component';
import { ListFormEnseignantComponent } from './ListFormEnseignant/ListFormEnseignant.component';
import { AssignEnseignantToClassComponent } from './AssignEnseignantToClass/AssignEnseignantToClass.component';

@NgModule({
  declarations: [EnseignantFormComponent,ListFormEnseignantComponent,AssignEnseignantToClassComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    EnseignantRoutingModule
  ]
})
export class EnseignantModule { }