import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Component} from '../../models/component';
import {Validation} from '../../models/validation';

export class TaskRefField extends DataField<Array<string>> {

    constructor(stringId: string, title: string, initialValue: Array<string>, behavior: Behavior,
                placeholder?: string, description?: string, layout?: Layout, validations?: Validation[], component?: Component) {
        super(stringId, title, initialValue, behavior, placeholder, description, layout, validations, component);
    }
}
