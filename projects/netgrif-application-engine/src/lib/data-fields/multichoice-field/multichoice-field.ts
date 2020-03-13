import {DataField} from '../abstract-data-field';

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
                private _choices: Array<MultichoiceFieldValue>, behavior: any,
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
