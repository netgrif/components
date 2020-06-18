import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserComparatorService {

  constructor(private _userService: UserService) { }

  public compareUsers(user: User): boolean {
      return user.email === this._userService.user.email;
  }
}
