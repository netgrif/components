import {Component} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {DATE_FORMAT, AbstractSearchModeComponent, SideMenuService} from '@netgrif/application-engine';
import {UserAssignComponent} from '../../../side-menu/content-components/user-assign/user-assign.component';

@Component({
    selector: 'nc-search-mode',
    templateUrl: './search-mode.component.html',
    styleUrls: ['./search-mode.component.scss'],
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ]
})
export class SearchModeComponent extends AbstractSearchModeComponent {

    constructor(protected _sideMenuService: SideMenuService) {
        super(_sideMenuService);
    }

    public selectUser(column: number): void {
        this.selectAbstractUser(column, UserAssignComponent);
    }
}
