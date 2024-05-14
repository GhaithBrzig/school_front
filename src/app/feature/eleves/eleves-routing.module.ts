import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEleveComponent } from './formEleve/formEleve.component';

const routes: Routes = [
  {path:'test',component:FormEleveComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EleveRoutingModule { }
