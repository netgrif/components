import {Injectable} from '@angular/core';
import {IdentityService} from './identity.service';
import {IIdentity} from '../models/iidentity';

@Injectable({
  providedIn: 'root'
})
export class UserComparatorService {

  constructor(private _userService: IdentityService) { }

  public compareUsers(user: IIdentity, acceptImpersonator: boolean = true): boolean {
      const loggedUser = acceptImpersonator ? this._userService.identity.getSelfOrImpersonated() : this._userService.identity;
      return user.username === loggedUser.username ||
          user.username.includes('anonymous') && this._userService.identity.username.includes('anonymous');
  }
}
