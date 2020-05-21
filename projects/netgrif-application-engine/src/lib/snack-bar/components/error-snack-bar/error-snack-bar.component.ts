import {Component, Inject} from '@angular/core';
import {SnackBar} from '../../models/abstract-snack-bar';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material';
import {SnackBarInjectionData} from '../../models/snack-bar-injection-data';

@Component({
    selector: 'nae-error-snack-bar',
    templateUrl: './error-snack-bar.component.html',
    styleUrls: ['./error-snack-bar.component.scss']
})
export class ErrorSnackBarComponent extends SnackBar<ErrorSnackBarComponent> {

    constructor(public snackBarRef: MatSnackBarRef<ErrorSnackBarComponent>,
                @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarInjectionData) {
        super(snackBarRef, data);
    }
}
