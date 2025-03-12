import {Injector} from '@angular/core';
import {ValidationAction, ValidationActionDefinition} from './validation-action-definition';
import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import moment, {Moment} from 'moment';
import {
    AbstractTimeInstanceField
} from '../../../data-fields/time-instance-abstract-field/models/abstract-time-instance-field';
import {NumberFieldValidation} from "./validation-enums";
import {LoggerService} from "../../../logger/services/logger.service";

// TEXT FIELD VALIDATIONS

export const validMinLength: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.arguments[0].value !== undefined) {
            const length = parseInt(validAction.arguments[0].value, 10);
            if (!isNaN(length)) {
                return functionMinLength(length, validAction);
            }
        }
        return returnNullFunction(injector, validAction);
    }
}

function functionMinLength(minLength: number, validAction: ValidationAction): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const length = control.value?.length ?? lengthOrSize(control.value);
        if (length === null || length === 0) {
            return null;
        }
        return length < minLength ? {[validAction.name]: {'requiredLength': minLength, 'actualLength': length}} : null;
    };
}

export function functionMaxLength(maxLength: number, validAction: ValidationAction): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const length = control.value?.length ?? lengthOrSize(control.value);
        if (length !== null && length > maxLength) {
            return {[validAction.name]: {'requiredLength': maxLength, 'actualLength': length}};
        }
        return null;
    };
}

function lengthOrSize(value: unknown): number | null {
    // non-strict comparison is intentional, to check for both `null` and `undefined` values
    if (value == null) {
        return null;
    } else if (Array.isArray(value) || typeof value === 'string') {
        return value.length;
    } else if (value instanceof Set) {
        return value.size;
    }
    return null;
}

export const validMaxLength: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.arguments[0].value !== undefined) {
            const length = parseInt(validAction.arguments[0].value, 10);
            if (!isNaN(length)) {
                return functionMaxLength(length, validAction);
            }
        }
        return returnNullFunction(injector, validAction);
    }
}

export const validRegex: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.arguments[0].value !== undefined) {
            return regexValidator(new RegExp(validAction.arguments[0].value), validAction);
        }
        return returnNullFunction(injector, validAction);
    }
}

function regexValidator(pattern: string | RegExp, validAction: ValidationAction): ValidatorFn {
    if (!pattern) return (control: AbstractControl) => {return null;};
    let regex: RegExp;
    let regexStr: string;
    if (typeof pattern === 'string') {
        regexStr = '';

        if (pattern.charAt(0) !== '^') regexStr += '^';

        regexStr += pattern;

        if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';

        regex = new RegExp(regexStr);
    } else {
        regexStr = pattern.toString();
        regex = pattern;
    }
    return (control: AbstractControl): ValidationErrors | null => {
        if (isEmptyInputValue(control.value)) {
            return null; // don't validate empty values to allow optional controls
        }
        const value: string = control.value;
        return regex.test(value)
            ? null
            : {[validAction.name]: {'requiredPattern': regexStr, 'actualValue': value}};
    };
}

function isEmptyInputValue(value: unknown): boolean {
    return value == null || lengthOrSize(value) === 0;
}

export const validEmail: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return Validators.email;
    }
}

export const validTelNumber: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: AbstractControl) {
            if (!(new RegExp(/^(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)$/).test(fc.value))) {
                return ({[validAction.name]: true});
            } else {
                return null;
            }
        }
    }
}

// NUMBER FIELD VALIDATIONS

export const validOdd: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: AbstractControl) {
            if ((fc.value % 2) === 0) { return ({[validAction.name]: true}); } else {return null;}
        }
    }
}

export const validEven: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return (fc: AbstractControl) => {
            if ((fc.value % 2) !== 0) { return ({[validAction.name]: true});} else {return null;}
        }
    }
}

export const validNegative: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: AbstractControl) {
            if (fc.value >= 0) { return ({[validAction.name]: true}); } else { return null; }
        }
    }
}

export const validPositive: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: AbstractControl) {
            if (fc.value < 0) { return ({[validAction.name]: true}); } else { return null; }
        }
    }
}

export const validDecimal: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: AbstractControl) {
            if (fc.value % 1 !== 0) { return ({[validAction.name]: true}); } else {return null;}
        }
    }
}

export const validInRange: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.arguments[0].value !== undefined && validAction.arguments[1].value !== undefined) {
            const first = parseFloat(validAction.arguments[0].value);
            const second = parseFloat(validAction.arguments[1].value);

            if (isNaN(first) && !isNaN(second) && validAction.arguments[0].value.includes(NumberFieldValidation.INF)) {
                return validInRangeSmaller(second, validAction);
            } else if (isNaN(second) && !isNaN(first) && validAction.arguments[1].value.includes(NumberFieldValidation.INF)) {
                return validInRangeBigger(first, validAction);
            } else if (!isNaN(first) && !isNaN(second)) {
                return validInRangeFunction(first, second, validAction);
            }
        }
        return returnNullFunction(injector, validAction);
    }
}

function validInRangeSmaller(range: number, validAction: ValidationAction): ValidatorFn {
    return (fc: AbstractControl): {[key: string]: any} | null => {
        if (fc.value > range) { return ({[validAction.name]: true}); } else { return null; }
    };
}

function validInRangeBigger(range: number, validAction: ValidationAction): ValidatorFn {
    return (fc: AbstractControl): {[key: string]: any} | null => {
        if (fc.value < range) { return ({[validAction.name]: true}); } else { return null; }
    };
}

function validInRangeFunction(first: number, second: number, validAction: ValidationAction): ValidatorFn {
    return (fc: AbstractControl): {[key: string]: any} | null => {
        if (fc.value < first || fc.value > second) { return ({[validAction.name]: true}); } else { return null; }
    };
}

// DATE FIELD VALIDATIONS

export const validBetween: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.arguments[0].value !== undefined && validAction.arguments[1].value !== undefined) {
            const start = AbstractTimeInstanceField.parseDate(validAction.arguments[0].value);
            const end = AbstractTimeInstanceField.parseDate(validAction.arguments[1].value);

            if (start && end) {
                if (start === 'past' && moment(end).isValid()) {
                    return validFromPast(moment(end), validAction);
                } else if (end === 'future' && moment(start).isValid()) {
                    return validToFuture(moment(start), validAction);
                } else if (moment(start).isValid() && moment(end).isValid()) {
                    return validBetweenFunction(moment(start), moment(end), validAction);
                }
            }
        }
        return returnNullFunction(injector, validAction);
    }
}

function validFromPast(range: Moment, validAction: ValidationAction): ValidatorFn {
    return (fc: AbstractControl): { [key: string]: any } | null => fc.value > range ? {[validAction.name]: true} : null;
}

function validToFuture(range: Moment, validAction: ValidationAction): ValidatorFn {
    return (fc: AbstractControl): { [key: string]: any } | null => fc.value < range ? {[validAction.name]: true} : null;
}

function validBetweenFunction(first: Moment, second: Moment, validAction: ValidationAction): ValidatorFn {
    return (fc: AbstractControl): { [key: string]: any } | null => fc.value < first || fc.value > second ? {[validAction.name]: true} : null;
}

export const validWorkday: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: AbstractControl) {
            const dayOfWeek = !!fc.value ? fc.value.isoWeekday() : null;
            return dayOfWeek === 6 || dayOfWeek === 7 ? {[validAction.name]: true} : null;
        }
    }
}

export const validWeekend: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: AbstractControl) {
            const dayOfWeek = !!fc.value ? fc.value.isoWeekday() : null;
            return dayOfWeek >= 1 && dayOfWeek <= 5 ? {[validAction.name]: true} : null;
        }
    }
}

// I18N FIELD VALIDATIONS

export const validTranslationRequired: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (Array.isArray(validAction.arguments)) {
            return validTranslationRequiredFunction(validAction.arguments.map(item => item.value), validAction);
        }
        return returnNullFunction(injector, validAction);
    }
}

export const validTranslationOnly: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (Array.isArray(validAction.arguments)) {
            return validTranslationOnlyFunction(validAction.arguments.map(item => item.value), validAction);
        }
        return returnNullFunction(injector, validAction);
    }
}

function validTranslationRequiredFunction(countries: Array<string>, validAction: ValidationAction): ValidatorFn {
    return (fc: AbstractControl): { [key: string]: any } | null => {
        return countries.every(languageCode => languageCode in (fc.value.translations ?? []))
            ? null : ({[validAction.name]: true});
    };
}

function validTranslationOnlyFunction(countries: Array<string>, validAction: ValidationAction): ValidatorFn {
    return (fc: AbstractControl): { [key: string]: any } | null => {
        return Object.keys(fc.value?.translations ?? []).every(translation => countries.includes(translation))
            ? null : ({[validAction.name]: true});
    };
}

// BOOLEAN
export const validRequiredTrue: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return (fc: AbstractControl): { [key: string]: any } | null => {
            return fc.value === true ? null : {[validAction.name]: true};
        };
    }
}

export const validRequiredI18n: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return (fc: AbstractControl): { [k: string]: any } | null => {
            return (fc.value.defaultValue === '' && !!fc.value?.translations && Object.keys(fc.value.translations).length === 0)
                ? ({requiredI18n: true}) : null;
        }
    }
}

function returnNullFunction(injector: Injector, validAction: ValidationAction): ValidatorFn {
    const log = injector.get(LoggerService);
    log.error("Problem with resolving a validation - parameters mising in validation -> " + validAction.name);
    return (fc: AbstractControl) => {
        return null;
    }
}
