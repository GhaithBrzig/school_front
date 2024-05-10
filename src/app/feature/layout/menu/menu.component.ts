import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  model: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.model = [
      {
        label: 'Home',
        items: [
          {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home/dashboard']}
        ]
      },
      {
        label: 'Pages',
        items: [
          {label: 'User management', icon: 'pi pi-fw pi-users', routerLink: ['/home/account/user-management']},
          {label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: ['/home/account/profile']}
        ]
      },
    ];
  }
}
