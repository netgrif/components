import {DataField, Layout} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {ValidatorFn, Validators} from '@angular/forms';

export class BooleanField extends DataField<boolean> {

    constructor(stringId: string, title: string, value: boolean, behavior: Behavior,
                placeholder?: string, description?: string, layout?: Layout) {
        super(stringId, title, value, behavior, placeholder, description, layout);
    }

    protected resolveFormControlValidators(): Array<ValidatorFn> {
        const result = [];
        if (this.behavior.required) {
            result.push(Validators.requiredTrue);
        }
        return result;
    }
}
