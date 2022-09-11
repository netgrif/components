import {Component, Inject} from '@angular/core';
import {AbstractDialogComponent} from '../../models/abstract-dialog.component';
import {DialogData} from '../../models/DialogData';
import {DialogResult} from '../../models/DialogResult';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

/**
 * Simple modal dialog with its own layout (which only shows information) based on a material design
 * that injected data and inherits from an [AbstractDialog]{@link AbstractDialogComponent}.
 */
@Component({
    selector: 'ncc-simple-dialog',
    templateUrl: './alert-dialog.component.html',
    styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent extends AbstractDialogComponent<AlertDialogComponent> {
    /**
     * Only injecting.
     * @param dialogRef Reference to a dialog opened via the MatDialog service.
     * @param data Injected data that was passed in to a dialog.
     */
    constructor(public dialogRef: MatDialogRef<AlertDialogComponent, DialogResult>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        super(dialogRef, data);
    }

    onClose() {
        this.dialogRef.close({});
    }

}
