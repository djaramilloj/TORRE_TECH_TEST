import { Component, OnInit } from '@angular/core';
import { HoldDataService } from '../../core/hold-data.service';
import { FetchDataService } from '../../core/fetch-data.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  username: string;
  errorMessage: boolean = false;
  friendsList:Array<any> = [];
  constructor(
    // services
    private holdData: HoldDataService,
    private fetchData: FetchDataService,
  ) { }

  ngOnInit(): void {
    this.getCurrentFriends();
  }

  getCurrentFriends() {
    // get current friends
    const userId: string = '4Qef9DFPREjXIXGLUchL'
    this.fetchData.getCurrentFriends(userId)
      .toPromise()
      .then((data) => {
        if(data.error === true) {
          alert('failed to load friends');
        } else{
          this.friendsList = data.friends;
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  addFriend() {
    // add friends from Torre
    const data = {
      username: this.username,
      userId: this.holdData.userId || this.holdData.userInfo.userId
    }
    console.log(data);
    
    this.fetchData.addFriendByUsername(JSON.stringify(data))
      .toPromise()
      .then((data) => {
        if(data.error === true) {
          this.errorMessage = true;
        } else{
          console.log(data.friend);
          
          this.friendsList.push(data.friend);
        }
      })
      .catch(error => {
        console.error(error);
      })
  }
}
