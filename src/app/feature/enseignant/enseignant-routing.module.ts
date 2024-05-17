import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnseignantFormComponent } from './EnseignantForm/EnseignantForm.component';
import { EnseignantListComponent } from './EnseignantList/EnseignantList.component';
import { AssignEnseignantToClassComponent } from './AssignEnseignantToClass/AssignEnseignantToClass.component';


const routes: Routes = [
  {path:'addEnseignant',component:EnseignantFormComponent},
  {path:'ListEnseignant',component:EnseignantListComponent},
  { path: 'assignEnseignant/:id', component: AssignEnseignantToClassComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantRoutingModule { }
