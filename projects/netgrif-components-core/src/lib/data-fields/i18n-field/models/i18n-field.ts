import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {Component} from '../../models/component';
import {I18nFieldValue} from './i18n-field-value';


export class I18nField extends DataField<I18nFieldValue> {

    constructor(stringId: string, title: string, value: I18nFieldValue | string, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, validations?: Array<Validation>, _component?: Component) {
        if (typeof value === 'string') {
            value = {defaultValue: value};
        }
        super(stringId, title, value, behavior, placeholder, description, layout, validations, _component);
    }
}
