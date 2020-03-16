import {DataField} from '../../models/abstract-data-field';
import {Behavior} from '../../models/behavior';

export interface MultichoiceFieldValue {
    key: string;
    value: string;
}

export enum MultichoiceFieldView {
    DEFAULT = 'default',
    LIST = 'list'
}

export class MultichoiceField  extends DataField<Array<MultichoiceFieldValue>> {

    constructor(stringId: string, title: string, values: Array<MultichoiceFieldValue>,
                private _choices: Array<MultichoiceFieldValue>, behavior: Behavior,
                placeholder?: string, description?: string, public materialAppearance = 'standard',
                private _view = MultichoiceFieldView.DEFAULT) {
        super(stringId, title, behavior, placeholder, description, values);
    }

    get choices(): Array<MultichoiceFieldValue> {
        return this._choices;
    }

    get view(): MultichoiceFieldView {
        return this._view;
    }
}
