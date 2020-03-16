import {Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export abstract class AbstractDialog<T> implements OnInit {

    protected constructor(public dialogRef: MatDialogRef<T>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onClose() {
        this.dialogRef.close();
    }

    ngOnInit() {
    }
}
