import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import moment, {Moment} from 'moment';
import {Layout} from '../../models/layout';

export abstract class AbstractTimeInstanceField extends DataField<Moment> {

    protected _validators: Array<ValidatorFn>;

    protected constructor(stringId: string, title: string, value: Moment, behavior: Behavior, placeholder?: string,
                          description?: string, layout?: Layout, public validations?: any) {
        super(stringId, title, value, behavior, placeholder, description, layout);
        this.materialAppearance = !!layout ? this.layout.appearance : 'outline';
    }

    public static isEqual(a: Moment, b: Moment, granularity?: moment.unitOfTime.StartOf): boolean {
        return (!a && !b) || (!!a && !!b && a.isSame(b, granularity));
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

    protected resolveValidations(): Array<ValidatorFn> {
        const result = [];

        this.validations.forEach(item => {
            if (item.validationRule.includes('between')) {
                const tmp = item.validationRule.split(' ');
                const ranges = tmp[1].split(',');

                const start = this.parseDate(ranges[0]);
                const end = this.parseDate(ranges[1]);

                if (start && end) {
                    if (start === 'past' && moment(end).isValid()) {
                        result.push(this.validFromPast(moment(end)));
                    } else if (end === 'future' && moment(start).isValid()) {
                        result.push(this.validToFuture(moment(start)));
                    } else if (moment(start).isValid() && moment(end).isValid()) {
                        result.push(this.validBetween(moment(start), moment(end)));
                    }
                }
            } else if (item.validationRule.includes('workday')) {
                result.push(this.validWorkday);
            } else if (item.validationRule.includes('weekend')) {
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
        const dayOfWeek = fc.value.weekday();
        return dayOfWeek === 6 || dayOfWeek === 0 ? {validWorkday: true} : null;
    }

    protected validWeekend(fc: FormControl) {
        const dayOfWeek = fc.value.weekday();
        return dayOfWeek >= 1 && dayOfWeek <= 5 && dayOfWeek !== 0 ? {validWeekend: true} : null;
    }

    private parseDate(date) {
        if (date.includes('past')) {
            return 'past';
        } else if (date.includes('today')) {
            return moment(new Date());
        } else if (date.includes('future')) {
            return 'future';
        } else {
            const newDate = moment(new Date(date));
            return newDate.isValid ? newDate : null;
        }
    }
}
