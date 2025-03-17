import {Component, Inject} from '@angular/core';
import {SnackBarComponent} from '../../models/abstract-snack-bar.component';
import {SnackBarInjectionData} from '../../models/snack-bar-injection-data';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
    selector: 'ncc-generic-snack-bar',
    templateUrl: './generic-snack-bar.component.html',
    styleUrls: ['./generic-snack-bar.component.scss'],
    standalone: false
})
export class GenericSnackBarComponent extends SnackBarComponent<GenericSnackBarComponent> {

    constructor(public snackBarRef: MatSnackBarRef<GenericSnackBarComponent>,
                @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarInjectionData) {
        super(snackBarRef, data);
    }
}
