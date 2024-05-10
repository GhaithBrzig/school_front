import {Component, OnInit} from '@angular/core';
import {User} from "../../../core/model/User";
import {AccountService} from "../../../core/service/account.service";
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {AuthenticationService} from "../../../core/service/authentication.service";

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss'],
  providers: [MessageService]
})
export class UsermanagementComponent implements OnInit {

  userList: User[] = [];
  displayEnableUserDialog = false;
  displayDisableUserDialog = false;
  userId!: number;
  newUser:User={};
  newUserRole!:string;
  option!: string[];
  displayNewUserDialog = false;
  submitted = false;
  message!:string;
  constructor(private accountService: AccountService, private authenticationService:AuthenticationService,public messageService: MessageService) {
    this.option = ['ADMIN','STUDENT','PARENT','TEACHER'];
  }

  ngOnInit(): void {
    this.listUserAccounts();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  listUserAccounts() {
    this.accountService.listUserAccounts().subscribe({
      next: (users) => {
        this.userList = users.reverse();
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }

  addUser() {
    this.displayNewUserDialog = true;
    this.newUser = {};
    this.submitted = false;
    this.newUserRole = '';
  }

  enableAccount(userId: number) {
    this.userId = userId;
    this.displayEnableUserDialog = true;
  }

  disableAccount(userId: number) {
    this.userId = userId;
    this.displayDisableUserDialog = true;
  }

  confirmEnableAccount() {
    this.accountService.enableAccount(this.userId).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.listUserAccounts()
        this.displayEnableUserDialog=false;
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
        this.displayEnableUserDialog=false;
      }
    })
  }

  confirmDisableAccount() {
    this.accountService.disableAccount(this.userId).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: data, life: 3000});
        this.listUserAccounts();
        this.displayDisableUserDialog=false;
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
        this.displayDisableUserDialog=false;
      }
    })
  }

  addNewUser() {
    this.submitted=true;
    if(this.newUser.userName && this.newUser.firstName && this.newUser.lastName && this.newUser.emailAddress
    && this.newUser.password && this.newUserRole){
      this.authenticationService.register(this.newUser,this.newUserRole).subscribe({
        next:(data)=>{
            this.listUserAccounts();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: data , life: 3000 });
            this.displayNewUserDialog=false;
        },
        error:(err)=>{
          const errObject = JSON.parse(err.error);
          this.message = errObject.message;
          this.messageService.add({severity: 'error', summary: 'Error', detail: this.message, life: 3000});
          this.displayNewUserDialog = false;
        }
      });
    }
  }
}
