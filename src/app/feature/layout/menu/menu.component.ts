import { Component, OnInit } from '@angular/core';
import { Eleve } from "../../../core/model/Eleve";
import { AccountService } from "../../../core/service/account.service";
import {Role} from "../../../core/model/Role";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  model: any[] = [];
  private user: any;
  protected role: Role | undefined;
  protected roleE: Role | undefined;
  protected roleA: Role | undefined;
  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.getProfile().subscribe(
      (profile) => {
        this.user = profile as Eleve;
        this.role = this.user.roles.find((r: { roleName: string; }) => r.roleName === "enseignant");
        this.roleE = this.user.roles.find((r: { roleName: string; }) => r.roleName === "eleve");
        this.roleA = this.user.roles.find((r: { roleName: string; }) => r.roleName === "admin");
        console.log('User Profile:', this.user);
        if (this.user) {
          this.model = [
            {
              label: 'Home',
              items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home/dashboard'] }
              ]
            },
            {
              label: 'Pages',
              items: [
                { label: 'User management', icon: 'pi pi-fw pi-users', routerLink: ['/home/account/user-management'] },
                { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: ['/home/account/profile'] },
                { label: 'Evaluations', icon: 'pi pi-fw pi-book', routerLink: ['/home/evaluations'] },


              ]
            },
          ];

          // Add "Classes" menu item only for users with admin role
          if (this.roleA) {
            this.model[1].items.push({ label: 'Classes', icon: 'pi pi-fw pi-users', routerLink: ['/home/classes/claaseslist'] });
            this.model[2].items.push({ label: 'Enseignant', icon: 'pi pi-fw pi-user', routerLink: ['/home/enseignant/list'] });
            this.model[3].items.push({ label: 'Eleves', icon: 'pi pi-fw pi-user-edit', routerLink: ['/home/eleves/showEleve'] });
          }
          if (this.role) {
            this.model[1].items.push({ label: 'Classes', icon: 'pi pi-fw pi-users', routerLink: ['/home/classes/claaseslist'] });
          }
          if (this.roleE) {
            this.model[1].items.push({ label: 'Passed Evaluations', icon: 'pi pi-fw pi-users', routerLink: ['/home/evaluations/passed'] });
          }
        }
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );

  }
}
