import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn} from '@angular/forms';
import moment, {Moment} from 'moment';
import {Layout} from '../../models/layout';
import {Component} from '../../models/component';
import {DataField} from '../../models/abstract-data-field';

export enum AbstractTimeInstanceFieldValidation {
    BETWEEN = 'between',
    WORKDAY = 'workday',
    WEEKEND = 'weekend',
    REQUIRED = 'required',
    VALID_BETWEEN = 'validBetween',
    VALID_WORKDAY = 'validWorkday',
    VALID_WEEKEND = 'validWeekend'
}

export abstract class AbstractTimeInstanceField extends DataField<Moment> {

    public min: Moment;
    public max: Moment;

    protected constructor(stringId: string, title: string, value: Moment, behavior: Behavior, placeholder?: string,
                          description?: string, layout?: Layout, validations?: any, component?: Component, htmlAutocomplete?: string) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, htmlAutocomplete);
    }

    public static isEqual(a: Moment, b: Moment, granularity?: moment.unitOfTime.StartOf): boolean {
        return (!a && !b) || (!!a && !!b && a.isSame(b, granularity));
    }

    /**
     * Parse date from string:
     * date is string 'past' - return string 'past'
     * date is string 'future' - return string 'future'
     * date is string 'today'/'now' - return moment instance of current date/time
     * date is string build by combination of 'today'/'now'+/-ISO8601 (eg. today-P1DT1H) - return parsed moment instance of date
     * date is string of specific date - return moment instance of this specific date
     * @param date - string that should be parsed
     */
    public static parseDate(date: string) {
        if (date.includes('past')) {
            return 'past';
        } else if (date.includes('future')) {
            return 'future';
        } else if (date.includes('today') || date.includes('now')) {
            if (date.includes('+') || date.includes('-')) {
                const difference = date.includes('+') ? date.split('+')[1] : date.split('-')[1];
                if (date.includes('today')) {
                    return date.includes('+') ? moment().startOf('day').add(moment.duration(difference))
                        : moment().startOf('day').subtract(moment.duration(difference));
                }
                if (date.includes('now')) {
                    return date.includes('+') ? moment().add(moment.duration(difference)) : moment().subtract(moment.duration(difference));
                }
            }
            return date.includes('today') ? moment().startOf('day') : moment();
        } else {
            const newDate = moment(date);
            return newDate.isValid ? newDate : null;
        }
    }

    protected resolveValidations(): Array<ValidatorFn> {
        const result = [];

        this.validations.forEach(item => {
            if (item.validationRule.includes(AbstractTimeInstanceFieldValidation.BETWEEN)) {
                const tmp = item.validationRule.split(' ');
                const ranges = tmp[1].split(',');

                const start = AbstractTimeInstanceField.parseDate(ranges[0]);
                const end = AbstractTimeInstanceField.parseDate(ranges[1]);

                if (start && end) {
                    if (start === 'past' && moment(end).isValid()) {
                        result.push(this.validFromPast(moment(end)));
                        this.max = moment(end);
                    } else if (end === 'future' && moment(start).isValid()) {
                        result.push(this.validToFuture(moment(start)));
                        this.min = moment(start);
                    } else if (moment(start).isValid() && moment(end).isValid()) {
                        result.push(this.validBetween(moment(start), moment(end)));
                        this.min = moment(start);
                        this.max = moment(end);
                    }
                }
            } else if (item.validationRule.includes(AbstractTimeInstanceFieldValidation.WORKDAY)) {
                result.push(this.validWorkday);
            } else if (item.validationRule.includes(AbstractTimeInstanceFieldValidation.WEEKEND)) {
                result.push(this.validWeekend);
            }
        });

        return result;
    }

    protected validFromPast(range: Moment): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => fc.value > range ? {validBetween: true} : null;
    }

    protected validToFuture(range: Moment): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => fc.value < range ? {validBetween: true} : null;
    }

    protected validBetween(first: Moment, second: Moment): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => fc.value < first || fc.value > second ? {validBetween: true} : null;
    }

    protected validWorkday(fc: FormControl) {
        const dayOfWeek = !!fc.value ? fc.value.weekday() : null;
        return dayOfWeek === 6 || dayOfWeek === 0 ? {validWorkday: true} : null;
    }

    protected validWeekend(fc: FormControl) {
        const dayOfWeek = !!fc.value ? fc.value.weekday() : null;
        return dayOfWeek >= 1 && dayOfWeek <= 5 && dayOfWeek !== 0 ? {validWeekend: true} : null;
    }
}
