import {Component, Inject} from '@angular/core';
import {SnackBar} from '../../models/abstract-snack-bar';
import {SnackBarInjectionData} from '../../models/snack-bar-injection-data';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
    selector: 'nae-generic-snack-bar',
    templateUrl: './generic-snack-bar.component.html',
    styleUrls: ['./generic-snack-bar.component.scss']
})
export class GenericSnackBarComponent extends SnackBar<GenericSnackBarComponent> {

    constructor(public snackBarRef: MatSnackBarRef<GenericSnackBarComponent>,
                @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarInjectionData) {
        super(snackBarRef, data);
    }
}
