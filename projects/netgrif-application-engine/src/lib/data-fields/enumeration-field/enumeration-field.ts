import {DataField} from "../abstract-data-field";

export interface EnumerationFieldValue {
    key: string;
    value: string;
}

export enum EnumerationFieldView {
    DEFAULT = 'default',
    LIST = 'list'
}

export class EnumerationField extends DataField<EnumerationFieldValue>{

    constructor(title: string, placeholder: string, value: EnumerationFieldValue, private _choices: Array<object>, private _view = EnumerationFieldView.DEFAULT) {
        super(title, placeholder, value)
    }

    get choices(): Array<object> {
        return this._choices;
    }

    get view(): EnumerationFieldView {
        return this._view;
    }
}
