import {Component, Inject, OnInit} from '@angular/core';
import {DialogData} from './DialogData';
import {DialogResult} from './DialogResult';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

/** Abstract dialog for all types of dialog components is used for data injection and dialog reference holding. */
@Component({
    selector: 'ncc-abstract-dialog',
    template: ''
})
export abstract class AbstractDialog<T> {
    /**
     * Only injecting.
     * @param dialogRef Reference to a dialog opened via the MatDialog service.
     * @param data Injected data that was passed in to a dialog.
     */
    protected constructor(public dialogRef: MatDialogRef<T, DialogResult>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    /** On close dialog or on click answer button closed current open modal dialog. */
    public abstract onClose(isSubmitted?: boolean);

}
