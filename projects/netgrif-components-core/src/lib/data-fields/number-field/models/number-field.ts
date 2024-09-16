import {Behavior} from '../../models/behavior';
import {FormControl, ValidatorFn} from '@angular/forms';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {FormatFilter} from '../../models/format-filter';
import {Component, ComponentPrefixes} from '../../models/component';
import {DataField} from '../../models/abstract-data-field';
import {noop} from "rxjs";
import {Validator} from "../../../registry/model/validator";

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
                description?: string, layout?: Layout, format?: FormatFilter, component?: Component, parentTaskId?: string,
                validators?: Map<string, Validator>) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId, undefined, validators);
        this._formatFilter = format;
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.NUMBER + this.getComponentType();
    }

}
