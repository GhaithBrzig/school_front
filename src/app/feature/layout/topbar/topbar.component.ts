import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LayoutService} from "../../../core/service/layout.service";
import {AuthenticationService} from "../../../core/service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {


  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService, private authenticationService: AuthenticationService, private router:Router) {

  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout().subscribe({
      next:(response) => {
          localStorage.clear();
          this.router.navigate(['']);
      },
      error:(err) => {
        localStorage.clear();
        this.router.navigate(['']);
      }
    });
  }
}
