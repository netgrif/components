import {DataField, Layout} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import moment, {Moment} from 'moment';

export abstract class AbstractTimeInstanceField extends DataField<Moment> {

    protected _validators: Array<ValidatorFn>;
    public materialAppearance: string;

    protected constructor(stringId: string, title: string, value: Moment, behavior: Behavior, placeholder?: string,
                          description?: string, layout?: Layout, public validations?: any) {
        super(stringId, title, value, behavior, placeholder, description, layout);
        this.materialAppearance = !!layout ? this.layout.appearance : 'legacy';
    }

    protected isEqual(a: Moment, b: Moment, granularity?: moment.unitOfTime.StartOf): boolean {
        return (!a && !b) || (!!a && !!b && a.isSame(b, granularity));
    }

    protected resolveFormControlValidators(): Array<ValidatorFn> {
        const result = [];

        if (this.behavior.required) {
            result.push(Validators.required);
        }

        if (this.validations) {
            if (!this._validators) {
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

                if (!start && !end) {
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

    protected validFromPast(range: Date): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => fc.value > range ? {validBetween: true} : null;
    }

    protected validToFuture(range: Date): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => fc.value < range ? {validBetween: true} : null;
    }

    protected validBetween(first: Date, second: Date): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => fc.value < first || fc.value > second ? {validBetween: true} : null;
    }

    protected validWorkday(fc: FormControl) {
        const dayOfWeek = fc.value.getDay();
        return dayOfWeek === 6 || dayOfWeek === 0 ? {validWorkday: true} : null;
    }

    protected validWeekend(fc: FormControl) {
        const dayOfWeek = fc.value.getDay();
        return dayOfWeek >= 1 && dayOfWeek <= 5 && dayOfWeek !== 0 ? {validWeekend: true} : null;
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
            return this.isValidDate(newDate) ? newDate : null;
        }
    }

    protected isValidDate(d) {
        return d instanceof Date && !isNaN(d.getTime());
    }
}
