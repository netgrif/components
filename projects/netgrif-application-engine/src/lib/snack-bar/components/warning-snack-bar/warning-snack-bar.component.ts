import {Component, Inject} from '@angular/core';
import {SnackBar, SnackBarData} from '../../models/abstract-snack-bar';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material';

@Component({
  selector: 'nae-warning-snack-bar',
  templateUrl: './warning-snack-bar.component.html',
  styleUrls: ['./warning-snack-bar.component.scss']
})
export class WarningSnackBarComponent extends SnackBar<WarningSnackBarComponent> {

    constructor(public snackBarRef: MatSnackBarRef<WarningSnackBarComponent>,
                @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {
        super(snackBarRef, data);
    }
}
