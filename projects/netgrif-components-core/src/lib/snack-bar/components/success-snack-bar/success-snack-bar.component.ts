import {Component, Inject} from '@angular/core';
import {SnackBar} from '../../models/abstract-snack-bar';
import {SnackBarInjectionData} from '../../models/snack-bar-injection-data';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
    selector: 'ncc-success-snack-bar',
    templateUrl: './success-snack-bar.component.html',
    styleUrls: ['./success-snack-bar.component.scss']
})
export class SuccessSnackBarComponent extends SnackBar<SuccessSnackBarComponent> {

    constructor(public snackBarRef: MatSnackBarRef<SuccessSnackBarComponent>,
                @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarInjectionData) {
        super(snackBarRef, data);
    }
}
