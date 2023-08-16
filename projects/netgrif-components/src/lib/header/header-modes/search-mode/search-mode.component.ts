import {Component} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {AbstractSearchModeComponent, DATE_FORMAT, DATE_TIME_FORMAT, SideMenuService} from '@netgrif/components-core';
import {UserAssignComponent} from '../../../side-menu/content-components/user-assign/user-assign.component';
import {NGX_MAT_DATE_FORMATS} from '@angular-material-components/datetime-picker';

@Component({
    selector: 'nc-search-mode',
    templateUrl: './search-mode.component.html',
    styleUrls: ['./search-mode.component.scss'],
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT},
        {provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ]
})
export class SearchModeComponent extends AbstractSearchModeComponent {

    constructor(protected _sideMenuService: SideMenuService) {
        super(_sideMenuService);
    }

    public selectUser(column: number): void {
        this.selectAbstractUser(column, UserAssignComponent);
    }

    public setValue() {
        this.approvalFormControl.setValue(true);
    }
}
