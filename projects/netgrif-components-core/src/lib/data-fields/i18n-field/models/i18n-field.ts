import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {Component, ComponentPrefixes} from '../../models/component';
import {I18nFieldTranslations, I18nFieldValue} from './i18n-field-value';
import {Observable} from 'rxjs';
import {FormControl, ValidatorFn} from '@angular/forms';
import {Validator} from "../../../registry/model/validator";

export enum I18nFieldValidation {
    TRANSLATION_REQUIRED = 'translationRequired',
    TRANSLATION_ONLY = 'translationOnly',
    REQUIRED_I18N = 'requiredI18n'
}

export const DEFAULT_LANGUAGE_CODE = 'xx';

export class I18nField extends DataField<I18nFieldValue> {

    public getTypedComponentType(): string {
        return ComponentPrefixes.I18N + this.getComponentType();
    }
    private static defaultValueNonEquality(a: I18nFieldValue, b: I18nFieldValue): boolean {
        return (!(!a.defaultValue && !b.defaultValue)
            && (
                (!a.defaultValue && !!b.defaultValue)
                || (!b.defaultValue && !!a.defaultValue)
                || (a.defaultValue !== b.defaultValue)
            ));
    }

    private static keyNonEquality(a: I18nFieldValue, b: I18nFieldValue): boolean {
        return (!(!a.key && !b.key) && ((!a.key && !!b.key) || (!b.key && !!a.key) || (a.key !== b.key)));
    }

    private static translationsNonEquality(a: I18nFieldValue, b: I18nFieldValue): boolean {
        return (!(!a.translations && !b.translations)
            && ((!a.translations && !!b.translations) || (!b.translations && !!a.translations)));
    }

    private static translationsEquality(a: I18nFieldValue, b: I18nFieldValue): boolean {
        const aKeys = !!a.translations ? Object.keys(a.translations).sort() : [];
        const bKeys = !!b.translations ? Object.keys(b.translations).sort() : [];
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

    public static toObject(templateValue: I18nFieldValue): I18nFieldTranslations {
        const object = {};
        object[DEFAULT_LANGUAGE_CODE] = templateValue?.defaultValue ?? "";
        if (!!templateValue) {
            for (const k in templateValue.translations) {
                if (Object.prototype.hasOwnProperty.call(templateValue.translations, k)) {
                    object[k] = templateValue.translations[k];
                }
            }
        }
        return object;
    }

    public static fromObject(templateValue: I18nFieldTranslations, templateKey: string): I18nFieldValue {
        const i18nObject = {
            defaultValue: templateValue[DEFAULT_LANGUAGE_CODE],
            key: templateKey,
            translations: {}
        };
        for (const [key, value] of Object.entries(templateValue)) {
            if (key === DEFAULT_LANGUAGE_CODE) {
                continue;
            }
            i18nObject.translations[key] = value;
        }
        return i18nObject as I18nFieldValue;
    }

    constructor(stringId: string, title: string, value: I18nFieldValue | string, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, validations?: Array<Validation>, _component?: Component,
                validatorRegister?: Map<string, Validator>) {
        if (typeof value === 'string') {
            value = {defaultValue: value};
        }
        super(stringId, title, value, behavior, placeholder, description, layout, validations, _component, undefined, undefined,
            validatorRegister);
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
        if (I18nField.defaultValueNonEquality(a, b) || I18nField.keyNonEquality(a, b) || I18nField.translationsNonEquality(a, b)) {
            return false;
        }
        return I18nField.translationsEquality(a, b);
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
                ? null : ({translationRequired: true});
        };
    }

    private validTranslationOnly(countries: Array<string>): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => {
            return Object.keys(fc.value.translations).every(translation => countries.includes(translation))
                ? null : ({translationOnly: true});
        };
    }

    private validRequiredI18n(fc: FormControl): { [k: string]: boolean } {
        return (fc.value.defaultValue === '' && !!fc.value?.translations && Object.keys(fc.value.translations).length === 0)
            ? ({requiredI18n: true}) : null;
    }
}
