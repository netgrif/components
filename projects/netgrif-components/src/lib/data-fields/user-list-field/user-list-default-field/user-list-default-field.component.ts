import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractUserListDefaultFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    SideMenuService,
    SnackBarService,
    UserListField
} from "@netgrif/components-core";
import {TranslateService} from "@ngx-translate/core";
import {
    MultiUserAssignComponent
} from "../../../side-menu/content-components/multi-user-assign/multi-user-assign.component";

@Component({
  selector: 'nc-user-list-default-field',
  templateUrl: './user-list-default-field.component.html',
  styleUrls: ['./user-list-default-field.component.scss']
})
export class UserListDefaultFieldComponent extends AbstractUserListDefaultFieldComponent{

    constructor(sideMenuService: SideMenuService,
                snackbar: SnackBarService,
                translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<UserListField>) {
        super(sideMenuService, snackbar, translate, dataFieldPortalData);
    }

    public selectUser() {
        this.selectAbstractUser(MultiUserAssignComponent);
    }

    public deleteUser(userId: string) {
        this.removeAbstractUser(userId);
    }

}
