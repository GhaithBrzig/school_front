import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { ParentRoutingModule } from './parent-routing.module';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { ParentListComponent } from './parent-list/parent-list.component';
import { AssignEnfentToParentComponent } from './AssignEnfentToParent/AssignEnfentToParent.component';

@NgModule({
  declarations: [ParentFormComponent,ParentListComponent,AssignEnfentToParentComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ParentRoutingModule,
    ReactiveFormsModule
  ]
})
export class ParentModule { }