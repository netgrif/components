import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {IUser} from '../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserComparatorService {

  constructor(private _userService: UserService) { }

  public compareUsers(user: IUser, acceptImpersonator: boolean = true): boolean {
      const loggedUser = acceptImpersonator ? this._userService.user.getSelfOrImpersonated() : this._userService.user;
      return user.email === loggedUser.email ||
          user.email.includes('anonymous') && this._userService.user.email.includes('anonymous');
  }
}
