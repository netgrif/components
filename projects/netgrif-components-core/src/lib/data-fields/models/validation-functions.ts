import {Validator} from "../../registry/model/validator";
import {Validators} from "@angular/forms";
import {NumberFieldValidation} from "../number-field/models/number-field";
import moment from "moment/moment";
import {
    AbstractTimeInstanceField,
} from "../time-instance-abstract-field/models/abstract-time-instance-field";


/* General validations */
export const requiredValidation: Validator = {
    key: 'required',
    attributeNames: [],
    fn: undefined,
    validationErrorKey: 'required',
    defaultErrorMessage: () => 'dataField.validations.required'
}

/* Text field validations */
export const minLengthValidation: Validator = {
    key: 'minlength',
    attributeNames: ['length'],
    fn: (min: string) => {
        const length = parseInt(min, 10);
        return Validators.minLength(length);
    },
    validationErrorKey: 'minlength',
    defaultErrorMessage: () => 'dataField.validations.minLength'
}

export const maxLengthValidation: Validator = {
    key: 'maxlength',
    attributeNames: ['length'],
    fn: (max: string) => {
        const length = parseInt(max, 10);
        return Validators.maxLength(length);
    },
    validationErrorKey: 'maxlength',
    defaultErrorMessage: () => 'dataField.validations.maxLength'
}

export const regexValidation: Validator = {
    key: 'regex',
    attributeNames: ['expression'],
    fn: (regex: string) => { return Validators.pattern(new RegExp(regex)); },
    validationErrorKey: 'pattern',
    defaultErrorMessage: () => 'dataField.validations.pattern'
}

export const emailValidation: Validator = {
    key: 'email',
    attributeNames: [],
    fn: () => { return Validators.email; },
    validationErrorKey: 'email',
    defaultErrorMessage: () => 'dataField.validations.email'
}

export const telNumberValidation: Validator = {
    key: 'telnumber',
    attributeNames: [],
    fn: () => {
        return (fc) => {
            if (!(new RegExp(/^(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)$/).test(fc.value))) {
                return ({telnumber: true});
            } else {
                return null;
            }
        };
    },
    validationErrorKey: 'telnumber',
    defaultErrorMessage: () => 'dataField.validations.phone'
}

/* Number field validations */
export const oddValidation: Validator = {
    key: 'odd',
    attributeNames: [],
    fn: () => { return (fc) => {if ((fc.value % 2) === 0) { return ({odd: true}); } else { return (null); }}},
    validationErrorKey: 'odd',
    defaultErrorMessage: () => 'dataField.validations.odd'
}

export const evenValidation: Validator = {
    key: 'even',
    attributeNames: [],
    fn: () => { return (fc) => {if ((fc.value % 2) !== 0) { return ({even: true}); } else { return (null); }}},
    validationErrorKey: 'even',
    defaultErrorMessage: () => 'dataField.validations.even'
}

export const positiveValidation: Validator = {
    key: 'positive',
    attributeNames: [],
    fn: () => { return (fc) => {if (fc.value < 0) { return ({positive: true}); } else { return (null); }}},
    validationErrorKey: 'positive',
    defaultErrorMessage: () => 'dataField.validations.positive'
}

export const negativeValidation: Validator = {
    key: 'negative',
    attributeNames: [],
    fn: () => { return (fc) => {if (fc.value >= 0) { return ({negative: true}); } else { return (null); }}},
    validationErrorKey: 'negative',
    defaultErrorMessage: () => 'dataField.validations.negative'
}

export const decimalValidation: Validator = {
    key: 'decimal',
    attributeNames: [],
    fn: () => { return (fc) => {if (fc.value % 1 !== 0) { return ({decimal: true}); } else { return (null); }}},
    validationErrorKey: 'decimal',
    defaultErrorMessage: () => 'dataField.validations.decimal'
}

export const inRangeValidation: Validator = {
    key: 'inrange',
    attributeNames: ['from', 'to'],
    fn: (from, to) => {
        return (fc) => {
            const first = parseFloat(from);
            const second = parseFloat(to);
            if (isNaN(first) && !isNaN(second) && from.includes(NumberFieldValidation.INF)) {
                if (fc.value > second) { return ({inrange: true}); } else { return (null); }
            } else if (isNaN(second) && !isNaN(first) && to.includes(NumberFieldValidation.INF)) {
                if (fc.value < first) { return ({inrange: true}); } else { return (null); }
            } else if (!isNaN(first) && !isNaN(second)) {
                if (fc.value < first || fc.value > second) { return ({inrange: true}); } else { return (null); }
            }
        }
    },
    validationErrorKey: 'inrange',
    defaultErrorMessage: () => 'dataField.validations.inrange'
}

/* Boolean validations */
export const requiredTrueValidation: Validator = {
    key: 'requiredTrue',
    attributeNames: [],
    fn: () => { return (fc) => { return fc.value === true ? null : {requiredTrue: true}}},
    validationErrorKey: 'requiredTrue',
    defaultErrorMessage: () => 'dataField.validations.decimal'
}

/* Time instance validations */
export const betweenValidation: Validator = {
    key: 'between',
    attributeNames: ['from', 'to'],
    fn: (from, to) => {
        return (fc) => {
            const start = AbstractTimeInstanceField.parseDate(from);
            const end = AbstractTimeInstanceField.parseDate(to);
            if (start && end) {
                if (start === 'past' && moment(end).isValid()) {
                    return fc.value > moment(end) ? {between: true} : null;
                } else if (end === 'future' && moment(start).isValid()) {
                    return fc.value < moment(start) ? {between: true} : null;
                } else if (moment(start).isValid() && moment(end).isValid()) {
                    return fc.value < moment(start) || fc.value > moment(end) ? {between: true} : null;
                }
            }
        }
    },
    validationErrorKey: 'between',
    defaultErrorMessage: (from, to) => {
        if (from === 'past') {
            return 'dataField.validations.datePast';
        }
        if (to === 'future') {
            return 'dataField.validations.dateFuture'
        }
        return 'dataField.validations.dateRange'
    }
}

export const workdayValidation: Validator = {
    key: 'workday',
    attributeNames: [],
    fn: () => { return (fc) => {
        const dayOfWeek = !!fc.value ? fc.value.weekday() : null;
        return dayOfWeek === 6 || dayOfWeek === 0 ? {workday: true} : null;
    }},
    validationErrorKey: 'workday',
    defaultErrorMessage: () => 'dataField.validations.workday'
}

export const weekendValidation: Validator = {
    key: 'weekend',
    attributeNames: [],
    fn: () => { return (fc) => {
        const dayOfWeek = !!fc.value ? fc.value.weekday() : null;
        return dayOfWeek >= 1 && dayOfWeek <= 5 && dayOfWeek !== 0 ? {weekend: true} : null;
    }},
    validationErrorKey: 'weekend',
    defaultErrorMessage: () => 'dataField.validations.weekend'
}

/* I18n validations */
export const translationRequiredValidation: Validator = {
    key: 'translationRequired',
    attributeNames: ['languages'],
    fn: (languages) => { return (fc) => {
        const languageCodes = languages.split(',');
        return languageCodes.every(languageCode => languageCode in fc.value.translations)
            ? null : ({translationRequired: true});
    }},
    validationErrorKey: 'translationRequired',
    defaultErrorMessage: () => 'dataField.validations.translationRequired'
}

export const translationOnlyValidation: Validator = {
    key: 'translationOnly',
    attributeNames: ['languages'],
    fn: (languages) => {
        return (fc) => {
            const languageCodes = languages.split(',');
            return Object.keys(fc.value.translations).every(translation => languageCodes.includes(translation))
                ? null : ({translationOnly: true});
        }
    },
    validationErrorKey: 'translationOnly',
    defaultErrorMessage: () => 'dataField.validations.translationOnly'
}

