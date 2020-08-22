import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../../core/fetch-data.service';
import { HoldDataService } from '../../core/hold-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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

  logIn() {
    // log in user
    this.errorMessage = false;
    this.waitingInfo = true;
    const data = {
      username: this.username,
      password: this.password,
    }
    this.fetchData.logIn(JSON.stringify(data))
      .toPromise()
      .then((data) => {
        this.waitingInfo = false;
        if(data.error === true) {
          this.waitingInfo = false;
          this.errorMessage = true;
        } else{
          this.holdData.userInfo = data.userData;
          this.router.navigate(['home']);
        }
      })
      .catch(error => {
        console.error(error);
        this.waitingInfo = false;
        this.errorMessage = true;
      })
  }
}
