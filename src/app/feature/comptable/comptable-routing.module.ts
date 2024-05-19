import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComptableformComponent } from './comptableform/comptableform.component';
import { ComptableListComponent } from './comptableList/comptableList.component';
import { ValidatePhotoComponent } from './validatePhoto/validatePhoto.component';


const routes: Routes = [
  {path:'addComptable',component:ComptableformComponent},
  {path:'listComptable',component:ComptableListComponent},

  {path:'validerDoc/:id',component:ValidatePhotoComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComptableRoutingModule { }
