import {Inject, Injectable, Optional} from '@angular/core';
import {GenericSnackBarComponent} from '../components/generic-snack-bar/generic-snack-bar.component';
import {SuccessSnackBarComponent} from '../components/success-snack-bar/success-snack-bar.component';
import {ErrorSnackBarComponent} from '../components/error-snack-bar/error-snack-bar.component';
import {WarningSnackBarComponent} from '../components/warning-snack-bar/warning-snack-bar.component';
import {SnackBarInjectionData} from '../models/snack-bar-injection-data';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from '@angular/material/snack-bar';
import {SnackBarHorizontalPosition, SnackBarVerticalPosition} from '../models/snack-bar-enums';
import {NAE_SNACKBAR_HORIZONTAL_POSITION, NAE_SNACKBAR_VERTICAL_POSITION} from '../models/injection-token-snackbar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    private _defaultTimeout = 2.5;
    private _verticalPosition: SnackBarVerticalPosition;
    private _horizontalPosition: SnackBarHorizontalPosition;

    constructor(private _snackBar: MatSnackBar,
                @Optional() @Inject(NAE_SNACKBAR_VERTICAL_POSITION) naeVerticalPosition: SnackBarVerticalPosition,
                @Optional() @Inject(NAE_SNACKBAR_HORIZONTAL_POSITION) naeHorizontalPosition: SnackBarHorizontalPosition) {
        this._verticalPosition = SnackBarVerticalPosition.BOTTOM;
        this._horizontalPosition = SnackBarHorizontalPosition.CENTER;
        if (naeVerticalPosition) {
            this._verticalPosition = naeVerticalPosition;
        }
        if (naeHorizontalPosition) {
            this._horizontalPosition = naeHorizontalPosition;
        }
    }

    public openSuccessSnackBar(message: string,
                               verticalPosition = this._verticalPosition,
                               horizontalPosition = this._horizontalPosition,
                               durationInSeconds = this._defaultTimeout,
                               config?: MatSnackBarConfig<SnackBarInjectionData>): MatSnackBarRef<SuccessSnackBarComponent> {
        return this._snackBar.openFromComponent(SuccessSnackBarComponent, Object.assign({
            data: {
                message,
                matIconName: 'done',
                closable: false
            },
            duration: durationInSeconds * 1000,
            horizontalPosition,
            verticalPosition
        }, config));
    }

    public openErrorSnackBar(message: string,
                             verticalPosition = this._verticalPosition,
                             horizontalPosition = this._horizontalPosition,
                             // durationInSeconds = this._defaultTimeout,
                             config?: MatSnackBarConfig<SnackBarInjectionData>): MatSnackBarRef<ErrorSnackBarComponent> {
        return this._snackBar.openFromComponent(ErrorSnackBarComponent, Object.assign({
            data: {
                message,
                matIconName: 'error',
                closable: true
            },
            // duration: durationInSeconds * 1000, // Error has to be acknowledged to be closed
            horizontalPosition,
            verticalPosition
        }, config));
    }

    public openWarningSnackBar(message: string,
                               verticalPosition = this._verticalPosition,
                               horizontalPosition = this._horizontalPosition,
                               durationInSeconds = this._defaultTimeout,
                               config?: MatSnackBarConfig<SnackBarInjectionData>): MatSnackBarRef<WarningSnackBarComponent> {
        return this._snackBar.openFromComponent(WarningSnackBarComponent, Object.assign({
            data: {
                message,
                matIconName: 'warning',
                closable: false
            },
            duration: durationInSeconds * 1000,
            horizontalPosition,
            verticalPosition
        }, config));
    }

    public openGenericSnackBar(message: string,
                               matIconName: string,
                               verticalPosition = this._verticalPosition,
                               horizontalPosition = this._horizontalPosition,
                               durationInSeconds = this._defaultTimeout,
                               config?: MatSnackBarConfig<SnackBarInjectionData>): MatSnackBarRef<GenericSnackBarComponent> {
        return this._snackBar.openFromComponent(GenericSnackBarComponent, Object.assign({
            data: {
                message,
                matIconName,
                closable: true
            },
            duration: durationInSeconds * 1000,
            horizontalPosition,
            verticalPosition
        }, config));
    }
}
