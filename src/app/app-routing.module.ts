import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./feature/layout/layout/layout.component";

const routes: Routes = [
  {path:'', loadChildren:()=> import('./feature/authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path:'home', component: LayoutComponent, children: [
      {path:'dashboard',loadChildren:()=>import('./feature/dashboard/dashboard.module').then(m=>m.DashboardModule)},
      {path:'git init',loadChildren:()=>import('./feature/accountmanagement/accountmanagement.module').then(m=>m.AccountmanagementModule)},
      { path: 'classes', loadChildren: () => import('./feature/classes/classes.module').then(m => m.ClassesModule) },
      { path: 'evaluations', loadChildren: () => import('./feature/evaluations/evaluations.module').then(m => m.EvaluationsModule) },
      { path: 'eleves', loadChildren: () => import('./feature/eleves/eleves.module').then(m => m.ElevesModule) },
      { path: 'enseignant', loadChildren: () => import('./feature/enseignant/enseignant.module').then(m => m.EnseignantModule) },
      { path: 'parent', loadChildren: () => import('./feature/parent/parent.module').then(m => m.ParentModule) }

    ]},
 



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
