import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { ComptableformComponent } from './comptableform/comptableform.component';
import { ComptableListComponent } from './comptableList/comptableList.component';
import { ValidatePhotoComponent } from './validatePhoto/validatePhoto.component';
import { ComptableRoutingModule } from './comptable-routing.module';


@NgModule({
  declarations: [ComptableformComponent,ComptableListComponent,ValidatePhotoComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ComptableRoutingModule,
    ReactiveFormsModule
  ]
})
export class ComptableModule { }