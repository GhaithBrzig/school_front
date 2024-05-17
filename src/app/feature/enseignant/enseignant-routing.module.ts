import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnseignantFormComponent } from './EnseignantForm/EnseignantForm.component';
import {ListEnseignantComponent} from "./list-enseignant/list-enseignant.component";


const routes: Routes = [
  {path:'addEnseignant',component:EnseignantFormComponent},
  {path:'list',component:ListEnseignantComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantRoutingModule { }
