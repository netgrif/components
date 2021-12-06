import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {FieldTypeResource} from '../../../task-content/model/field-type-resource';
import {Component} from '../../models/component';
import {Validation} from '../../models/validation';

export interface MultichoiceFieldValue {
    key: string;
    value: string;
}

/*@deprecated in 4.3.0*/
export enum MultichoiceFieldView {
    DEFAULT = 'default',
    LIST = 'list'
}

export class MultichoiceField extends DataField<Array<string>> {

    constructor(stringId: string, title: string, values: Array<string>, private _choices: Array<MultichoiceFieldValue>,
                behavior: Behavior, placeholder?: string, description?: string, layout?: Layout,
                private _view = MultichoiceFieldView.DEFAULT, private readonly _fieldType = FieldTypeResource.MULTICHOICE,
                validations?: Array<Validation>, component?: Component, parentTaskId?: string) {
        super(stringId, title, values, behavior, placeholder, description, layout, validations, component, parentTaskId);
    }

    set choices(choices: Array<MultichoiceFieldValue>) {
        this._choices = choices;
    }

    get choices(): Array<MultichoiceFieldValue> {
        return this._choices;
    }

    /*@deprecated in 4.3.0*/
    set view(view: MultichoiceFieldView) {
        this._view = view;
    }

    /*@deprecated in 4.3.0*/
    get view(): MultichoiceFieldView {
        return this._view;
    }

    get fieldType(): FieldTypeResource {
        return this._fieldType;
    }

    protected valueEquality(a: Array<string>, b: Array<string>): boolean {
        // we assume that multichoice options are always given in the same order
        return (!a && !b) || (
            !!a
            && !!b
            && a.length === b.length
            && a.every( (element, index) => element === b[index])
        );
    }
}
