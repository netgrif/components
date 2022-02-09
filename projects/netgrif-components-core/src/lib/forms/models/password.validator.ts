import {AbstractControl} from '@angular/forms';

/**
 * Validator to check that passwords are the same
 */
export function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
        return null;
    }
    if (password.pristine || confirmPassword.pristine) {
        return null;
    }
    if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({mismatchedPassword: true});
        return {misMatch: true};
    } else {
        return null;
    }
}
