import {Component, OnDestroy} from "@angular/core";
import {
    AbstractChangePasswordComponent,
    ProfileService,
    UserService,
    LoggerService,
    SnackBarService,
} from "netgrif-components-core";
import {FormBuilder} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";

@Component({
    selector: 'nc-change-password-form',
    templateUrl: './change-password-form.component.html',
    styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent extends AbstractChangePasswordComponent implements OnDestroy {

    public streamChangePassword: Subscription;

    constructor(profileService: ProfileService,
                user: UserService,
                formBuilder: FormBuilder,
                log: LoggerService,
                translate: TranslateService,
                protected _snackbar: SnackBarService,) {
        super(profileService, user, formBuilder, log, translate);
        this.streamChangePassword = this.changePassword.subscribe(message => {
            if (message.success) {
                this._snackbar.openSuccessSnackBar(message.success);
            } else {
                this._snackbar.openErrorSnackBar(message.error);
            }
        });
    }


    ngOnDestroy(): void {
        this.streamChangePassword.unsubscribe();
    }

}
