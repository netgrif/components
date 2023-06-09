import {Component, Inject, Optional} from '@angular/core';
import {AbstractUserFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA, SideMenuService, SnackBarService} from '@netgrif/components-core';
import {UserAssignComponent} from '../../side-menu/content-components/user-assign/user-assign.component';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'nc-user-field',
    templateUrl: './user-field.component.html',
    styleUrls: ['./user-field.component.scss']
})
export class UserFieldComponent extends AbstractUserFieldComponent {

    constructor(dialog: MatDialog,
                snackbar: SnackBarService,
                translate: TranslateService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(dialog, snackbar, translate, informAboutInvalidData);
    }

    public selectUser() {
        this.selectAbstractUser(UserAssignComponent);
    }
}
