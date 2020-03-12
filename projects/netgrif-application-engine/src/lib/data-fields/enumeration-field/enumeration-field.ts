import {DataField} from '../abstract-data-field';

export interface EnumerationFieldValue {
    key: string;
    value: string;
}

export enum EnumerationFieldView {
    DEFAULT = 'default',
    LIST = 'list',
    AUTOCOMPLETE = 'autocomplete'
}

export class EnumerationField extends DataField<EnumerationFieldValue> {

    constructor(stringId: string, title: string, value: EnumerationFieldValue,
                private _choices: Array<EnumerationFieldValue>, behavior: any, placeholder?: string, description?: string,
                public materialAppearance = 'standard', private _view = EnumerationFieldView.DEFAULT) {
        super(stringId, title, behavior, placeholder, description, value);
    }

    get choices(): Array<EnumerationFieldValue> {
        return this._choices;
    }

    get view(): EnumerationFieldView {
        return this._view;
    }
}
