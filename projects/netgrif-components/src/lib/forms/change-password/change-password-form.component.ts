import {Component, Inject, OnDestroy, Optional} from "@angular/core";
import {
    AbstractChangePasswordComponent,
    ProfileService,
    UserService,
    LoggerService,
    SnackBarService,
    NAE_MIN_PASSWORD_LENGTH
} from '@netgrif/components-core';
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

    constructor(formBuilder: FormBuilder,
                profileService: ProfileService,
                user: UserService,
                log: LoggerService,
                translate: TranslateService,
                @Optional() @Inject(NAE_MIN_PASSWORD_LENGTH) minPasswordLength,
                protected _snackbar: SnackBarService) {
        super(formBuilder, profileService, user, log, translate, minPasswordLength);
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
