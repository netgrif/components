import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {IUser} from '../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserComparatorService {

  constructor(private _userService: UserService) { }

  public compareUsers(user: IUser): boolean {
      return user.email === this._userService.user.email ||
          user.email.includes('anonymous') && this._userService.user.email.includes('anonymous');
  }
}
