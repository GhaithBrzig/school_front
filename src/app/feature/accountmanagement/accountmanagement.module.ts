import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountmanagementRoutingModule } from './accountmanagement-routing.module';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";
import {DropdownModule} from "primeng/dropdown";
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    UsermanagementComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AccountmanagementRoutingModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    TableModule,
    InputTextModule,
    DialogModule,
    FormsModule,
    InputMaskModule,
    DropdownModule
  ]
})
export class AccountmanagementModule { }
