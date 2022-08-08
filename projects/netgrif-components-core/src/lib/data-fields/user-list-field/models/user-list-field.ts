import { DataField } from '../../models/abstract-data-field';
import { UserValue } from '../../user-field/models/user-value';
import { Behavior } from '../../models/behavior';
import { Layout } from '../../models/layout';
import { Validation } from '../../models/validation';
import { Component } from '../../models/component';

export class UserListField extends DataField<Array<UserValue>> {

    constructor(stringId: string, title: string, behavior: Behavior, value: Array<UserValue>,
                placeholder?: string, description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component,
                parentTaskId?: string) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId);
    }
}
