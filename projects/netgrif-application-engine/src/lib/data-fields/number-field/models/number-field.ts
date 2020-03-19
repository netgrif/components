import {DataField, MaterialAppearance, Validation} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';

export class NumberField extends DataField<number> {
    private _validators: Array<ValidatorFn>;

    constructor(stringId: string, title: string, value: number, behavior: Behavior, public validations?: Validation[],
                placeholder?: string, description?: string, public materialAppearance = MaterialAppearance.STANDARD) {
        super(stringId, title, value, behavior, placeholder, description);
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
            if (item.validationRule.includes('odd')) {
                result.push(this.validOdd);
            } else if (item.validationRule.includes('even')) {
                result.push(this.validEven);
            } else if (item.validationRule.includes('positive')) {
                result.push(this.validPositive);
            } else if (item.validationRule.includes('negative')) {
                result.push(this.validNegative);
            } else if (item.validationRule.includes('decimal')) {
                result.push(this.validDecimal);
            } else if (item.validationRule.includes('inrange')) {
                const tmp = item.validationRule.split(' ');
                const ranges = tmp[1].split(',');
                const first = parseInt(ranges[0], 10);
                const second = parseInt(ranges[1], 10);

                if (isNaN(first) && !isNaN(second) && ranges[0].includes('inf')) {
                    result.push(this.validInRangeSmaller(second));
                } else if (isNaN(second) && !isNaN(first) && ranges[1].includes('inf')) {
                    result.push(this.validInRangeBigger(first));
                } else if (!isNaN(first) && !isNaN(second)) {
                    result.push(this.validInRange(first, second));
                }
            }
        });

        return result;
    }

    private validOdd(fc: FormControl) {
        if ((fc.value % 2) === 0) { return ({validOdd: true}); } else { return (null); }
    }

    private validEven(fc: FormControl) {
        if ((fc.value % 2) !== 0) { return ({validEven: true}); } else { return (null); }
    }

    private validPositive(fc: FormControl) {
        if (fc.value < 0) { return ({validPositive: true}); } else { return (null); }
    }

    private validNegative(fc: FormControl) {
        if (fc.value >= 0) { return ({validNegative: true}); } else { return (null); }
    }

    private validDecimal(fc: FormControl) {
        if (fc.value % 1 !== 0) { return ({validNegative: true}); } else { return (null); }
    }

    private validInRangeSmaller(range: number): ValidatorFn {
        return (fc: FormControl): {[key: string]: any} | null => {
            if (fc.value > range) { return ({validInRangeSmaller: true}); } else { return (null); }
        };
    }

    private validInRangeBigger(range: number): ValidatorFn {
        return (fc: FormControl): {[key: string]: any} | null => {
            if (fc.value < range) { return ({validInRangeBigger: true}); } else { return (null); }
        };
    }

    private validInRange(first: number, second: number): ValidatorFn {
        return (fc: FormControl): {[key: string]: any} | null => {
            if (fc.value < first || fc.value > second) { return ({validInRange: true}); } else { return (null); }
        };
    }
}
