import { Component, Inject, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
    AbstractUserListFieldComponent,
    NAE_INFORM_ABOUT_INVALID_DATA,
    SideMenuService,
    SnackBarService
} from '@netgrif/components-core';
import {MultiUserAssignComponent} from "../../side-menu/content-components/user-assign/multi-user-assign.component";

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
        this.selectAbstractUser(MultiUserAssignComponent);
    }

    public deleteUser(userId: string) {
        this.removeAbstractUser(userId);
    }
}
