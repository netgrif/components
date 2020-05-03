import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material';
import {GenericSnackBarComponent} from '../components/generic-snack-bar/generic-snack-bar.component';
import {SuccessSnackBarComponent} from '../components/success-snack-bar/success-snack-bar.component';
import {ErrorSnackBarComponent} from '../components/error-snack-bar/error-snack-bar.component';
import {WarningSnackBarComponent} from '../components/warning-snack-bar/warning-snack-bar.component';

export enum SnackBarVerticalPosition {
    BOTTOM = 'bottom',
    TOP = 'top'
}

export enum SnackBarHorizontalPosition {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right'
}

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(private _snackBar: MatSnackBar) {
    }

    public openSuccessSnackBar(message: string,
                               verticalPosition = SnackBarVerticalPosition.BOTTOM,
                               horizontalPosition = SnackBarHorizontalPosition.CENTER,
                               durationInSeconds = 4,
                               config?: object): MatSnackBarRef<SuccessSnackBarComponent> {
        return this._snackBar.openFromComponent(SuccessSnackBarComponent, Object.assign({
            data: {
                message,
                matIconName: 'done'
            },
            duration: durationInSeconds * 1000,
            horizontalPosition,
            verticalPosition
        }, config));
    }

    public openErrorSnackBar(message: string,
                             verticalPosition = SnackBarVerticalPosition.BOTTOM,
                             horizontalPosition = SnackBarHorizontalPosition.CENTER,
                             durationInSeconds = 4,
                             config?: object): MatSnackBarRef<ErrorSnackBarComponent> {
        return this._snackBar.openFromComponent(ErrorSnackBarComponent, Object.assign({
            data: {
                message,
                matIconName: 'error'
            },
            // duration: durationInSeconds * 1000, // Error has to be acknowledged to be closed
            horizontalPosition,
            verticalPosition
        }, config));
    }

    public openWarningSnackBar(message: string,
                               verticalPosition = SnackBarVerticalPosition.BOTTOM,
                               horizontalPosition = SnackBarHorizontalPosition.CENTER,
                               durationInSeconds = 4,
                               config?: object): MatSnackBarRef<WarningSnackBarComponent> {
        return this._snackBar.openFromComponent(WarningSnackBarComponent, Object.assign({
            data: {
                message,
                matIconName: 'priority_high'
            },
            duration: durationInSeconds * 1000,
            horizontalPosition,
            verticalPosition
        }, config));
    }

    public openGenericSnackBar(message: string,
                               matIconName: string,
                               verticalPosition = SnackBarVerticalPosition.BOTTOM,
                               horizontalPosition = SnackBarHorizontalPosition.CENTER,
                               durationInSeconds = 4,
                               config?: object): MatSnackBarRef<GenericSnackBarComponent> {
        return this._snackBar.openFromComponent(GenericSnackBarComponent, Object.assign({
            data: {
                message,
                matIconName
            },
            duration: durationInSeconds * 1000,
            horizontalPosition,
            verticalPosition
        }, config));
    }
}
