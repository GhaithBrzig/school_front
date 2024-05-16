import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnseignantFormComponent } from './EnseignantForm/EnseignantForm.component';
import { ListFormEnseignantComponent } from './ListFormEnseignant/ListFormEnseignant.component';
import { AssignEnseignantToClassComponent } from './AssignEnseignantToClass/AssignEnseignantToClass.component';


const routes: Routes = [
  {path:'addEnseignant',component:EnseignantFormComponent},
  {path:'listEnseignant',component:ListFormEnseignantComponent},
  { path: 'assignEnseignant/:id', component: AssignEnseignantToClassComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantRoutingModule { }
