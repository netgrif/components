import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

/** Enumeration which is used to configure the vertical position of the snack bar. */
export enum SnackBarVerticalPosition {
    BOTTOM = 'bottom',
    TOP = 'top'
}

/** Enumeration which is used to configure the horizontal position of the snack bar. */
export enum SnackBarHorizontalPosition {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right'
}

/** Service to dispatch own snack bar messages based on Material Design via [MatSnackBar]{@link MatSnackBar} service. */
@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
    /**
     * Only inject service.
     * @param _snackBar Service to dispatch Material Design snack bar messages.
     */
  constructor(private _snackBar: MatSnackBar) { }

    /**
     * Opens a snackbar with a info message with successful action button.
     *
     * After the set limit duration dismisses.
     * @param message The info message to show in the snackbar.
     * @param verticalPosition Vertical info snackbar display position on screen.
     * @param horizontalPosition Horizontal info snackbar display position on screen.
     * @param duration Duration of displaying the info snackbar on the screen.
     * @param config Additional configuration options for the info snackbar.
     */
    openInfoSnackBar(message: string, verticalPosition = SnackBarVerticalPosition.BOTTOM,
                     horizontalPosition = SnackBarHorizontalPosition.CENTER, duration = 4000, config?: object) {
        return this._snackBar.open(message, '✔', Object.assign({
            duration,
            horizontalPosition,
            verticalPosition
        }, config));
    }

    /**
     * Opens a snackbar with a error message with danger close action button.
     *
     * After the set limit duration dismisses.
     * @param message The error message to show in the snackbar.
     * @param verticalPosition Vertical error snackbar display position on screen.
     * @param horizontalPosition Horizontal error snackbar display position on screen.
     * @param duration Duration of displaying the error snackbar on the screen.
     * @param config Additional configuration options for the error snackbar.
     */
    openErrorSnackBar(message: string, verticalPosition = SnackBarVerticalPosition.BOTTOM,
                      horizontalPosition = SnackBarHorizontalPosition.CENTER, duration = 4000, config?: object) {
        return this._snackBar.open(message, '❌', Object.assign({
            duration,
            horizontalPosition,
            verticalPosition
        }, config));
    }

    /**
     * Opens a snackbar with a warning message with warning action button.
     *
     * After the set limit duration dismisses.
     * @param message The warning message to show in the snackbar.
     * @param verticalPosition Vertical warning snackbar display position on screen.
     * @param horizontalPosition Horizontal warning snackbar display position on screen.
     * @param duration Duration of displaying the warning snackbar on the screen.
     * @param config Additional configuration options for the warning snackbar.
     */
    openWarningSnackBar(message: string, verticalPosition = SnackBarVerticalPosition.BOTTOM,
                        horizontalPosition = SnackBarHorizontalPosition.CENTER, duration = 4000, config?: object) {
        return this._snackBar.open(message, '!', Object.assign({
            duration,
            horizontalPosition,
            verticalPosition
        }, config));
    }

    /**
     * Opens a snackbar with a message and an optional action.
     *
     * After the set limit duration dismisses.
     * @param message The message to show in the snackbar.
     * @param action The label for the snackbar action.
     * @param verticalPosition Vertical snackbar display position on screen.
     * @param horizontalPosition Horizontal snackbar display position on screen.
     * @param duration Duration of displaying the generic snackbar on the screen.
     * @param config Additional configuration options for the snackbar.
     */
    openGenericSnackBar(message: string, action: string, verticalPosition = SnackBarVerticalPosition.BOTTOM,
                        horizontalPosition = SnackBarHorizontalPosition.CENTER, duration = 4000, config?: object) {
        return this._snackBar.open(message, action, Object.assign({
            duration,
            horizontalPosition,
            verticalPosition
        }, config));
    }
}
