import {Component} from '@angular/core';
import {
    AbstractUserInviteComponent,
    OrganizationListService,
    SignUpService,
    SnackBarService,
    UserInviteService
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-user-invite',
    templateUrl: './user-invite.component.html',
    styleUrls: ['./user-invite.component.scss'],
    standalone: false
})
export class UserInviteComponent extends AbstractUserInviteComponent {

    constructor(protected _userInviteService: UserInviteService,
                protected _orgList: OrganizationListService,
                protected _signUpService: SignUpService,
                protected _snackBar: SnackBarService,
                protected _translate: TranslateService) {
        super(_userInviteService, _orgList, _signUpService, _snackBar, _translate);
    }

}
