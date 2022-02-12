import {Component, Inject} from '@angular/core';
import {SnackBar} from '../../models/abstract-snack-bar';
import {SnackBarInjectionData} from '../../models/snack-bar-injection-data';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
    selector: 'nae-warning-snack-bar',
    templateUrl: './warning-snack-bar.component.html',
    styleUrls: ['./warning-snack-bar.component.scss']
})
export class WarningSnackBarComponent extends SnackBar<WarningSnackBarComponent> {

    constructor(public snackBarRef: MatSnackBarRef<WarningSnackBarComponent>,
                @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarInjectionData) {
        super(snackBarRef, data);
    }
}
