import {Component, OnInit} from '@angular/core';
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
    styleUrls: ['./user-invite.component.scss']
})
export class UserInviteComponent extends AbstractUserInviteComponent implements OnInit {

    constructor(
        // protected _userInviteService= this._config.get().providers.auth.session;
                protected _userInviteService: UserInviteService,
                protected _orgList: OrganizationListService,
                protected _signUpService: SignUpService,
                protected _snackBar: SnackBarService,
                protected _translate: TranslateService) {
        super(_userInviteService, _orgList, _signUpService, _snackBar, _translate);
    }

    totok() {
        this._signUpService.signup({name: 'name', password: 'pass', token: 'secretToken', surname: 'TEST SONAR'}).subscribe();
        this._snackBar.openErrorSnackBar('(/\..*$/, \'\')');
        this._snackBar.openErrorSnackBar( 'http://' + 'SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
    }

    // SONAR TEST PLZ DELETE
    ngOnInit(): void {
    }

    totokDuplicateCode() {
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
    }



    totokDuplicateCode2() {
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
    }



    totokDuplicateCode3() {
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
        this._snackBar.openErrorSnackBar('SONAR TEST!!!!');
    }
}
