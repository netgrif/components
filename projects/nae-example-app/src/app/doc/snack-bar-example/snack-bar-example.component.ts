import {Component, OnInit} from '@angular/core';
import {SnackBarService} from '@netgrif/application-engine';

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
        this.snackBarService.openInfoSnackBar('info message');
    }

    err() {
        this.snackBarService.openErrorSnackBar('error message');
    }

    war() {
        this.snackBarService.openWarningSnackBar('warning message');
    }

    gen() {
        this.snackBarService.openGenericSnackBar('generic message', ':)');
    }
}
