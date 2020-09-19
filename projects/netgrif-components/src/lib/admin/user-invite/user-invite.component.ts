import {Component} from '@angular/core';
import {
    UserInviteService,
    OrganizationListService,
    AbstractUserInviteComponent,
    SignUpService,
    SnackBarService
} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-user-invite',
    templateUrl: './user-invite.component.html',
    styleUrls: ['./user-invite.component.scss']
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
