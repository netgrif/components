import {FormGroup} from '@angular/forms';

/**
 * Provides FormGroup for [registration]{@link RegistrationCardComponent},
 * [login]{@link LoginCardComponent} and [forgotten password]{@link ForgottenPasswordCardComponent} card component.
 */
export abstract class AbstractCard {
    /**
     * @ignore
     */
    form: FormGroup;
}
