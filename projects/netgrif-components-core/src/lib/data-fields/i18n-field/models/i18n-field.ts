import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {Component} from '../../models/component';
import {I18nFieldValue} from './i18n-field-value';
import {Observable} from 'rxjs';
import {FormControl, ValidatorFn} from '@angular/forms';

export enum I18nFieldValidation {
    TRANSLATION_REQUIRED = 'translationRequired',
    TRANSLATION_ONLY = 'translationOnly',
    REQUIRED_I18N = 'requiredI18n'
}

export class I18nField extends DataField<I18nFieldValue> {

    public static toObject(templateValue: I18nFieldValue): any {
        const object = {};
        object['xx'] = templateValue.defaultValue;
        for (const k in templateValue.translations) {
            if (Object.prototype.hasOwnProperty.call(templateValue.translations, k)) {
                object[k] = templateValue.translations[k];
            }
        }
        return object;
    }

    public static fromObject(templateValue: any, templateKey: string): I18nFieldValue {
        const i18nObject = {
            defaultValue: templateValue['xx'],
            key: templateKey,
            translations: {}
        };
        for (const k in templateValue) {
            if (k === 'xx') {
                continue;
            }
            i18nObject.translations[k] = templateValue[k];
        }
        return i18nObject as I18nFieldValue;
    }

    constructor(stringId: string, title: string, value: I18nFieldValue | string, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, validations?: Array<Validation>, _component?: Component) {
        if (typeof value === 'string') {
            value = {defaultValue: value};
        }
        super(stringId, title, value, behavior, placeholder, description, layout, validations, _component);
    }

    protected valueEquality(a: I18nFieldValue, b: I18nFieldValue): boolean {
        if (!a && !b) {
            return true;
        }
        if ((!a && !!b) || (!b && !!a)) {
            return false;
        }
        if ((!a.defaultValue && !b.defaultValue) && (!a.translations && !b.translations) && (!a.key && !b.key)) {
            return true;
        }
        if ((!(!a.defaultValue && !b.defaultValue)
                && ((!a.defaultValue && !!b.defaultValue) || (!b.defaultValue && !!a.defaultValue) || (a.defaultValue !== b.defaultValue)))
            || (!(!a.key && !b.key) && ((!a.key && !!b.key) || (!b.key && !!a.key) || (a.key !== b.key)))
            || (!(!a.translations && !b.translations)
                && ((!a.translations && !!b.translations) || (!b.translations && !!a.translations)))) {
            return false;
        }
        const aKeys = Object.keys(a.translations).sort();
        const bKeys = Object.keys(b.translations).sort();
        if (aKeys.length !== bKeys.length
            || !aKeys.every((element, index) => {
                return element === bKeys[index];
            })) {
            return false;
        }
        for (const k in a.translations) {
            if (a.translations[k] !== b.translations[k]) {
                return false;
            }
        }
        return true;
    }

    get updated(): Observable<void> {
        return this._update.asObservable();
    }

    protected calculateValidity(forValidRequired: boolean, formControl: FormControl): boolean {
        const isDisabled = formControl.disabled;
        if (forValidRequired) {
            formControl.enable();
        }
        formControl.clearValidators();
        if (forValidRequired) {
            formControl.setValidators(this.behavior.required ? [this.validRequiredI18n] : []);
        } else {
            formControl.setValidators(this.resolveFormControlValidators());
        }
        formControl.updateValueAndValidity();
        const validity = this._determineFormControlValidity(formControl);
        isDisabled ? formControl.disable() : formControl.enable();
        return validity;
    }

    protected resolveFormControlValidators(): Array<ValidatorFn> {
        const result = [];

        if (this.behavior.required) {
            result.push(this.validRequiredI18n);
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

    protected resolveValidations(): Array<ValidatorFn> {
        const result = [];

        this.validations.forEach(item => {
            if (item.validationRule.includes(I18nFieldValidation.TRANSLATION_REQUIRED)) {
                const tmp = item.validationRule.split(' ');
                if (tmp[1] !== undefined) {
                    result.push(this.validTranslationRequired(tmp[1].replace(' ', '').split(',')));
                }
            }
            if (item.validationRule.includes(I18nFieldValidation.TRANSLATION_ONLY)) {
                const tmp = item.validationRule.split(' ');
                if (tmp[1] !== undefined) {
                    result.push(this.validTranslationOnly(tmp[1].replace(' ', '').split(',')));
                }
            }
        });

        return result;
    }

    private validTranslationRequired(countries: Array<string>): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => {
            return countries.every(languageCode => languageCode in fc.value.translations)
                ? (null) : ({translationRequired: true});
        };
    }

    private validTranslationOnly(countries: Array<string>): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => {
            return Object.keys(fc.value.translations).every(translation => countries.includes(translation))
                ? (null) : ({translationOnly: true});
        };
    }

    private validRequiredI18n(fc: FormControl) {
        return (fc.value.defaultValue === '' && Object.keys(fc.value.translations).length === 0)
            ? ({requiredI18n: true}) : (null);
    }
}
