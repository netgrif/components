import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Component} from '../../models/component';
import {Validation} from '../../models/validation';


/**
 * A collection of Task ref field component names supported by the application engine.
 */
export enum TaskRefComponents {
    DASHBOARD = 'dashboard'
}

export class TaskRefField extends DataField<Array<string>> {

    constructor(stringId: string, title: string, initialValue: Array<string>, behavior: Behavior,
                placeholder?: string, description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component,
                parentTaskId?: string) {
        super(stringId, title, initialValue, behavior, placeholder, description, layout, validations, component, parentTaskId);
    }
}
