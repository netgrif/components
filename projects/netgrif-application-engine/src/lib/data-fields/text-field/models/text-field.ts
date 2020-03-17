import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {Change} from '../ChangedFields';

export enum TextFieldView {
    DEFAULT = 'default',
    TEXTAREA = 'textarea'
}

export class TextField extends DataField<string> {

    constructor(stringId: string, title: string, value: string, behavior: Behavior,
                placeholder?: string, description?: string, public validations?: any,
                public materialAppearance = 'standard', private _view = TextFieldView.DEFAULT) {
        super(stringId, title, behavior, placeholder, description, value);
    }

    get view(): TextFieldView {
        return this._view;
    }

    public resolve(formControl: FormControl): void {
        formControl.setValue(this.value);
        this.behavior.editable ? formControl.enable() : formControl.disable();
        formControl.clearValidators();
        formControl.setValidators(this.resolveValidators);
    }

    public applyChange(change: Change): void {
        Object.keys(change).forEach( changedAttribute => {
            switch (changedAttribute) {
                case 'value':
                    this.value = change[changedAttribute];
                    break;
                case 'behavior':
                    Object.assign(this.behavior, change[changedAttribute]);
                    break;
                default:
                    throw new Error(`Unknown attribute '${changedAttribute}' in changed fields response`);
            }
        });
    }

    private resolveValidators(): Array<ValidatorFn> {
        const result = [];

        if (this.behavior.required) {
           result.push(Validators.required);
        }

        // TODO validations

        return result;
    }
}
