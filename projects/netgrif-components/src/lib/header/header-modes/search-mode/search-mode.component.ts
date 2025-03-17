import {Component} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {AbstractSearchModeComponent, DATE_FORMAT} from '@netgrif/components-core';
import {UserAssignDialogComponent} from '../../../dialog/user-assign-dialog/user-assign-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'nc-search-mode',
    templateUrl: './search-mode.component.html',
    styleUrls: ['./search-mode.component.scss'],
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ],
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
