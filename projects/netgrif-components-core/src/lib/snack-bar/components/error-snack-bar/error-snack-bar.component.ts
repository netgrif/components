import {Component, Inject} from '@angular/core';
import {SnackBarComponent} from '../../models/abstract-snack-bar.component';
import {SnackBarInjectionData} from '../../models/snack-bar-injection-data';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
    selector: 'ncc-error-snack-bar',
    templateUrl: './error-snack-bar.component.html',
    styleUrls: ['./error-snack-bar.component.scss'],
    standalone: false
})
export class ErrorSnackBarComponent extends SnackBarComponent<ErrorSnackBarComponent> {

    constructor(public snackBarRef: MatSnackBarRef<ErrorSnackBarComponent>,
                @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarInjectionData) {
        super(snackBarRef, data);
    }
}
