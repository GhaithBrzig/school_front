import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { FormEleveComponent } from './formEleve/formEleve.component';
import { EleveRoutingModule } from './eleves-routing.module';
import { ListEleveComponent } from './listEleve/listEleve.component';

@NgModule({
  declarations: [FormEleveComponent,ListEleveComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    EleveRoutingModule
  ]
})
export class ElevesModule { }