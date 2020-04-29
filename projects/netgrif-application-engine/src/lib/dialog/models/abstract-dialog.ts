import {Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

/** Abstract dialog for all types of dialog components is used for data injection and dialog reference holding. */
export abstract class AbstractDialog<T> implements OnInit {
    /**
     * Only injecting.
     * @param dialogRef Reference to a dialog opened via the MatDialog service.
     * @param data Injected data that was passed in to a dialog.
     */
    protected constructor(public dialogRef: MatDialogRef<T>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    /** On close dialog or on click answer button closed current open modal dialog. */
    onClose() {
        this.dialogRef.close();
    }

    ngOnInit() {
    }
}
