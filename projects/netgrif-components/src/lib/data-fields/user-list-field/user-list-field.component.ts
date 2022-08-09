import { Component, Inject, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserAssignComponent } from '../../side-menu/content-components/user-assign/user-assign.component';
import {
    AbstractUserListFieldComponent,
    NAE_INFORM_ABOUT_INVALID_DATA,
    SideMenuService,
    SnackBarService
} from '@netgrif/components-core';

@Component({
  selector: 'nc-user-list-field',
  templateUrl: './user-list-field.component.html',
  styleUrls: ['./user-list-field.component.scss']
})
export class UserListFieldComponent extends AbstractUserListFieldComponent {

    constructor(sideMenuService: SideMenuService,
                snackbar: SnackBarService,
                translate: TranslateService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(sideMenuService, snackbar, translate, informAboutInvalidData);
    }

    public selectUser() {
        this.selectAbstractUser(UserAssignComponent);
    }

    public deleteUser(userId: string) {
        this.removeAbstractUser(userId);
    }
}
