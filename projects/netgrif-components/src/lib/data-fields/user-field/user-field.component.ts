import {Component} from '@angular/core';
import {SnackBarService, SideMenuService, AbstractUserFieldComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-user-field',
    templateUrl: './user-field.component.html',
    styleUrls: ['./user-field.component.scss']
})
export class UserFieldComponent extends AbstractUserFieldComponent {

    constructor(protected _sideMenuService: SideMenuService,
                protected _snackbar: SnackBarService) {
        super(_sideMenuService, _snackbar);
    }

    public selectUser() {
        this.selectAbstractUser('UserAssignComponent');
    }
}
