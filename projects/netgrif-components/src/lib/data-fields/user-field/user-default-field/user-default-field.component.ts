import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {
    DATA_FIELD_PORTAL_DATA,
    SideMenuService,
    SnackBarService,
    DataFieldPortalData,
    UserField,
    AbstractUserDefaultFieldComponent
} from '@netgrif/components-core';
import {UserAssignComponent} from "../../../side-menu/content-components/user-assign/user-assign.component";

@Component({
  selector: 'nc-user-default-field',
  templateUrl: './user-default-field.component.html',
  styleUrls: ['./user-default-field.component.scss']
})
export class UserDefaultFieldComponent extends AbstractUserDefaultFieldComponent {

    constructor(sideMenuService: SideMenuService,
                snackbar: SnackBarService,
                translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<UserField>) {
        super(sideMenuService, snackbar, translate, dataFieldPortalData);
    }

    public selectUser() {
        super.selectAbstractUser(UserAssignComponent);
    }

}
