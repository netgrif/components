import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogErrorsData {
    errors: Array<string>;
    warnings: Array<string>;
    info: Array<string>;
}

@Component({
    selector: 'nc-builder-dialog-errors',
    templateUrl: './dialog-errors.component.html',
    styleUrls: ['./dialog-errors.component.scss']
})
export class DialogErrorsComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogErrorsData) {
    }
}
