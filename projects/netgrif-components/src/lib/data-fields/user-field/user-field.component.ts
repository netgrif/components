import {Component, Inject, Optional} from '@angular/core';
import {AbstractUserFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA, SideMenuService, SnackBarService} from '@netgrif/application-engine';
import {UserAssignComponent} from '../../side-menu/content-components/user-assign/user-assign.component';

@Component({
    selector: 'nc-user-field',
    templateUrl: './user-field.component.html',
    styleUrls: ['./user-field.component.scss']
})
export class UserFieldComponent extends AbstractUserFieldComponent {

    constructor(sideMenuService: SideMenuService,
                snackbar: SnackBarService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(sideMenuService, snackbar, informAboutInvalidData);
    }

    public selectUser() {
        this.selectAbstractUser(UserAssignComponent);
    }
}
