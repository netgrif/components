import {InjectionToken} from '@angular/core';
import {SnackBarHorizontalPosition, SnackBarVerticalPosition} from './snack-bar-enums';

export const NAE_SNACKBAR_VERTICAL_POSITION = new InjectionToken<SnackBarVerticalPosition>('NaeSnackBarVerticalPosition');
export const NAE_SNACKBAR_HORIZONTAL_POSITION = new InjectionToken<SnackBarHorizontalPosition>('NaeSnackBarHorizontalPosition');
