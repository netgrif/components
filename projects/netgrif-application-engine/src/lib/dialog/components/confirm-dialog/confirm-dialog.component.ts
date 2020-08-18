import {Component, Inject} from '@angular/core';
import {AbstractDialog} from '../../models/abstract-dialog';
import {DialogResult} from '../../models/DialogResult';
import {DialogData} from '../../models/DialogData';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

/**
 * Question modal dialog with its own layout (which asks the user a question with two answers - yes or no)
 * based on a material design that injected data and inherits from an [AbstractDialog]{@link AbstractDialog}.
 */
@Component({
    selector: 'nae-question-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent extends AbstractDialog<ConfirmDialogComponent> {

    public choice: boolean;

    /**
     * Only injecting.
     * @param dialogRef Reference to a dialog opened via the MatDialog service.
     * @param data Injected data that was passed in to a dialog.
     */
    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent, DialogResult>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        super(dialogRef, data);
        this.choice = false;
    }

    public onClose() {
        this.dialogRef.close({
            confirmed: this.choice
        });
    }

}
