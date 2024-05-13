import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./feature/layout/layout/layout.component";
import { ElevesFormsComponent } from './feature/eleves/eleves-forms/eleves-forms.component';

const routes: Routes = [
  {path:'', loadChildren:()=> import('./feature/authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path:'home', component: LayoutComponent, children: [
      {path:'dashboard',loadChildren:()=>import('./feature/dashboard/dashboard.module').then(m=>m.DashboardModule)},
      {path:'git init',loadChildren:()=>import('./feature/accountmanagement/accountmanagement.module').then(m=>m.AccountmanagementModule)},
    ]},
  { path: 'classes', loadChildren: () => import('./feature/classes/classes.module').then(m => m.ClassesModule) },
  { path: 'form', component: ElevesFormsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
