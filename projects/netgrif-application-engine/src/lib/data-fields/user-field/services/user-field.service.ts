import {Injectable} from '@angular/core';
import {UserValue} from '../models/user-value';
import {SnackBarHorizontalPosition, SnackBarService, SnackBarVerticalPosition} from '../../../snack-bar/snack-bar.service';
import {SideMenuService} from '../../../side-menu/services/side-menu.service';
import {UserField} from '../models/user-field';

@Injectable()
export class UserFieldService {

    public assignedUser: UserField;

    constructor(private _snackBarService: SnackBarService, private _sideMenuService: SideMenuService) {
    }

    public assignUser(user: UserValue) {
        // TODO: Assign user
        if (user !== undefined) {
            this.assignedUser.value = user;
            this._sideMenuService.close();
            this._snackBarService.openInfoSnackBar('User ' + user.fullName + ' was assigned',
                SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 3000);
        } else {
            this._snackBarService.openWarningSnackBar('No user selected',
                SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.RIGHT, 3000);
        }
    }

}
