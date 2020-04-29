import {Component, Inject} from '@angular/core';
import {AbstractDialog} from '../models/abstract-dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

/**
 * Simple modal dialog with its own layout (which only shows information) based on a material design
 * that injected data and inherits from an [AbstractDialog]{@link AbstractDialog}.
 */
@Component({
    selector: 'nae-simple-dialog',
    templateUrl: './simple-dialog.component.html',
    styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent extends AbstractDialog<SimpleDialogComponent> {
    /**
     * Only injecting.
     * @param dialogRef Reference to a dialog opened via the MatDialog service.
     * @param data Injected data that was passed in to a dialog.
     */
    constructor(public dialogRef: MatDialogRef<SimpleDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        super(dialogRef, data);
    }

}
