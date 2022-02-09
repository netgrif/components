import {Inject, OnInit} from '@angular/core';
import {SnackBarInjectionData} from './snack-bar-injection-data';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

export abstract class SnackBar<T> implements OnInit {

    protected constructor(public snackBarRef: MatSnackBarRef<T>, @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarInjectionData) {
    }

    onDismiss() {
        this.snackBarRef.dismiss();
    }

    ngOnInit() {
    }
}
