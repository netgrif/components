import {Injector} from '@angular/core';
import {ValidationAction, ValidationActionDefinition} from './validation-action-definition';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import * as ts from "typescript";
import {NumberFieldValidation} from '../../../data-fields/number-field/models/number-field';
import moment, {Moment} from 'moment';
import {
    AbstractTimeInstanceField
} from '../../../data-fields/time-instance-abstract-field/models/abstract-time-instance-field';

// TEXT FIELD VALIDATIONS

export const validMinLength: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.args[0] !== undefined) {
            const tmp = validAction.args[0].split(' ');
            if (tmp[1] !== undefined) {
                const length = parseInt(tmp[1], 10);
                if (!isNaN(length)) {
                    return Validators.minLength(length);
                }
            }
        }
    }
}

export const validMaxLength: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.args[0] !== undefined) {
            const tmp = validAction.args[0].split(' ');
            if (tmp[1] !== undefined) {
                const length = parseInt(tmp[1], 10);
                if (!isNaN(length)) {
                    return Validators.maxLength(length);
                }
            }
        }
    }
}

export const validRegex: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.args[0] !== undefined && validAction.args[0].startsWith('regex ')) {
            return Validators.pattern(new RegExp(validAction.args[0].substring(6, validAction.args[0].length )));
        } else if (validAction.args[0] !== undefined && validAction.args[0].startsWith('regex("')) {
            return Validators.pattern(new RegExp(validAction.args[0].substring(7, validAction.args[0].length - 2)))
        }
    }
}

export const validEmail: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return Validators.email;
    }
}

export const validTelNumber: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: FormControl) {
            if (!(new RegExp(/^(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)$/).test(fc.value))) {
                return ({validTelNumber: true});
            } else {
                return null;
            }
        }
    }
}

// NUMBER FIELD VALIDATIONS

export const validOdd: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: FormControl) {
            if ((fc.value % 2) === 0) { return ({[validAction.id]: true}); } else {return null;}
        }
    }
}

export const validEven: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: FormControl) {
            if ((fc.value % 2) !== 0) { return ({[validAction.id]: true});} else {return null;}
        }
    }
}

export const validNegative: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: FormControl) {
            if (fc.value >= 0) { return ({[validAction.id]: true}); } else { return null; }
        }
    }
}

export const validPositive: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: FormControl) {
            if (ts.transpileModule("fc.value < 0",{ compilerOptions: { module: ts.ModuleKind.CommonJS }})) {
                return ({[validAction.id]: true});
            } else {
                return null;
            }
        }
    }
}

export const validDecimal: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: FormControl) {
            if (fc.value % 1 !== 0) { return ({[validAction.id]: true}); } else {return null;}
        }
    }
}

export const validInRange: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.args[0] !== undefined) {
            const tmp = validAction.args[0].split(' ');
            const ranges = tmp[1].split(',');
            const first = parseFloat(ranges[0]);
            const second = parseFloat(ranges[1]);

            if (isNaN(first) && !isNaN(second) && ranges[0].includes(NumberFieldValidation.INF)) {
                return validInRangeSmaller(second);
            } else if (isNaN(second) && !isNaN(first) && ranges[1].includes(NumberFieldValidation.INF)) {
                return validInRangeBigger(first);
            } else if (!isNaN(first) && !isNaN(second)) {
                return validInRangeFunction(first, second);
            }
        }
    }
}

function validInRangeSmaller(range: number): ValidatorFn {
    return (fc: FormControl): {[key: string]: any} | null => {
        if (fc.value > range) { return ({validInRange: true}); } else { return null; }
    };
}

function validInRangeBigger(range: number): ValidatorFn {
    return (fc: FormControl): {[key: string]: any} | null => {
        if (fc.value < range) { return ({validInRange: true}); } else { return null; }
    };
}

function validInRangeFunction(first: number, second: number): ValidatorFn {
    return (fc: FormControl): {[key: string]: any} | null => {
        if (fc.value < first || fc.value > second) { return ({validInRange: true}); } else { return null; }
    };
}

// DATE FIELD VALIDATIONS

export const validBetween: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.args[0] !== undefined) {
            const tmp = validAction.args[0](' ');
            const ranges = tmp[1].split(',');

            const start = AbstractTimeInstanceField.parseDate(ranges[0]);
            const end = AbstractTimeInstanceField.parseDate(ranges[1]);

            if (start && end) {
                if (start === 'past' && moment(end).isValid()) {
                    return validFromPast(moment(end));
                } else if (end === 'future' && moment(start).isValid()) {
                    return validToFuture(moment(start));
                } else if (moment(start).isValid() && moment(end).isValid()) {
                    return validBetweenFunction(moment(start), moment(end));
                }
            }
        }
    }
}

function validFromPast(range: Moment): ValidatorFn {
    return (fc: FormControl): { [key: string]: any } | null => fc.value > range ? {validBetween: true} : null;
}

function validToFuture(range: Moment): ValidatorFn {
    return (fc: FormControl): { [key: string]: any } | null => fc.value < range ? {validBetween: true} : null;
}

function validBetweenFunction(first: Moment, second: Moment): ValidatorFn {
    return (fc: FormControl): { [key: string]: any } | null => fc.value < first || fc.value > second ? {validBetween: true} : null;
}

export const validWorkday: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: FormControl) {
            const dayOfWeek = !!fc.value ? fc.value.isoWeekday() : null;
            return dayOfWeek === 6 || dayOfWeek === 7 ? {validWorkday: true} : null;
        }
    }
}

export const validWeekend: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: FormControl) {
            const dayOfWeek = !!fc.value ? fc.value.isoWeekday() : null;
            return dayOfWeek >= 1 && dayOfWeek <= 5 ? {validWeekend: true} : null;
        }
    }
}

// I18N FIELD VALIDATIONS

export const validTranslationRequired: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.args[0] !== undefined) {
            const tmp = validAction.args[0].split(' ');
            if (tmp[1] !== undefined) {
                return validTranslationRequiredFunction(tmp[1].replace(' ', '').split(','));
            }
        }
    }
}

export const validTranslationOnly: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.args[0] !== undefined) {
            const tmp = validAction.args[0].split(' ');
            if (tmp[1] !== undefined) {
                return validTranslationOnlyFunction(tmp[1].replace(' ', '').split(','));
            }
        }
    }
}

function validTranslationRequiredFunction(countries: Array<string>): ValidatorFn {
    return (fc: FormControl): { [key: string]: any } | null => {
        return countries.every(languageCode => languageCode in fc.value.translations)
            ? null : ({translationRequired: true});
    };
}

function validTranslationOnlyFunction(countries: Array<string>): ValidatorFn {
    return (fc: FormControl): { [key: string]: any } | null => {
        return Object.keys(fc.value.translations).every(translation => countries.includes(translation))
            ? null : ({translationOnly: true});
    };
}
