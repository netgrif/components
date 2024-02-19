import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import moment, {Moment} from 'moment';
import {Layout} from '../../models/layout';
import {Component} from '../../models/component';
import {DataField} from '../../models/abstract-data-field';
import {Validator} from "../../../registry/model/validator";

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
                          description?: string, layout?: Layout, validations?: any, component?: Component, parentTaskId?: string,
                          validatorRegister?: Map<string, Validator>) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId,
            undefined, validatorRegister);
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
        const result = super.resolveValidations();

        this.validations.forEach(item => {
            if (item.name === AbstractTimeInstanceFieldValidation.BETWEEN) {
                const start = AbstractTimeInstanceField.parseDate(item.arguments.from.value);
                const end = AbstractTimeInstanceField.parseDate(item.arguments.to.value);
                if (!!end && moment(end).isValid()) {
                    this.max = moment(end);
                }
                if (!!start && moment(start).isValid()) {
                    this.min = moment(start);
                }
            }
        });

        return result;
    }
}
