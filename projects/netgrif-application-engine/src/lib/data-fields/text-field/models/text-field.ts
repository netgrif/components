import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';

export enum TextFieldView {
    DEFAULT = 'default',
    TEXTAREA = 'textarea',
    RICHTEXTAREA = 'richtextarea'
}

export enum TextAreaHeight {
    OUTLINE = 27,
    FILL_STANDARD = 34
}

export class TextField extends DataField<string> {
    public static FIELD_HEIGHT = 105;

    private _validators: Array<ValidatorFn>;

    constructor(stringId: string, title: string, value: string, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, public validations?: Validation[], private _view = TextFieldView.DEFAULT) {
        super(stringId, title, value, behavior, placeholder, description, layout);
    }

    get view(): TextFieldView {
        return this._view;
    }

    protected resolveFormControlValidators(): Array<ValidatorFn> {
        const result = [];

        if (this.behavior.required) {
            result.push(Validators.required);
        }

        if (this.validations) {
            if (this._validators) {
                result.push(...this._validators);
            } else {
                this._validators = this.resolveValidations();
                result.push(...this._validators);
            }
        }

        return result;
    }

    private resolveValidations(): Array<ValidatorFn> {
        const result = [];

        this.validations.forEach(item => {
            if (item.validationRule.includes('minLength')) {
                const tmp = item.validationRule.split(' ');
                if (tmp[1] !== undefined) {
                    const length = parseInt(tmp[1], 10);
                    if (!isNaN(length)) {
                        result.push(Validators.minLength(length));
                    }
                }
            } else if (item.validationRule.includes('maxLength')) {
                const tmp = item.validationRule.split(' ');
                if (tmp[1] !== undefined) {
                    const length = parseInt(tmp[1], 10);
                    if (!isNaN(length)) {
                        result.push(Validators.maxLength(length));
                    }
                }
            } else if (item.validationRule.includes('regex')) {
                if (item.validationRule.startsWith('regex ')) {
                    result.push(Validators.pattern(new RegExp(item.validationRule.substring(6, item.validationRule.length ))));
                } else if (item.validationRule.startsWith('regex("')) {
                    result.push(Validators.pattern(new RegExp(item.validationRule.substring(7, item.validationRule.length - 2))));
                }
            } else if (item.validationRule.includes('email')) {
                result.push(Validators.email);
            } else if (item.validationRule.includes('telNumber')) {
                result.push(this.validTelNumber);
            }
        });

        return result;
    }

    private validTelNumber(fc: FormControl) {
        if (!(new RegExp(/^(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)$/).test(fc.value))) {
            return ({validTelNumber: true});
        } else {
            return (null);
        }
    }
}
