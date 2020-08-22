import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HoldDataService {
  userInfo: any;
  userId: string;

  constructor() { }
}
