import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {FieldTypeResource} from '../../../task-content/model/field-type-resource';

export interface MultichoiceFieldValue {
    key: string;
    value: string;
}

export enum MultichoiceFieldView {
    DEFAULT = 'default',
    LIST = 'list'
}

export class MultichoiceField  extends DataField<Array<string>> {

    constructor(stringId: string, title: string, values: Array<string>, private _choices: Array<MultichoiceFieldValue>,
                behavior: Behavior, placeholder?: string, description?: string, layout?: Layout,
                private _view = MultichoiceFieldView.DEFAULT, private readonly _fieldType = FieldTypeResource.MULTICHOICE) {
        super(stringId, title, values, behavior, placeholder, description, layout);
    }

    set choices(choices: Array<MultichoiceFieldValue>) {
        this._choices = choices;
    }

    get choices(): Array<MultichoiceFieldValue> {
        return this._choices;
    }

    set view(view: MultichoiceFieldView) {
        this._view = view;
    }

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
