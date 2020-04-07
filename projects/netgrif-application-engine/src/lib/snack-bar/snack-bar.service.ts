import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

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

  constructor(private _snackBar: MatSnackBar) { }

    openInfoSnackBar(message: string, verticalPosition = SnackBarVerticalPosition.BOTTOM,
                     horizontalPosition = SnackBarHorizontalPosition.CENTER, duration = 4000, config?: object) {
        return this._snackBar.open(message, '✔', Object.assign({
            duration,
            horizontalPosition,
            verticalPosition
        }, config));
    }
    openErrorSnackBar(message: string, verticalPosition = SnackBarVerticalPosition.BOTTOM,
                      horizontalPosition = SnackBarHorizontalPosition.CENTER, duration = 4000, config?: object) {
        return this._snackBar.open(message, '❌', Object.assign({
            duration,
            horizontalPosition,
            verticalPosition
        }, config));
    }
    openWarningSnackBar(message: string, verticalPosition = SnackBarVerticalPosition.BOTTOM,
                        horizontalPosition = SnackBarHorizontalPosition.CENTER, duration = 4000, config?: object) {
        return this._snackBar.open(message, '!', Object.assign({
            duration,
            horizontalPosition,
            verticalPosition
        }, config));
    }
    openGenericSnackBar(message: string, action: string, verticalPosition = SnackBarVerticalPosition.BOTTOM,
                        horizontalPosition = SnackBarHorizontalPosition.CENTER, duration = 4000, config?: object) {
        return this._snackBar.open(message, action, Object.assign({
            duration,
            horizontalPosition,
            verticalPosition
        }, config));
    }
}
