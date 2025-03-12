import {Behavior} from '../../models/behavior';
import {ValidatorFn} from '@angular/forms';
import moment, {Moment} from 'moment';
import {Layout} from '../../models/layout';
import {Component} from '../../models/component';
import {DataField} from '../../models/abstract-data-field';
import {ValidationRegistryService} from '../../../registry/validation/validation-registry.service';
import {Validation} from '../../models/validation';
import {Injector} from "@angular/core";
import {AbstractTimeInstanceFieldValidation} from "../../../registry/validation/model/validation-enums";

export abstract class AbstractTimeInstanceField extends DataField<Moment> {

    public min: Moment;
    public max: Moment;

    protected constructor(stringId: string, title: string, value: Moment, behavior: Behavior, placeholder?: string,
                          description?: string, layout?: Layout, validations?: any, component?: Component, parentTaskId?: string,
                          protected _validationRegistry?: ValidationRegistryService, protected _injector?: Injector, ) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId, undefined, _validationRegistry, _injector);
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
            if (this._validationRegistry.contains(item.name)) {
                result.push(this._validationRegistry.get(item.name).call(null, {name: item.name, arguments: item.clientArguments?.argument ?? []}));
                if (item.name.includes(AbstractTimeInstanceFieldValidation.BETWEEN)) {
                    this.checkMinMax(item);
                }
            }
        });

        return result;
    }

    protected checkMinMax(item: Validation) {
        const start = AbstractTimeInstanceField.parseDate(item.clientArguments.argument[0].value);
        const end = AbstractTimeInstanceField.parseDate(item.clientArguments.argument[1].value);

        if (start && end) {
            if (start === 'past' && moment(end).isValid()) {
                this.max = moment(end);
            } else if (end === 'future' && moment(start).isValid()) {
                this.min = moment(start);
            } else if (moment(start).isValid() && moment(end).isValid()) {
                this.min = moment(start);
                this.max = moment(end);
            }
        }
    }
}
