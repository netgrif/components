import {Injector} from '@angular/core';
import {ValidationAction, ValidationActionDefinition} from './validation-action-definition';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import moment, {Moment} from 'moment';
import {
    AbstractTimeInstanceField
} from '../../../data-fields/time-instance-abstract-field/models/abstract-time-instance-field';
import {NumberFieldValidation} from "./validation-enums";
import {LoggerService} from "../../../logger/services/logger.service";

// TEXT FIELD VALIDATIONS

export const validMinLength: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.args[0] !== undefined) {
            const length = parseInt(validAction.args[0], 10);
            if (!isNaN(length)) {
                return Validators.minLength(length);
            }
        }
        return returnNullFunction(injector, validAction);
    }
}

export const validMaxLength: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.args[0] !== undefined) {
            const length = parseInt(validAction.args[0], 10);
            if (!isNaN(length)) {
                return Validators.maxLength(length);
            }
        }
        return returnNullFunction(injector, validAction);
    }
}

export const validRegex: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.args[0] !== undefined) {
            return Validators.pattern(new RegExp(validAction.args[0]));
        }
        return returnNullFunction(injector, validAction);
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
        return function (fc: FormControl) {
            if ((fc.value % 2) === 0) { return ({[validAction.name]: true}); } else {return null;}
        }
    }
}

export const validEven: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: FormControl) {
            if ((fc.value % 2) !== 0) { return ({[validAction.name]: true});} else {return null;}
        }
    }
}

export const validNegative: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: FormControl) {
            if (fc.value >= 0) { return ({[validAction.name]: true}); } else { return null; }
        }
    }
}

export const validPositive: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: FormControl) {
            if (fc.value < 0) { return ({[validAction.name]: true}); } else { return null; }
        }
    }
}

export const validDecimal: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: FormControl) {
            if (fc.value % 1 !== 0) { return ({[validAction.name]: true}); } else {return null;}
        }
    }
}

export const validInRange: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.args[0] !== undefined && validAction.args[1] !== undefined) {
            const first = parseFloat(validAction.args[0]);
            const second = parseFloat(validAction.args[1]);

            if (isNaN(first) && !isNaN(second) && validAction.args[0].includes(NumberFieldValidation.INF)) {
                return validInRangeSmaller(second, validAction);
            } else if (isNaN(second) && !isNaN(first) && validAction.args[1].includes(NumberFieldValidation.INF)) {
                return validInRangeBigger(first, validAction);
            } else if (!isNaN(first) && !isNaN(second)) {
                return validInRangeFunction(first, second, validAction);
            }
        }
        return returnNullFunction(injector, validAction);
    }
}

function validInRangeSmaller(range: number, validAction: ValidationAction): ValidatorFn {
    return (fc: FormControl): {[key: string]: any} | null => {
        if (fc.value > range) { return ({[validAction.name]: true}); } else { return null; }
    };
}

function validInRangeBigger(range: number, validAction: ValidationAction): ValidatorFn {
    return (fc: FormControl): {[key: string]: any} | null => {
        if (fc.value < range) { return ({[validAction.name]: true}); } else { return null; }
    };
}

function validInRangeFunction(first: number, second: number, validAction: ValidationAction): ValidatorFn {
    return (fc: FormControl): {[key: string]: any} | null => {
        if (fc.value < first || fc.value > second) { return ({[validAction.name]: true}); } else { return null; }
    };
}

// DATE FIELD VALIDATIONS

export const validBetween: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.args[0] !== undefined && validAction.args[1] !== undefined) {
            const start = AbstractTimeInstanceField.parseDate(validAction.args[0]);
            const end = AbstractTimeInstanceField.parseDate(validAction.args[1]);

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
    return (fc: FormControl): { [key: string]: any } | null => fc.value > range ? {[validAction.name]: true} : null;
}

function validToFuture(range: Moment, validAction: ValidationAction): ValidatorFn {
    return (fc: FormControl): { [key: string]: any } | null => fc.value < range ? {[validAction.name]: true} : null;
}

function validBetweenFunction(first: Moment, second: Moment, validAction: ValidationAction): ValidatorFn {
    return (fc: FormControl): { [key: string]: any } | null => fc.value < first || fc.value > second ? {[validAction.name]: true} : null;
}

export const validWorkday: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: FormControl) {
            const dayOfWeek = !!fc.value ? fc.value.isoWeekday() : null;
            return dayOfWeek === 6 || dayOfWeek === 7 ? {[validAction.name]: true} : null;
        }
    }
}

export const validWeekend: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return function (fc: FormControl) {
            const dayOfWeek = !!fc.value ? fc.value.isoWeekday() : null;
            return dayOfWeek >= 1 && dayOfWeek <= 5 ? {[validAction.name]: true} : null;
        }
    }
}

// I18N FIELD VALIDATIONS

export const validTranslationRequired: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.args[0] !== undefined) {
            return validTranslationRequiredFunction(validAction.args[0].replace(' ', '').split(','), validAction);
        }
        return returnNullFunction(injector, validAction);
    }
}

export const validTranslationOnly: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        if (validAction.args[0] !== undefined) {
            return validTranslationOnlyFunction(validAction.args[0].replace(' ', '').split(','), validAction);
        }
        return returnNullFunction(injector, validAction);
    }
}

function validTranslationRequiredFunction(countries: Array<string>, validAction: ValidationAction): ValidatorFn {
    return (fc: FormControl): { [key: string]: any } | null => {
        return countries.every(languageCode => languageCode in fc.value.translations)
            ? null : ({[validAction.name]: true});
    };
}

function validTranslationOnlyFunction(countries: Array<string>, validAction: ValidationAction): ValidatorFn {
    return (fc: FormControl): { [key: string]: any } | null => {
        return Object.keys(fc.value.translations).every(translation => countries.includes(translation))
            ? null : ({[validAction.name]: true});
    };
}

// BOOLEAN
export const validRequiredTrue: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return (fc: FormControl): { [key: string]: any } | null => {
            return fc.value === true ? null : {[validAction.name]: true};
        };
    }
}

export const validRequiredI18n: ValidationActionDefinition = {
    call: (injector: Injector, validAction: ValidationAction) => {
        return (fc: FormControl): { [k: string]: boolean } | null => {
            return (fc.value.defaultValue === '' && !!fc.value?.translations && Object.keys(fc.value.translations).length === 0)
                ? ({requiredI18n: true}) : null;
        }
    }
}

function returnNullFunction(injector: Injector, validAction: ValidationAction): ValidatorFn {
    const log = injector.get(LoggerService);
    log.error("Problem with resolving a validation - parameters mising in validation -> " + validAction.name);
    return (fc: FormControl) => {
        return null;
    }
}
