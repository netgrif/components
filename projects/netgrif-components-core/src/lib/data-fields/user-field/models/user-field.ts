import {DataField} from '../../models/abstract-data-field';
import {UserValue} from './user-value';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {ProcessRole} from '../../../resources/interface/process-role';
import {Component, ComponentPrefixes} from '../../models/component';
import {Validation} from '../../models/validation';

export class UserField extends DataField<UserValue> {
    constructor(stringId: string, title: string, behavior: Behavior, value: UserValue, private _roles: Array<ProcessRole>,
                placeholder?: string, description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component,
                parentTaskId?: string) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId);
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.USER + this.getComponentType();
    }
    get roles(): Array<ProcessRole> {
        return this._roles;
    }

    protected valueEquality(a: UserValue, b: UserValue): boolean {
        return (!a && !b) || (!!a && !!b && a.email === b.email);
    }
}
