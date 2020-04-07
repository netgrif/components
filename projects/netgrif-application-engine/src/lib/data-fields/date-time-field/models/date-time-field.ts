import {DataField, Layout} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {Moment} from 'moment';

export class DateTimeField extends DataField<Moment> {
    private _validators: Array<ValidatorFn>;
    public materialAppearance: string;
    constructor(stringId: string, title: string, value: Moment, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, public validations?: any) {
        super(stringId, title, value, behavior, placeholder, description, layout);
        if (layout) {
            this.materialAppearance = this.layout.appearance;
        } else {
            this.materialAppearance = 'legacy';
        }
    }

    protected valueEquality(a: Moment, b: Moment): boolean {
        return (!a && !b) || (!!a && !!b && a.isSame(b, 'minute'));
    }

    protected resolveFormControlValidators(): Array<ValidatorFn> {
        const result = [];

        if (this.behavior.required) {
            result.push(Validators.required);
        }

        if (this.validations) {
            if (this._validators === undefined) {
                this._validators = [];
                this._validators = this.resolveValidations();
                result.push(...this._validators);
            } else {
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

                if (start !== undefined && end !== undefined) {
                    if (start === 'past' && this.isValidDate(end)) {
                        result.push(this.validFromPast(end as Date));
                    } else if (end === 'future' && this.isValidDate(start)) {
                        result.push(this.validToFuture(start as Date));
                    } else if (this.isValidDate(start) && this.isValidDate(end)) {
                        result.push(this.validBetween(start as Date, end as Date));
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

    private validFromPast(range: Date): ValidatorFn {
        return (fc: FormControl): {[key: string]: any} | null => {
            if (fc.value > range) { return ({validBetween: true}); } else { return (null); }
        };
    }

    private validToFuture(range: Date): ValidatorFn {
        return (fc: FormControl): {[key: string]: any} | null => {
            if (fc.value < range) { return ({validBetween: true}); } else { return (null); }
        };
    }

    private validBetween(first: Date, second: Date): ValidatorFn {
        return (fc: FormControl): {[key: string]: any} | null => {
            if (fc.value < first || fc.value > second) { return ({validBetween: true}); } else { return (null); }
        };
    }

    private validWorkday(fc: FormControl) {
        const dayOfWeek = fc.value.getDay();
        if (dayOfWeek === 6 || dayOfWeek === 0) { return ({validWorkday: true}); } else { return (null); }
    }

    private validWeekend(fc: FormControl) {
        const dayOfWeek = fc.value.getDay();
        if (dayOfWeek >= 1 && dayOfWeek <= 5 && dayOfWeek !== 0) { return ({validWeekend: true}); } else { return (null); }
    }

    private parseDate(date) {
        if (date.includes('past')) {
            return 'past';
        } else if (date.includes('today')) {
            return new Date();
        } else if (date.includes('future')) {
            return 'future';
        } else {
            const newDate = new Date(date);
            if (this.isValidDate(newDate)) return newDate;
            else return undefined;
        }
    }

    private isValidDate(d) {
        return d instanceof Date && !isNaN(d.getTime());
    }
}
