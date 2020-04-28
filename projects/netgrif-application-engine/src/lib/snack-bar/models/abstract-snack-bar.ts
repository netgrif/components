import {Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material';

export interface SnackBarData {
    message: string;
    matIconName: string;
}

export abstract class SnackBar<T> implements OnInit {

    protected constructor(public snackBarRef: MatSnackBarRef<T>, @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {
    }

    onDismiss() {
        this.snackBarRef.dismiss();
    }

    ngOnInit() {
    }
}
