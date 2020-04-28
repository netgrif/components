import {Component, Inject} from '@angular/core';
import {SnackBar, SnackBarData} from '../../models/abstract-snack-bar';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material';

@Component({
  selector: 'nae-success-snack-bar',
  templateUrl: './success-snack-bar.component.html',
  styleUrls: ['./success-snack-bar.component.scss']
})
export class SuccessSnackBarComponent extends SnackBar<SuccessSnackBarComponent> {

    constructor(public snackBarRef: MatSnackBarRef<SuccessSnackBarComponent>,
                @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {
        super(snackBarRef, data);
    }
}
