import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {AccountService} from "../../../core/service/account.service";
import {User} from "../../../core/model/User";
import {ChangePasswordDto} from "../../../core/model/ChangePasswordDto";
import {UpdateProfileDto} from "../../../core/model/UpdateProfileDto";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {

  profile: User = {};
  changePasswordDialog=false;
  changePasswordDto:ChangePasswordDto={};
  updateProfileDto:UpdateProfileDto={};
  submitted=false;
  message!:string;
  editProfileDialog=false;
  constructor(private messageService: MessageService, private accountService: AccountService) {
    this.getProfile();
  }

  ngOnInit(): void {
  }

  getProfile() {
    this.accountService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }

  changePassword() {
    this.submitted = true;
    if(this.changePasswordDto.newPassword && this.changePasswordDto.confirmation){
      this.accountService.changePassword(this.changePasswordDto).subscribe({
        next:(data)=>{
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: data , life: 3000 });
          this.changePasswordDialog=false;
        },
        error:(err)=>{
          const errObject = JSON.parse(err.error);
          this.message = errObject.message;
          this.messageService.add({severity: 'error', summary: 'Error', detail: this.message, life: 3000});
          this.changePasswordDialog = false;
        }
      });
    }
  }

  updateProfile() {
    this.submitted = true;
    if(this.updateProfileDto.firstName && this.updateProfileDto.lastName){
      this.accountService.updateProfile(this.updateProfileDto).subscribe({
        next:(data)=>{
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: data , life: 3000 });
          this.getProfile();
          this.editProfileDialog=false;
        },
        error:(err)=>{
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
          this.editProfileDialog = false;
        }
      });
    }
  }
}
