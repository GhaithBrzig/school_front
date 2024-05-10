import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsermanagementComponent} from "./usermanagement/usermanagement.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: 'user-management', component: UsermanagementComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountmanagementRoutingModule {
}
