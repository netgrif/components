import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn} from '@angular/forms';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {FormatFilter} from '../../models/format-filter';
import {Component, ComponentPrefixes} from '../../models/component';
import {DataField} from '../../models/abstract-data-field';
import {ValidationRegistryService} from '../../../registry/validation/validation-registry.service';

export enum NumberFieldValidation {
    ODD = 'odd',
    EVEN = 'even',
    POSITIVE = 'positive',
    NEGATIVE = 'negative',
    DECIMAL = 'decimal',
    IN_RANGE = 'inrange',
    INF = 'inf',
    REQUIRED = 'required',
    VALID_ODD = 'validOdd',
    VALID_EVEN = 'validEven',
    VALID_POSITIVE = 'validPositive',
    VALID_NEGATIVE = 'validNegative',
    VALID_DECIMAL = 'validDecimal',
    VALID_IN_RANGE = 'validInRange'
}

export class NumberField extends DataField<number> {
    public _formatFilter: FormatFilter;

    constructor(stringId: string, title: string, value: number, behavior: Behavior, validations?: Array<Validation>, placeholder?: string,
                description?: string, layout?: Layout, format?: FormatFilter, component?: Component, parentTaskId?: string, protected validationRegistry?: ValidationRegistryService) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId);
        this._formatFilter = format;
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.NUMBER + this.getComponentType();
    }
    protected resolveValidations(): Array<ValidatorFn> {
        const result = [];

        this.validations.forEach(item => {
            if (item.validationRule.includes(NumberFieldValidation.ODD)) {
                result.push(this.validationRegistry.get('validOdd').call(null, {id: 'validOdd', args: [item.validationRule]}));
            } else if (item.validationRule.includes(NumberFieldValidation.EVEN)) {
                result.push(this.validationRegistry.get('validEven').call(null, {id: 'validEven', args: [item.validationRule]}));
            } else if (item.validationRule.includes(NumberFieldValidation.POSITIVE)) {
                result.push(this.validationRegistry.get('validPositive').call(null, {id: 'validPositive', args: [item.validationRule]}));
            } else if (item.validationRule.includes(NumberFieldValidation.NEGATIVE)) {
                result.push(this.validationRegistry.get('validNegative').call(null, {id: 'validNegative', args: [item.validationRule]}));
            } else if (item.validationRule.includes(NumberFieldValidation.DECIMAL)) {
                result.push(this.validationRegistry.get('validDecimal').call(null, {id: 'validDecimal', args: [item.validationRule]}));
            } else if (item.validationRule.includes(NumberFieldValidation.IN_RANGE)) {
                result.push(this.validationRegistry.get('validInRange').call(null, {id: 'validInRange', args: [item.validationRule]}));
            }
        });

        return result;
    }
}
