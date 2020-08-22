import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HoldDataService } from '../../core/hold-data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;
  constructor(
    // services
    private holdData: HoldDataService,
    // angular
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.holdData.userInfo;
  }

  friendsList() {
    this.router.navigate(['lists/friends']);
  }

  opportunitiesList() {
    this.router.navigate(['lists/opportunities']);
  }

  logOut() {
    this.router.navigate(['auth/login']);
  }

}
