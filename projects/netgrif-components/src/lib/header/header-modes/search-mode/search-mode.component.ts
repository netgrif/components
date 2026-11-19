import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {AbstractSearchModeComponent, DATE_TIME_FORMAT, SideMenuService} from '@netgrif/components-core';
import {UserAssignDialogComponent} from '../../../dialog/user-assign-dialog/user-assign-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'nc-search-mode',
    templateUrl: './search-mode.component.html',
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SearchModeComponent extends AbstractSearchModeComponent {

    constructor(protected _dialog: MatDialog) {
        super(_dialog);
    }

    public selectUser(column: number): void {
        this.selectAbstractUser(column, UserAssignDialogComponent);
    }

    public setValue() {
        this.approvalFormControl.setValue(true);
    }
}
