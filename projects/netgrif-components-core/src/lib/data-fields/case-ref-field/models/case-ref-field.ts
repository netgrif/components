import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {Component} from '../../models/component';
import {DataField} from '../../models/abstract-data-field';

export class CaseRefField extends DataField<string> {

    public static FIELD_HEIGHT: number = 75;

    constructor(stringId: string, title: string, value: string, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, validations?: Array<Validation>, _component?: Component, parentTaskId?: string) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, _component, parentTaskId);
    }
}
