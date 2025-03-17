import {Component, Inject} from '@angular/core';
import {SnackBarComponent} from '../../models/abstract-snack-bar.component';
import {SnackBarInjectionData} from '../../models/snack-bar-injection-data';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
    selector: 'ncc-warning-snack-bar',
    templateUrl: './warning-snack-bar.component.html',
    styleUrls: ['./warning-snack-bar.component.scss'],
    standalone: false
})
export class WarningSnackBarComponent extends SnackBarComponent<WarningSnackBarComponent> {

    constructor(public snackBarRef: MatSnackBarRef<WarningSnackBarComponent>,
                @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarInjectionData) {
        super(snackBarRef, data);
    }
}
