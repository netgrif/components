import { DataField } from '../../models/abstract-data-field';
import { Behavior } from '../../models/behavior';
import { Layout } from '../../models/layout';
import { Validation } from '../../models/validation';
import { Component } from '../../models/component';
import { UserListValue } from './user-list-value';

export class UserListField extends DataField<UserListValue> {

    constructor(stringId: string, title: string, behavior: Behavior, value: UserListValue,
                placeholder?: string, description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component,
                parentTaskId?: string) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId);
    }

    protected valueEquality(a: UserListValue, b: UserListValue): boolean {
        return (!a && !b) ||
            (!!a && !!b && a.userValues.length === b.userValues.length);
    }
}
