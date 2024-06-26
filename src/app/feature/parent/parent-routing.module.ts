import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { ParentListComponent } from './parent-list/parent-list.component';
import { AssignEnfentToParentComponent } from './AssignEnfentToParent/AssignEnfentToParent.component';
import { PhotoUploadComponent } from './photoUpload/photoUpload.component';


const routes: Routes = [
  {path:'addParent',component:ParentFormComponent},
  {path:'listParent',component:ParentListComponent},
  {path:'assignParent/:id',component:AssignEnfentToParentComponent},
  {path:'photo-upload/:parentId',component:PhotoUploadComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
