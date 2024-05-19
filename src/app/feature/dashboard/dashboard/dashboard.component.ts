import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/model/User';
import { AccountService } from 'src/app/core/service/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
user!:any
  constructor(private accout :AccountService) { }

  ngOnInit(): void {
    this.accout.getProfile().subscribe(
      (profile) => {
        this.user = profile;
        console.log('User Profile:', this.user);
      }
      )
    

  }

}
