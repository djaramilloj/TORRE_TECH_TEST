import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  api_url = "https://torre-back-2.herokuapp.com"
  constructor(
    private httpClient: HttpClient,
  ) { }

  signupByUsernameAndPassword(data: any): Observable<any> {
    const url = `${this.api_url}/auth/signup`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    const req = this.httpClient.post(url, data, {headers: headers, responseType: 'json'});
    return req;
  }

  getUserInfo(): Observable<any> {
    const url = `${this.api_url}/auth/userinfo`;
    const req = this.httpClient.get(url);
    return req;
  }

  addFriendByUsername(data: any): Observable<any> {
    const url = `${this.api_url}/lists/friends`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    const req = this.httpClient.post(url, data, {headers: headers, responseType: 'json'});
    return req;
  }

  getCurrentFriends(userId: string): Observable<any> {
    const url = `${this.api_url}/lists/friends/${userId}`;
    const req = this.httpClient.get(url);
    return req;
  }

  searchTopJobs(size: number){
    const url_search = `https://search.torre.co/opportunities/_search/?[offset=$offset&size=${size}&aggregate=$aggregate]`
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    const req = this.httpClient.post(url_search, {headers: headers, responseType: 'json'});
    return req;
  }

  getJobDetails(jobId: string){
    const url_search = `/api/opportunities/${jobId}`
    const req = this.httpClient.get(url_search);
    return req;
  }
}
