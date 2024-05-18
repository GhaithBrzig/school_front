import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { ComptableRoutingModule } from './parent-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ComptableRoutingModule,
    ReactiveFormsModule
  ]
})
export class ComptableModule { }