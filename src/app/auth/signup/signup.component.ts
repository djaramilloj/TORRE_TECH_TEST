import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetchDataService } from '../../core/fetch-data.service';
import { HoldDataService } from '../../core/hold-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username: string;
  password: string;
  errorMessage: boolean = false;
  waitingInfo: boolean = false;
  constructor(
    // services
    private fetchData: FetchDataService,
    private holdData: HoldDataService,
    // angular
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  lookForUsername () {
    // check if username exists and save data
    this.errorMessage = false;
    this.waitingInfo = true;
    const data = {
      username: this.username,
    }
    this.fetchData.signupByUsernameAndPassword(JSON.stringify(data))
      .toPromise()
      .then((data) => {
        this.holdData.userInfo = data.userData;
        this.waitingInfo = false;
        if(data.error === true) {
          this.errorMessage = true;
        } else{
          this.holdData.userId = data.userId;
          this.router.navigate(['/home']);
        }
      }).catch(error => {
        console.error(error);
        this.waitingInfo = false;
        this.errorMessage = true;
      })
  }
}
