import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEleveComponent } from './formEleve/formEleve.component';
import { ListEleveComponent } from './listEleve/listEleve.component';

const routes: Routes = [
  {path:'addEleve',component:FormEleveComponent},
  {path:'showEleve',component:ListEleveComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EleveRoutingModule { }
