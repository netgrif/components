import {Component, OnInit} from '@angular/core';
import {SnackBarService} from '@netgrif/components-core';

@Component({
    selector: 'nae-app-snack-bar-example',
    templateUrl: './snack-bar-example.component.html',
    styleUrls: ['./snack-bar-example.component.scss']
})
export class SnackBarExampleComponent implements OnInit {
    readonly TITLE = 'Snack bar';
    readonly DESCRIPTION = 'Ukážka použitia snack baru...';

    constructor(private snackBarService: SnackBarService) {
    }

    ngOnInit(): void {
    }

    info() {
        this.snackBarService.openSuccessSnackBar('Success message');
    }

    err() {
        this.snackBarService.openErrorSnackBar('Error message');
    }

    war() {
        this.snackBarService.openWarningSnackBar('Warning message');
    }

    gen() {
        this.snackBarService.openGenericSnackBar('Generic user assigned message', 'how_to_reg');
    }
}
