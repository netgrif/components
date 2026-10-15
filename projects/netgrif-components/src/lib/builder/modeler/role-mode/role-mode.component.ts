import {ComponentType} from '@angular/cdk/overlay';
import {Component} from '@angular/core';
import {RoleDetailComponent} from './role-detail/role-detail.component';
import {RoleMasterDetailService} from './role-master-detail.service';
import {RoleMasterItemComponent} from './role-master-item/role-master-item.component';
import {BuilderModeService} from "../../services/builder-mode.service";

@Component({
    selector: 'nc-builder-role-mode',
    templateUrl: './role-mode.component.html',
    styleUrls: ['./role-mode.component.scss']
})
export class RoleModeComponent {

    constructor(protected _masterService: RoleMasterDetailService, protected _builderModeService: BuilderModeService) {
    }

    get detailComponent(): ComponentType<any> {
        return RoleDetailComponent;
    }

    get masterItemComponent(): ComponentType<any> {
        return RoleMasterItemComponent;
    }

    get masterService(): RoleMasterDetailService {
        return this._masterService;
    }
}
